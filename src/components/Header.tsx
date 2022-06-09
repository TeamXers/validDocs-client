import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Menu,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Logo from "../assets/Black_and_White_Logo_Symbol_only_Transparent.png";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useSnackbar } from "notistack";
import { useEthers } from "@usedapp/core";
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAppState } from "../context/Provider";
import { utils } from "ethers";
import { Testnet } from "../ChainConfig";

const Header = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, updateState } = useAppState();
  const navigate = useNavigate();
  const { term } = useParams();
  const [searchTerm, setSearchTerm] = useState(term ?? "");
  const [menuAnchor, setMenuAnchor] = useState<any>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const {
    activateBrowserWallet,
    account,
    active,
    deactivate,
    error,
    library,
    switchNetwork,
    chainId,
  } = useEthers();
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    if (error) {
      if (error.message.includes(`"code": 1013`)) {
        console.log("dfghjmk,l.kjmhg")
        console.log(error.message)

      }
      else {
        enqueueSnackbar(error.message, { variant: "error" });
        console.log("ut2", error);
      }
    }
  }, [error]);

  const handleConnect = async () => {
    // setActivateError("");
    await activateBrowserWallet();
    navigate("/account/documents");
  };
  const handleSwitch = async () => {
    if (account) {
      if (Testnet.chainId !== chainId) {
        try {
          await switchNetwork(Testnet.chainId);
          await activateBrowserWallet();
        } catch (e: any) {

          if (e.code === 4902) {
            try {
              await library?.send("wallet_addEthereumChain", [
                {
                  chainId: utils.hexlify(1666700000),
                  chainName: "Harmony Testnet Shard 0",
                  nativeCurrency: {
                    name: "Harmony Testnet",
                    symbol: "ONE",
                    decimals: 18,
                  },
                  rpcUrls: ["https://api.s0.b.hmny.io"],
                  blockExplorerUrls: ["https://explorer.pops.one/"],
                },
              ]);
            } catch (e: any) {
              console.log(e.message);
            }
          }
          else if (e.code === 1013) {
            console.log("qwertyuiop")
          }
        }
        navigate("/account/documents");
      }
    }
  };
  useEffect(() => {
    handleSwitch();
  }, [account]);

  useEffect(() => {
    if (!updateState || active) return;
    if (!state.walletConnected) return;

    updateState({ walletConnected: false, walletAddress: undefined });
  }, [active, state, updateState]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  }, [error]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  };

  const HOVER_STYLE = (path: string) => {
    if (location.pathname === path) {
      return {
        ":after": {
          content: '""',
          width: "40px",
          height: "3px",
          position: "absolute",
          bottom: 0,
          left: "50%",
          backgroundColor: "#fff",
          borderRadius: "20px",
          transform: `translate(-${50}%, ${0}rem)`
        }
      }
    }
    else {
      return {
        ":hover": {
          ":after": {
            content: '""',
            width: "40px",
            height: "3px",
            position: "absolute",
            bottom: 0,
            left: "50%",
            backgroundColor: "#fff",
            borderRadius: "20px",
            transform: `translate(-${50}%, ${0}rem)`
          }
        }
      }
    }

  }

  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 1000, top: 0 }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: "flex", alignItems: "center", padding: "0 1rem" }}
          >
            <img
              src={Logo}
              style={{ width: "30px", height: "30px", margin: "0 0.5rem 0 0" }}
              alt="logo"
            />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex" },
                fontFamily: '"Roboto", sans-serif',
                color: "inherit",
                textDecoration: "none",
                overflow: "visible",
              }}
            >
              VALIDDOCS
            </Typography>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "flex-end",
                alignItems: "center",
                width: "100%",
              }}
            >

              <Button
                color="inherit"
                sx={
                  Object.assign(
                    { mr: "1rem", color: "inherit", textTransform: "none" },
                    HOVER_STYLE("/")
                  )
                }
                component={RouterLink}
                // startIcon={<HomeIcon />}
                to="/"
              >
                Home
              </Button>

              <Button
                color="inherit"
                sx={
                  Object.assign(
                    {
                      mr: "1rem",
                      color: "inherit",
                      textTransform: "none",
                      position: "relative",
                    },
                    HOVER_STYLE("/about-us")
                  )

                }
                component={RouterLink}
                // startIcon={<PeopleAltIcon />}
                to="/about-us"
              >
                About us
              </Button>
              {account ? (
                <Button
                  color="inherit"
                  startIcon={<AccountCircleIcon />}
                  onClick={(e) => setMenuAnchor(e.currentTarget)}
                  sx={{ textTransform: "none" }}
                >
                  Account
                </Button>
              ) : (
                <Button
                  startIcon={<AccountBalanceWalletIcon />}
                  onClick={handleConnect}
                  color="inherit"
                  sx={{ 
                    textTransform: "none",
                    ":hover": {
                      ":after": {
                        content: '""',
                        width: "40px",
                        height: "3px",
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        backgroundColor: "#fff",
                        borderRadius: "20px",
                        transform: `translate(-${50}%, ${0}rem)`
                      }
                    }
                 }}
                >
                  Connect
                </Button>
              )}

              {location.pathname !== `/search/${term}` ? (
                <>
                  <div className="container-2" style={{ marginLeft: "1rem" }}>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="search"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setSearchTerm(e.target.value)
                        }
                        placeholder="Find Document"
                        className="search-header"
                        name="search"
                      />
                    </form>
                    <SearchIcon
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: 0,
                        transform: `translate(0px, ${-44}%)`,
                      }}
                    />
                  </div>
                </>
              ) : (
                ""
              )}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", sm: "none" },
                justifyContent: "flex-end",
                width: "100%",
                position: "absolute",
                left: 0,
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  transform: `translate(${anchorElNav ? "0px , 0px" : "100vw, 0"
                    })`,
                  transition: "transition 0.4s",
                }}
              >
                {location.pathname !== "/" ? (
                  <MenuItem sx={{ width: "100vw" }}>
                    <Button
                      color="inherit"
                      component={RouterLink}
                      to="/"
                      sx={{
                        mr: 4,
                        color: "inherit",
                        textDecoration: "none",
                        textTransform: "none",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Home
                    </Button>
                  </MenuItem>
                ) : (
                  ""
                )}

                <MenuItem sx={{ width: "100vw", display: "flex" }}>
                  {account ? (
                    <Button
                      color="inherit"
                      startIcon={<AccountCircleIcon color="primary" />}
                      onClick={(e) => setMenuAnchor(e.currentTarget)}
                      sx={{
                        textTransform: "none",
                        width: "100%",
                        justifyContent: { xs: "flex-start", md: "center" },
                      }}
                    >
                      Account
                    </Button>
                  ) : (
                    <Button
                      startIcon={<AccountBalanceWalletIcon color="primary" />}
                      onClick={handleConnect}
                      color="inherit"
                      sx={{ textTransform: "none" }}
                    >
                      Connect
                    </Button>
                  )}
                </MenuItem>
                {location.pathname !== `/search/${term}` ? (
                  <MenuItem>
                    <>
                      <Box sx={{ width: "100%", height: "100%" }}>
                        <SearchIcon
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "1.2rem",
                            transform: `translate(0px, ${-44}%)`,
                          }}
                        />
                        <form onSubmit={handleSubmit}>
                          <input
                            className="search-header-mobile"
                            type="search"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => setSearchTerm(e.target.value)}
                            placeholder="Find Document"
                            style={{ paddingLeft: "35px" }}
                            name="search"
                          />
                        </form>
                      </Box>
                    </>
                  </MenuItem>
                ) : (
                  ""
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem disabled>
            {state.account?.username || "No display name"}
          </MenuItem>
          <Divider />
          <MenuItem component={RouterLink} to="/account/documents">
            Your Documents
          </MenuItem>
          <MenuItem component={RouterLink} to="/account/profile">
            Your Profile
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              deactivate();
              if (!updateState) {
                throw new Error("updateState is undefined!");
              }
              updateState({ walletConnected: false, walletAddress: undefined });
              setMenuAnchor(null);
              navigate("/");
            }}
          >
            Disconnect
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
};

export default Header;
