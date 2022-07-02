import { useMemo } from "react";
import { useMutation } from "react-query";
import { GET_ACCOUNT } from "../api/validdocs";
import { useAppState } from "../context/Provider";

export const useInitAccount = () => {
    const { state } = useAppState();
    const query = useMemo(() => ({ address: state?.walletAddress }), [state?.walletAddress, state?.authToken]);
    const { mutateAsync } = useMutation(GET_ACCOUNT);

    return async () => {
        const data: any = await mutateAsync({ queryKey: ["", query] });
        return data[0];
    };
}
