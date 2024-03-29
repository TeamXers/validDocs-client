import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Questions from "./components/Questions";
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
 
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SearchIcon from "@mui/icons-material/Search";
import SecureImage from "../../assets/undraw_secure_files_re_6vdh.svg";
import TrustImage from "../../assets/undraw_agreement_re_d4dv.svg";
import CheapImage1 from "../../assets/undraw_savings_re_eq4w.svg";
import CheapImage2 from "../../assets/illust58-261-removebg-preview.svg";
import SearchImage from "../../assets/undraw_searching_re_3ra9.svg";
import UploadIllustration from "../../assets/undraw_uploading_re_okvh.svg"
import VerifyIllustration from "../../assets/undraw_authentication_re_svpt.svg"
import SignIllustration from "../../assets/signing-terms-of-services-1785593-0.svg"
import PrivacyIllustration from "../../assets/undraw_safe_re_kiil.svg"
import DocumentHistoryIllustration from "../../assets/document_history.svg"
import FileTransferIllustration from "../../assets/transfer_files.svg"
import FileImage from "../../assets/undraw_my_files_swob.svg";
import { useEthers } from "@usedapp/core";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";


const Home = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const {
    activateBrowserWallet,
    account,
   
  } = useEthers();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };
  const handleSubmit = () => {
    navigate(`/search/${term}`);
  };

  const handleConnect = async () => {
    await activateBrowserWallet();
    navigate("/account/documents");
  };
 
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
              Validdocs allows you store, sign, manage, and verify documents using the Harmony blockchain and IPFS.
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
                    padding:"0.5rem 1.5rem"
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
                    Upload Document
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
        sx={{ margin: "6rem 0", backgroundColor: "#009688", padding: "6rem 0", color:"#fff" }}
        >
          <Container>
            <Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: "600",
                color: "#fff",
                fontSize: "32px !important",
                lineHeight: "32.5px",
                margin: "0 0 2rem 0",
                textAlign: { xs: "center", md: "center" },
              }}
            >
              All you need to manage documents on the blockchain
          
            </Typography> 
            <Typography sx={{ color: "#fff", textAlign: { xs: "center", md: "center" } }}>
              Take advantage of the power of the blockchain
            </Typography>
                  <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: `repeat(${1}, ${1}fr)`,
                md: `repeat(${3}, ${1}fr)`,
              },
            
              columnGap: "1.5rem",
              width: "100%",
              mt:"4rem"
            }}
          >
            <Box
            sx={{my:"1.5rem"}}
            >
              <Box 

              sx={{
                width: "70px",
                height:"70px",
                padding:"0.5rem",
                backgroundColor:"#fff",
                borderRadius:"50%",
                display:"flex",
                margin:"0 auto 2rem auto"
              }}
              >
              <Box
                  component="img"
                  src={UploadIllustration}
                  alt="upload documents"
                  sx={{
                    width:"100%",
                    height:"100%",
                
                  }}
                />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#fff" }}
                >
                  Upload
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    padding: { xs: "0", md: "0" },
                    margin: "2rem 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Upload formats include PDF, DOC, XLS, TXT, PPT, JPG, JPEG, and PNG.
                </Typography>
            </Box>
              <Box
                sx={{ my: "1.5rem" }}>
                <Box

                  sx={{
                    width: "70px",
                    height: "70px",
                    padding: "0.5rem",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent:"center",
                    alignItems:"center",
                    margin: "0 auto 2rem auto"
                  }}
                >
                  <Box
                    component="img"
                    src={VerifyIllustration}
                    alt="upload documents"
                    sx={{
                      width: "80%",
                      height: "100%",

                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#fff" }}
                >
            Verify
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    padding: { xs: "0", md: "0" },
                    margin: "2rem 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Search for a document to verify its authenticity.
                </Typography>
              </Box>
              <Box
                sx={{ my: "1.5rem" }}>
                <Box

                  sx={{
                    width: "70px",
                    height: "70px",
                    padding: "0.5rem",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    margin: "0 auto 2rem auto"
                  }}
                >
                  <Box
                    component="img"
                    src={SignIllustration}
                    alt="upload documents"
                    sx={{
                      width: "100%",
                      height: "100%",

                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#fff" }}
                >
                  Sign
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    padding: { xs: "0", md: "0" },
                    margin: "2rem 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Sign documents using your wallet address and invite others to sign.
                </Typography>
              </Box>  
              <Box
                sx={{ my: "1.5rem" }}>
                  <Box 

              sx={{
                width: "70px",
                height:"70px",
                padding:"0.5rem",
                backgroundColor:"#fff",
                borderRadius:"50%",
                display:"flex",
                margin:"0 auto 2rem auto"
              }}
              >
              <Box
                  component="img"
                  src={PrivacyIllustration}
                  alt="upload documents"
                  sx={{
                    width:"100%",
                    height:"100%",
                
                  }}
                />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#fff" }}
                >
                  Privacy Control
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    padding: { xs: "0", md: "0" },
                    margin: "2rem 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Create public or private documents and sharable links.
                </Typography>
              </Box>
              <Box
                sx={{ my: "1.5rem" }}>
                <Box 

              sx={{
                width: "70px",
                height:"70px",
                padding:"0.5rem",
                backgroundColor:"#fff",
                borderRadius:"50%",
                display:"flex",
                margin:"0 auto 2rem auto"
              }}
              >
              <Box
                  component="img"
                  src={FileTransferIllustration}
                  alt="upload documents"
                  sx={{
                    width:"100%",
                    height:"100%",
                
                  }}
                />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#fff" }}
                >
                  Transfer of Ownership
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    padding: { xs: "0", md: "0" },
                    margin: "2rem 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Transfer ownership from one wallet address to another.
                </Typography>
              </Box>
              <Box
                sx={{ my: "1.5rem" }}>
                <Box 

              sx={{
                width: "70px",
                height:"70px",
                padding:"0.5rem",
                backgroundColor:"#fff",
                borderRadius:"50%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                margin:"0 auto 2rem auto"
              }}
              >
              <Box
                  component="img"
                  src={DocumentHistoryIllustration}
                  alt="upload documents"
                  sx={{
                    width:"80%",
                
                
                  }}
                />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#fff" }}
                >
                  Document History
                </Typography>
                <Typography
                  sx={{
                    color: "#fff",
                    padding: { xs: "0", md: "0" },
                    margin: "2rem 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  View all information about a document since its upload.
                </Typography>
              </Box>
          </Box>
            </Box>
          </Container>
        </Box>
        <Box>
        <Container>
          <Box sx={{ margin: { xs: "3rem 0", md: "6rem 0" } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "600",
                color: "#252525",
                fontSize: "38px !important",
                lineHeight: "38.5px",
                margin: "0 0 2rem 0",
                textAlign: { xs: "center", md: "center" },
              }}
            >
              You can count on <Box component="span" sx={{ color: "#009688",}} >ValidDocs.</Box>

            </Typography>
            <Typography sx={{
           textAlign: "center", color: "rgba(0, 0, 0, 0.54)",
              }}>
              A seamless user experience plus web3 ethos of decentralization, immutability, and transparency.
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: `repeat(${1}, ${1}fr)`,
                  md: `repeat(${3}, ${1}fr)`,
                },
                rowGap:"3rem",
                columnGap: "1.5rem",
                width: "100%",
                mt:"4rem"
               }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "2px solid #ccc",
                  borderRadius: "15px",
                  padding:"1rem",
                  // boxShadow: "0px 3px 10px 0 rgba(0, 0, 0, 0.25)"
                }}
              >
                <Box
                  component="img"
                  src={SecureImage}
                  alt="process"
                  sx={{
                    width: { xs: "50%", md: "150px" },
                    height: { xs: "auto", md: "150px" },
                    margin: "0 0 1rem 0",

                  }}
                />

                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#009688", fontSize:"20px" }}
                >
                   Keep Document Secured
                </Typography>
                <Typography
                  sx={{
                    color: "#707070",
                    padding: { xs: "0", md: "0" },
                    margin: "1rem 0 0 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Your files are safe from security threats due to the blockchain and IPFS file system.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "2px solid #ccc",
                  borderRadius: "15px",
                  padding: "1rem",
                  // boxShadow: "0px 3px 10px 0 rgba(0, 0, 0, 0.25)"
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
                      width: { xs: "50%", md: "140px" },
                      height: { xs: "auto", md: "140px" },
                    }}
                  />
                </Box>
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#009688", fontSize: "20px" }}
                >
                  Spend Less on Gas Fees
                </Typography>
                <Typography
                  sx={{
                    color: "#707070",
                    padding: { xs: "0", md: "0" },
                    margin: "1rem 0 0 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Built on the Harmony blockchain to enjoy low gas fees.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "2px solid #ccc",
                  borderRadius: "15px",
                  padding: "1rem 1rem 0 1rem",
                  // boxShadow: "0px 3px 10px 0 rgba(0, 0, 0, 0.25)"
                }}
              >
                <Box
                  component="img"
                  src={TrustImage}
                  alt="process"
                  sx={{
                    width: { xs: "50%", md: "150px" },
                    height: { xs: "auto", md: "150px" },
                    margin: "0 0 1rem 0",
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{ textAlign: "center", color: "#009688", fontSize: "20px" }}
                >
                  Enjoy Trust
                </Typography>
                <Typography
                  sx={{
                    color: "#707070",
                    padding: { xs: "0", md: "0" },
                    margin: "1rem 0 0 0",
                    fontWeight: "300",
                    textAlign: "center",
                  }}
                >
                  Leverage the blockchain&apos;s immutability to tamper{"-"}proof your documents.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
          </Box>
     
     
      <Container>
        <Box sx={{ margin: { xs: "6rem 0 3rem 0", md: "12rem 0 6rem 0" } }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center", fontWeight: 600, color: "#252525", fontSize: "38px !important",
              lineHeight: "38.5px", }}
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
              margin: "2rem 0 0rem 0",
            }}
          >
            Start for free. Go Pro with more features and no limits.
          </Typography>

          <Box
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
                {"$"}0 /{" "}
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
                {"$"}10  /{" "}
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
                {"$"}100 /{" "}
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
          <Typography sx={{textAlign:"center"}}>
            {"*"}Payments are made in Harmony ONE.
          </Typography>
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
                Search for a document uploaded on ValidDocs.
              </Typography>
              <Typography sx={{ color: "#fff" }}>
                Access all public documents uploaded on ValidDocs
              </Typography>

              <Input
                type="search"
                onChange={handleChange}
                name="search"
                placeholder="Enter the document name"
                disableUnderline={true}
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
      <Container sx={{margin: { xs: "0 auto 3rem auto", md: "0 auto 6rem auto" }}}>
<Box>
  <Typography
            variant="h2"
            sx={{
              textAlign: "center", fontWeight: 600, color: "#252525", fontSize: "38px !important",
              lineHeight: "38.5px", }}>
            Questions{"?"} <Box component="span" sx={{ color:"#009688" }}>Answers</Box>
    </Typography>
    <Typography
            sx={{
              textAlign: "center",
              color: "rgba(0, 0, 0, 0.54)",
              margin: "2rem 0 4rem 0",
            }}>
            Don’t see your question? Email Hey@validdocs.one 
    </Typography>
    <Box>
      <Questions />
    </Box>
  </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
