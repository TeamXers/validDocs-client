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
    useInitAccount();

    useEffect(() => {
        if (hydrated) return;
        const saved = hydrate();
        if (saved && updateState)
            updateState({ authToken: saved.authToken });
    }, [updateState, hydrated]);

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
        authenticate();
    }, [authenticate, state.walletConnected, state.authToken, state.ready]);

    useEffect(() => {
        validDocsApi.defaults.headers.common["Authorization"] = state.authToken
            ? `Bearer ${state.authToken}`
            : "";
    }, [state.authToken]);

    return <>{children}</>
}
