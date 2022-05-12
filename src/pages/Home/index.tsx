import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Avatar,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import SecureImage from "../../assets/undraw_secure_files_re_6vdh.svg";
import TrustImage from "../../assets/undraw_agreement_re_d4dv.svg";
import CheapImage1 from "../../assets/undraw_savings_re_eq4w.svg";
import CheapImage2 from "../../assets/illust58-261-removebg-preview.svg";
import SearchImage from "../../assets/undraw_searching_re_3ra9.svg";
import FileImage from "../../assets/undraw_my_files_swob.svg";
import { useEthers } from "@usedapp/core";
import { Testnet } from "../../ChainConfig";
import { utils, providers, getDefaultProvider } from "ethers";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAppState } from "../../context/Provider";

const Home = () => {
  const [activateError, setActivateError] = useState("");
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { state } = useAppState();
  const {
    activateBrowserWallet,
    account,
    chainId,
    library,
    switchNetwork,
    active,
  } = useEthers();
  // useEffect(() => {

  //     if (error) {
  //         setActivateError(error.message)
  //         console.log(activateError)
  //     }
  // }, [error, activateError])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  const handleSubmit = () => {
    navigate(`/search/${term}`);
  };

  const handleConnect = async () => {
    setActivateError("");
    await activateBrowserWallet();
    navigate("/account/documents");
  };
  const handleSwitch = async () => {
    if (state.account?.address) {
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
        }
        navigate("/account/documents");
      }
    }
  };
  useEffect(() => {
    handleSwitch();
  }, [account]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          ValidDocs, Protect the Authenticity and Integrity of Your Documents
        </title>
      </Helmet>
      <Header />

      <Container>
        <Box
          sx={{
            display: "flex",
            padding: { xs: "3rem 0rem", md: "6rem 1rem" },
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box sx={{ maxWidth: { xs: "100%", md: "50%" } }}>
            <Typography
              variant={"h2"}
              sx={{
                fontWeight: "600",
                color: "#252525",
                fontSize: "38px !important",
                lineHeight: "38.5px",
              }}
            >
              Protect the Authenticity and Integrity of Your Documents
            </Typography>
            <Typography
              variant={"h6"}
              sx={{
                color: "#707070",
                padding: { xs: "0", md: "0 2rem 0 0" },
                margin: "2rem 0",
                fontWeight: "300",
              }}
            >
              ValidDoc enables you to take avantage of core features of the
              blockchain such as immutability, an added layer of security and
              privacy, in order to protect documents that are vital to you.
              <br />
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              {!account ? (
                <Button
                  variant="contained"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "1rem 0",
                    borderRadius: "10px",
                  }}
                  onClick={handleConnect}
                >
                  Connect Wallet
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      margin: { xs: "1rem", md: "0rem 1rem" },
                      borderRadius: "10px",
                    }}
                    onClick={() => navigate("/account/documents/new")}
                  >
                    Create Document
                  </Button>
                </>
              )}
              {account ? (
                <Button
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: { xs: "1rem", md: "0rem 1rem" },
                    borderRadius: "10px",
                  }}
                  onClick={() => navigate("/account/documents")}
                >
                  View your Documents
                </Button>
              ) : (
                ""
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              position: "relative",
              margin: { xs: "2rem 0 0 0", md: "0" },
            }}
          >
            <Box
              component="img"
              src={FileImage}
              alt="landing"
              sx={{ width: "100%" }}
            />
          </Box>
        </Box>
      </Container>

      <Box
        sx={{ margin: "6rem 0", backgroundColor: "#009688", padding: "6rem 0" }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: { xs: "column-reverse", md: "row-reverse" },
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "50%" } }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: "600",
                  color: "#fff",
                  fontSize: "32px !important",
                  lineHeight: "32.5px",
                  margin: "0 0 2rem 0",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Looking for something?
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                search for documents using unique reference ID
              </Typography>

              <Input
                type="search"
                onChange={handleChange}
                name="search"
                placeholder="Enter reference ID"
                sx={{
                  display: "flex",
                  width: { xs: "90%", sm: "90%" },
                  padding: ".5rem 1rem",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  margin: { xs: "2rem auto", md: "2rem 0" },
                }}
                endAdornment={
                  <InputAdornment position="end">
                    {" "}
                    <SearchIcon />{" "}
                  </InputAdornment>
                }
              />
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  display: { xs: "flex", md: "inline-flex" },
                  margin: { xs: "0 auto", md: "0" },
                  backgroundColor: "rgb(0, 191, 173)",
                  borderRadius: "10px",
                  padding: ".7rem 2rem",
                }}
              >
                Search
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", md: "flex-start" },
                width: { xs: "100%", md: "50%" },
                margin: { xs: "0 0 2rem 0", md: "0" },
              }}
            >
              <Box
                component="img"
                src={SearchImage}
                alt="search"
                sx={{ width: "70%" }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
      <Container>
        <Box sx={{ margin: { xs: "3rem 0", md: "6rem 0" } }}>
          <Grid
            container
            columns={12}
            columnSpacing={{ xs: "0", md: "2rem" }}
            sx={{ display: "flex" }}
          >
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={SecureImage}
                alt="process"
                sx={{
                  width: { xs: "50%", md: "300px" },
                  height: { xs: "auto", md: "300px" },
                  margin: "0 0 1rem 0",
                }}
              />

              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "#009688" }}
              >
                Secure
              </Typography>
              <Typography
                sx={{
                  color: "#707070",
                  padding: { xs: "0", md: "0" },
                  margin: "2rem 0",
                  fontWeight: "300",
                  textAlign: "center",
                }}
              >
                Your files are very safe from security threats due to the
                combination of the blockchain and IPFS file system
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                // component="img"
                // src={PlaceHolder2}
                // alt="process"
                sx={{
                  margin: "0 0 1rem 0",
                  backgroundImage: `url(${CheapImage1}), url(${CheapImage2})`,
                  backgroundRepeat: "no-repeat, no-repeat",
                  backgroundSize: {
                    xs: "contain, contain",
                    md: "contain contain",
                  },
                  backgroundPosition: "50% 100%, 50% 100%",
                }}
              >
                <Box
                  component="img"
                  src={TrustImage}
                  alt="process"
                  sx={{
                    visibility: "hidden",
                    width: { xs: "50%", md: "300px" },
                    height: { xs: "auto", md: "300px" },
                  }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "#009688" }}
              >
                Cheap
              </Typography>
              <Typography
                sx={{
                  color: "#707070",
                  padding: { xs: "0", md: "0" },
                  margin: "2rem 0",
                  fontWeight: "300",
                  textAlign: "center",
                }}
              >
                Built on the Harmony blockchain which has cheaper gas fees!
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={TrustImage}
                alt="process"
                sx={{
                  width: { xs: "50%", md: "300px" },
                  height: { xs: "auto", md: "300px" },
                  margin: "0 0 1rem 0",
                }}
              />
              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "#009688" }}
              >
                Trust
              </Typography>
              <Typography
                sx={{
                  color: "#707070",
                  padding: { xs: "0", md: "0" },
                  margin: "2rem 0",
                  fontWeight: "300",
                  textAlign: "center",
                }}
              >
                Leverage the blockchain&apos;s immutability to make your
                documents tamper-proof
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container>
        <Box sx={{ margin: { xs: "3rem 0", md: "6rem 0" } }}>
          <Typography
            variant="h2"
            sx={{ textAlign: "center", fontWeight: 600, color: "#252525" }}
          >
            Options that fit{" "}
            <Box component="span" sx={{ color: "#009688" }}>
              your needs{" "}
            </Box>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(0, 0, 0, 0.54)",
              margin: "1rem 0 0rem 0",
            }}
          >
            Start for free. Go Pro with more features and no limits.
          </Typography>

          <Box
            /* Grid
            container
            columns={12}
            columnSpacing={{ xs: "0", md: "2rem" }} */

            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: `repeat(${1}, ${1}fr)`,
                md: `repeat(${3}, ${1}fr)`,
              },
              columnGap: "1rem",
              width: "100%",
            }}
          >
            <Box
              /* Grid
              item
              xs={12}
              md={4} */
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px solid #ccc",
                borderRadius: "15px",
                margin: "2rem 0",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "#009688", margin: "1rem 0" }}
              >
                Free
              </Typography>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "#009688" }}
              >
                0 ONE /{" "}
                <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>Forever</span>
              </Typography>

              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  padding: "2rem 0",
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="100 Document Uploads" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="File Format includes PDF, DOC, DO1CX, XLS, TXT, PPT, JPG, JPEG, and  PNG." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Create private and public documents" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Shareable links to documents " />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Document History" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Add 10 Wallet Addresses to a Private documents" />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Transfer of Ownership (Coming Soon)" />
                </ListItem>
              </List>
              <Button
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  width: "95%",
                  py: "1rem",
                  mb: "1rem",
                }}
              >
                Start now
              </Button>
            </Box>
            <Box
              /* Grid
              item
              xs={12}
              md={4} */
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px solid #ccc",
                borderRadius: "15px",
                margin: "2rem 0",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "#009688", margin: "1rem 0" }}
              >
                Pro
              </Typography>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "#009688" }}
              >
                50 ONE /{" "}
                <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>Month</span>
              </Typography>

              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  padding: "2rem 0",
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Everything in Free" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Unlimited Document Uploads" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Add Unlimited Wallet Addresses to a Private documents" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Document Signing
"
                  />
                </ListItem>
              </List>
              <Button
                disabled
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  width: "95%",
                  py: "1rem",
                  mb: "1rem",
                  mt: "auto",
                }}
              >
                Coming soon
              </Button>
            </Box>
            <Box
              /* Grid
              item
              xs={12}
              md={4} */
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px solid #ccc",
                borderRadius: "15px",
                margin: "2rem 0",
              }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: "center", color: "#009688", margin: "1rem 0" }}
              >
                Business
              </Typography>
              <Typography
                variant="h4"
                sx={{ textAlign: "center", color: "#009688" }}
              >
                1000 One /{" "}
                <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>Month</span>
              </Typography>

              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  padding: "2rem 0",
                }}
              >
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Everything in Pro" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Multiple Users per account" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="API Integration" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Set a fee for document search and validation." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "#228c22" }} />
                  </ListItemIcon>
                  <ListItemText primary="Verified Account" />
                </ListItem>
              </List>
              <Button
                disabled
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  width: "95%",
                  py: "1rem",
                  mb: "1rem",
                  mt: "auto",
                }}
              >
                Coming soon
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
