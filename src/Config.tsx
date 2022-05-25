import { useEffect } from "react";
import { useAppState } from "./context/Provider";
import { useAuth } from "./hooks/useAuth"

export const AppConfig: React.FC = ({ children }) => {
    const { state } = useAppState();
    const authenticate = useAuth();

    useEffect(() => {
        if (state.authToken) return;
        if (!state.walletConnected) return;
        authenticate();
    }, [authenticate, state.walletConnected, state.authToken]);

    return <>{children}</>
}
