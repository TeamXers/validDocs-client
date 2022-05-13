import { Box, Skeleton, Stack } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAppState } from "../../context/Provider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SlidingAccountForm } from "../../components/accounts/AccountForm";

export const Account = () => {
  const { state } = useAppState();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const { activateBrowserWallet } = useEthers();
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    if (state.account || !state.walletConnected) return;

    (async () => {
      if (!state.walletConnected) {
        await activateBrowserWallet();
      }

      setShowSetup(true);
      enqueueSnackbar("Set your display name", {
        variant: "info",
      });
    })();
  }, [state, activateBrowserWallet, location, setShowSetup]);

  return (
    <>
      {state.walletConnected && <Outlet />}
      {!state.walletConnected && (
        <Box>
          <Header />

          <Stack sx={{ mt: "2rem", maxWidth: "60rem", mx: "auto", px: 2 }}>
            <Skeleton sx={{ height: "15rem" }} />
            <Skeleton sx={{ height: "15rem" }} />
            <Skeleton sx={{ height: "15rem" }} />
          </Stack>

          <Footer />
        </Box>
      )}

      <SlidingAccountForm open={showSetup} onClose={() => setShowSetup(false)} />
    </>
  );
};
