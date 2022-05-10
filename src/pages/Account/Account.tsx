import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppState } from "../../context/Provider";

export const Account = () => {
  const { state } = useAppState();
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (state.account || !state.walletConnected) return;
    if (location.pathname === "/account/profile") return;

    navigate("/account/profile");
    enqueueSnackbar("You need to connect your wallet and set your username", {
      variant: "info",
    });
  }, [state, location, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
};
