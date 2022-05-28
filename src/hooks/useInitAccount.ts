import { useMemo } from "react";
import { useQuery } from "react-query";
import { GET_ACCOUNT } from "../api/validdocs";
import { useAppState } from "../context/Provider";

export const useInitAccount = () => {
    const { state, updateState } = useAppState();
    const query = useMemo(() => ({ address: state?.walletAddress }), [state?.walletAddress, state?.authToken]);
    useQuery(["account", query], GET_ACCOUNT as any, {
        enabled: Boolean(state?.walletAddress),
        onSettled(data: any, error?: any) {
            if (error?.code === 1013) {
                console.log(error);
            }
            if (!updateState) {
                throw new Error("updateState is undefined!");
            }

            updateState({
                account: data[0],
                // If the account was not returned
                // unset the authtoken so the user can sign in again
                authToken: data[0] ? state?.authToken : undefined,
                ready: true
            });
        },
    });
}
