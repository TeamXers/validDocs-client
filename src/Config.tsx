import { useEthers } from "@usedapp/core";
import { useEffect } from "react";
import { validDocsApi } from "./api/validdocs";
import { HTTP_UNAUTHORISED } from "./constants";
import { useAppState } from "./context/Provider";
import { useAuth } from "./hooks/useAuth"
import { useHydrateState } from "./hooks/useHydrateState";
import { useInitAccount } from "./hooks/useInitAccount";

export const AppConfig: React.FC = ({ children }) => {
    const { state, updateState } = useAppState();
    const { authenticate, authenticating } = useAuth(async (token) => {
        validDocsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const account = await initAccount();
        (updateState!)({ authToken: token, account, ready: true });
    });
    const { hydrate, hydrated } = useHydrateState(state);
    const { account } = useEthers();
    const initAccount = useInitAccount();

    useEffect(() => {
        if (!updateState) return;

        updateState({
            walletConnected: !!account,
            walletAddress: account,
        });
    }, [account, updateState]);

    useEffect(() => {
        if (!state.walletConnected) return;
        if (!updateState) return;
        if (hydrated) return;

        const saved = hydrate();

        (async () => {
            let token = saved?.authToken;
            if (!token) {
                token = await authenticate();
            } else {
                try {
                    validDocsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    const account = await initAccount();
                    updateState({
                        account,
                        authToken: token,
                        ready: true
                    });
                } catch (error: any) {
                    if (error.response?.status === HTTP_UNAUTHORISED)
                        await authenticate();
                }
            }
        })();
    }, [updateState, state.walletConnected]);

    return <>{children}</>
}
