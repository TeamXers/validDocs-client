import { useEthers } from "@usedapp/core";
import { useCallback } from "react";
import { useMutation } from "react-query"
import { POST_AUTH, validDocsApi } from "../api/validdocs";
import { useAppState } from "../context/Provider";

export const useAuth = () => {
    const { updateState } = useAppState();
    const { library } = useEthers();
    const { mutate } = useMutation(POST_AUTH, {
        onSuccess(data: any) {
            console.log(data);
            if (!updateState) return;

            updateState({ authToken: data.token });
            validDocsApi.defaults.headers.common["Authorization"] = data.token
                ? `Bearer ${data.token}`
                : "";
        },
    });

    const authenticate = useCallback(async () => {
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
    }, [mutate, library]);

    return authenticate;
}
