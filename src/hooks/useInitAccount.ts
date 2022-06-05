import { useMemo } from "react";
import { useMutation } from "react-query";
import { GET_ACCOUNT } from "../api/validdocs";
import { useAppState } from "../context/Provider";

export const useInitAccount = () => {
    const { state } = useAppState();
    const query = useMemo(() => ({ address: state?.walletAddress }), [state?.walletAddress, state?.authToken]);
    const { mutate } = useMutation(GET_ACCOUNT);

    return (onComplete: (data: any) => void) => mutate({ queryKey: ["", query] }, {
        onSettled(data: any, error?: any) {
            if (error?.code === 1013) {
                console.log(error);
            }

            onComplete(data[0]);
        },
    });
}
