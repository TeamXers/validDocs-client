import { Box, Skeleton, Stack } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../context/Provider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const Account = () => {
    const { state } = useAppState();
    const location = useLocation();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { activateBrowserWallet } = useEthers();

    useEffect(() => {
        if (state.account || !state.walletConnected) return;
        if (location.pathname === "/account/profile") return;

        navigate("/account/profile");
        enqueueSnackbar("You need to connect your wallet and set your username", {
            variant: "info",
        });
    }, [state, location, navigate]);

    useEffect(() => {
        if (state.walletConnected) return;
        activateBrowserWallet();
    }, [activateBrowserWallet, state]);

    return <>
        {state.walletConnected && <Outlet />}
        {
            !state.walletConnected && <Box>
                <Header />

                <Stack sx={{ mt: '2rem', maxWidth: '60rem', mx: 'auto', px: 2 }}>
                    <Skeleton sx={{ height: '15rem' }} />
                    <Skeleton sx={{ height: '15rem' }} />
                    <Skeleton sx={{ height: '15rem' }} />
                </Stack>

                <Footer />
            </Box>
        }
    </>
}
