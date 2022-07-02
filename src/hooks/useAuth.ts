import { useEthers } from "@usedapp/core";
import { useCallback, useState } from "react";
import { useMutation } from "react-query"
import { POST_AUTH } from "../api/validdocs";

export const useAuth = (onTokenChange: (token: string) => Promise<void>) => {
    const { library } = useEthers();
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync } = useMutation(POST_AUTH, {
        async onSettled(data: any) {
            await onTokenChange(data.token)
            setIsLoading(false);
        }
    });

    const authenticate = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        
        if (!library)
            throw new Error("Cannot finish auth: library is undefined");

        const message = {
            app: 'Validdocs',
            timestamp: Date.now(),
            version: 1
        };
        const msgStr = JSON.stringify(message);
        const signature = await library.getSigner().signMessage(msgStr);

        const data: any = await mutateAsync({ signature, message: msgStr });
        return data.token;
    }, [mutateAsync, library, isLoading]);

    return { authenticating: isLoading, authenticate };
}
