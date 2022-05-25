import { useEffect } from "react";
import { useAppState } from "./context/Provider";
import { useAuth } from "./hooks/useAuth"
import { useHydrateState } from "./hooks/useHydrateState";

export const AppConfig: React.FC = ({ children }) => {
    const { state, updateState } = useAppState();
    const authenticate = useAuth();
    const { hydrate, hydrated } = useHydrateState(state);

    useEffect(() => {
        if (hydrated) return;
        const saved = hydrate();
        if (saved && updateState) updateState({ ...saved, ready: true }); 
    }, [updateState]);

    useEffect(() => {
        if (state.authToken || !state.ready) return;
        if (!state.walletConnected) return;
        authenticate();
    }, [authenticate, state.walletConnected, state.authToken, state.ready]);

    return <>{children}</>
}
