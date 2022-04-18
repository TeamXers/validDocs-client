import { useEffect, useState } from "react"
import {
    AppBar, Box, Toolbar, Typography,
    Container, Button, Menu, MenuItem,
    Divider, Link, IconButton
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useSnackbar } from 'notistack';
import { useEthers } from '@usedapp/core';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from "react-query";
import { useAppState } from '../context/Provider';
import { GET_ACCOUNT } from "../api/validdocs";
import { utils } from "ethers"
import { Testnet } from '../ChainConfig';


const Header = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { state, updateState } = useAppState();
    const navigate = useNavigate();
    const [menuAnchor, setMenuAnchor] = useState<any>(null);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const { activateBrowserWallet, account, active, deactivate, error, library, switchNetwork } = useEthers();
    const location = useLocation()

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    useQuery(['account', account], GET_ACCOUNT as any, {
        enabled: Boolean(account),
        onError: (error: any) => {
            enqueueSnackbar(error.message, { variant: 'error' });
        },
        onSuccess: (data: any) => {
            if (!updateState) {
                throw new Error('updateState is undefined!');
            }
            updateState({ account: data[0], walletConnected: true, walletAddress: account });
        }
    });

    useEffect(() => {
        if (!updateState || active) return;
        if (!state.walletConnected) return;

        updateState({ walletConnected: false, walletAddress: undefined });
    }, [active, state, updateState]);

    useEffect(() => {
        if (error) {

            enqueueSnackbar(error.message, { variant: 'error' });
        }
    }, [error]);

    const handleConnect = async () => {
        // setActivateError("")
        await activateBrowserWallet()
        // console.log(Testnet.chainId)
        // if(Testnet.chainId !== chainId )  { 
        try {
            await switchNetwork(Testnet.chainId)
        }
        catch (e: any) {
            if (e.code === 4902) {
                try {
                    await library ?.send("wallet_addEthereumChain", [{
                        chainId: utils.hexlify(1666700000),
                        chainName: 'Harmony Testnet Shard 0',
                        nativeCurrency: { name: "Harmony Testnet", symbol: "ONE", decimals: 18 },
                        rpcUrls: ["https://api.s0.b.hmny.io"],
                        blockExplorerUrls: ["https://explorer.pops.one/"],

                    }])
                }
                catch (e: any) {
                    console.log(e.message)
                }
            }
        }
        navigate("/account/documents")
        // }
    }

    return (
        <>
            <AppBar position="sticky" sx={{ zIndex: 1000, top: 0 }} >
                <Container maxWidth="xl" >
                    <Toolbar disableGutters sx={{ display: "flex", alignItems: "center", padding: "0 1rem" }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component={RouterLink} to="/"
                            sx={{
                                mr: 2, display: { xs: 'flex' },
                                fontFamily: '"Roboto", sans-serif',
                                color: 'inherit', textDecoration: 'none',
                                overflow: "visible"
                            }}
                        >
                            VALIDDOCS
                        </Typography>
                        <Box
                            sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: "flex-end", alignItems: "center", width: "100%" }}
                        >


                            {

                                location.pathname !== "/" ? (
                                    <Button color='inherit'>
                                        <Link component={RouterLink} to='/' sx={{ mr: 4, color: 'inherit' }}>
                                            Home
                                        </Link></Button>
                                ) : ""}
                            {
                                account
                                    ? <Button color='inherit'
                                        startIcon={<AccountCircleIcon />}
                                        onClick={(e) => setMenuAnchor(e.currentTarget)}
                                        sx={{ textTransform: "none" }} >
                                        Account
                                </Button>
                                    : <Button startIcon={<AccountBalanceWalletIcon />}
                                        onClick={handleConnect}
                                        color="inherit" sx={{ textTransform: "none" }} >
                                        Connect
                                </Button>
                            }
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, justifyContent: "flex-end", width: "100%", position: "absolute", left: 0 }}>
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
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' }, transform: `translate(${anchorElNav ? "0px , 0px" : "100vw, 0"})`, transition: "transition 0.4s"
                                }}
                            >
                                {

                                    location.pathname !== "/" ? (
                                        <MenuItem sx={{ width: "100vw" }}>

                                            <Button color='inherit'>
                                                <Link component={RouterLink} to='/' sx={{ mr: 4, color: 'inherit', textDecoration: "none", textTransform: "none", display: "flex", justifyContent: "center" }}>
                                                    Home
                                        </Link></Button>

                                        </MenuItem>) : ""
                                }
                                <MenuItem sx={{ width: "100vw", display: "flex" }} >
                                    {
                                        account
                                            ? <Button color='inherit'
                                                startIcon={<AccountCircleIcon color="primary" />}
                                                onClick={(e) => setMenuAnchor(e.currentTarget)}
                                                sx={{ textTransform: "none" }} >
                                                Account
                                            </Button>
                                            : <Button
                                                startIcon={<AccountBalanceWalletIcon color="primary" />}
                                                onClick={handleConnect}
                                                color="inherit" sx={{ textTransform: "none" }} >
                                                Connect
                                            </Button>
                                    }
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>

                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)}
                    onClose={() => setMenuAnchor(null)}
                >
                    <MenuItem disabled>{state.account ?.username || 'No username'}</MenuItem>
                    <Divider />
                    <MenuItem component={RouterLink} to='/account/documents'>Your Documents</MenuItem>
                    <MenuItem component={RouterLink} to='/account/profile'>Your Profile</MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {
                        deactivate();
                        setMenuAnchor(null);
                        navigate("/")
                    }}>Disconnect</MenuItem>
                </Menu>

            </AppBar>
        </>
    )
}


export default Header;