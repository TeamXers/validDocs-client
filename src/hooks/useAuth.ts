import { useEthers } from "@usedapp/core";
import { useCallback, useState } from "react";
import { useMutation } from "react-query"
import { POST_AUTH } from "../api/validdocs";
import { useAppState } from "../context/Provider";

export const useAuth = () => {
    const { updateState } = useAppState();
    const { library } = useEthers();
    const [isLoading, setIsLoading] = useState(false);
    const { mutate } = useMutation(POST_AUTH, {
        onSuccess(data: any) {
            if (!updateState) return;
            updateState({ authToken: data.token });
        },
        onSettled() {
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

        mutate({ signature, message: msgStr });
    }, [mutate, library, isLoading]);

    return authenticate;
}
