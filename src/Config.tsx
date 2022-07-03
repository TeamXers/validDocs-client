import { useEthers } from "@usedapp/core";
import { useEffect, useRef } from "react";
import { validDocsApi } from "./api/validdocs";
import { HTTP_UNAUTHORISED } from "./constants";
import { useAppState } from "./context/Provider";
import { useAuth } from "./hooks/useAuth"
import { useHydrateState } from "./hooks/useHydrateState";
import { useInitAccount } from "./hooks/useInitAccount";

export const AppConfig: React.FC = ({ children }) => {
    const { state, updateState } = useAppState();
    const { authenticate } = useAuth(async (token) => {
        validDocsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const account = await initAccount();
        (updateState!)({ authToken: token, account, ready: true });
    });
    const { hydrate, hydrated } = useHydrateState(state);
    const { account } = useEthers();
    const currentAccont = useRef(account);
    const initAccount = useInitAccount();

    useEffect(() => {
        if (!updateState) return;

        if (currentAccont.current && account && currentAccont.current !== account) {
            // On wallet account change
            updateState({
                authToken: '',
                account: undefined,
                walletConnected: true,
                walletAddress: account
            });
            window.location.reload();
        } else {
            updateState({
                walletConnected: !!account,
                walletAddress: account
            });
        }

        currentAccont.current = account;
    }, [account, updateState]);

    useEffect(() => {
        if (!state.walletConnected) return;
        if (!updateState) return;
        if (hydrated) return;

        // On page load
        // Read info saved in local storage
        const saved = hydrate();

        (async () => {
            let token = saved?.authToken;
            if (!token) { // no saved token... Get a new one
                token = await authenticate();
                return;
            }
            // use saved token
            try {
                validDocsApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                const account = await initAccount();
                updateState({
                    account,
                    authToken: token,
                    ready: true
                });
            } catch (error: any) {
                if (error.response?.status === HTTP_UNAUTHORISED) // token was invalid... get a new one
                    await authenticate();
            }
        })();
    }, [updateState, state.walletConnected]);

    return <>{children}</>
}
