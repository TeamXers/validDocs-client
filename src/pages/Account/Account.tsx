import { useEthers } from "@usedapp/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppState } from "../../context/Provider";
import { SlidingAccountForm } from "../../components/accounts/AccountForm";

export const Account = () => {
  const { state } = useAppState();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { activateBrowserWallet } = useEthers();
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    if (
      state.account || !state.ready || !state.authToken || !state.walletConnected
    ) {
      setShowSetup(false);
      return;
    }
    let isMounted = true;

    (async () => {
      if (!state.walletConnected) {
        await activateBrowserWallet();
      }

      if (!isMounted) return;

      setShowSetup(true);
      enqueueSnackbar("Set your display name", {
        variant: "info",
      });
    })();

    return () => { isMounted = false; };
  }, [state, activateBrowserWallet, location, setShowSetup]);

  return (
    <>
      <Outlet />
      <SlidingAccountForm open={showSetup} onClose={() => setShowSetup(false)} />
    </>
  );
};
