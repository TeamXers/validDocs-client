import { useEthers } from "@usedapp/core";
import { useEffect } from "react";
import { validDocsApi } from "./api/validdocs";
import { useAppState } from "./context/Provider";
import { useAuth } from "./hooks/useAuth"
import { useHydrateState } from "./hooks/useHydrateState";
import { useInitAccount } from "./hooks/useInitAccount";

export const AppConfig: React.FC = ({ children }) => {
    const { state, updateState } = useAppState();
    const authenticate = useAuth();
    const { hydrate, hydrated } = useHydrateState(state);
    const { account } = useEthers();
    const initAccount = useInitAccount();

    useEffect(() => {
        if (!state.walletConnected) return;
        if (!updateState) return;
        if (hydrated) return;

        const saved = hydrate();

        (async () => {
            let token = saved?.authToken;
            if (!token) {
                token = await authenticate();
            }

            validDocsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            initAccount((account) => {
                updateState({
                    account,
                    authToken: token,
                    ready: true
                });
            });
        })();
    }, [updateState, state.walletConnected]);

    useEffect(() => {
        if (!updateState) return;

        updateState({
            walletConnected: !!account,
            walletAddress: account,
        });
    }, [account, updateState]);

    useEffect(() => {
        if (state.authToken || !state.ready) return;
        if (!state.walletConnected) return;
        if (!updateState) return;

        (async () => {
            const token = await authenticate();
            validDocsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            initAccount((account) => updateState({ authToken: token, account }));
        })();
    }, [authenticate, state.walletConnected, state.authToken, state.ready, updateState]);


    return <>{children}</>
}
