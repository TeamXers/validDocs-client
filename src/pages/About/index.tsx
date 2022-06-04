import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Questions from "../Home/components/Questions";
import {
    Box,
    Container,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material"
import SquareIcon from '@mui/icons-material/Square';
import { Helmet } from "react-helmet"; 
import VisionaryIllustration from "../../assets/undraw_visionary_technology_re_jfp7.svg"
import UploadIllustration from "../../assets/undraw_uploading_re_okvh.svg"
import VerifyIllustration from "../../assets/undraw_authentication_re_svpt.svg"
import SignIllustration from "../../assets/signing-terms-of-services-1785593-0.svg"
import PrivacyIllustration from "../../assets/undraw_safe_re_kiil.svg"
import DocumentHistoryIllustration from "../../assets/document_history.svg"
import FileTransferIllustration from "../../assets/transfer_files.svg"
import Pattern from "../../assets/polygon-scatter-haikei.svg"
import Pattern2 from "../../assets/polygon-scatter-haikei-full.svg"
import WavePattern from "../../assets/layered-peaks-haikei.svg"


const About = ()=>{
    return(
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>
                    About us - ValidDocs
                </title>
            </Helmet>
        <Header />
            <Box >
                <Box
                    sx={{
                        textAlign: "center",
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                       
position:"relative"
                    }}
                >
                    <Typography
                        variant={"h2"}
                        sx={{
                            fontWeight: "600",
                            color: "#252525",
                            fontSize: "38px !important",
                            lineHeight: "38.5px",
                        }}
                    >
                        Documents in <span style={{ color: "#009688" }}>Web3</span>
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
                        We are building document revolution with Validdocs, powered by harmony blockchain and IPFS.
                    </Typography>
                    <Box 
                    sx={{
                        position:"absolute",
                        top:0,
                        width:"100%",
                        height:"100%",
                        opacity:"0.3",
                            backgroundImage: `url(${Pattern})`,
                    }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            width: "100%",
                            height: "100%",
                            opacity: "0.1",
                            backgroundImage: `url(${Pattern2})`,
                        }}
                    />
                    {/* <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            width: "100%",
                            height: "100%",
                            opacity: "0.8",
                            // backgroundRepeat:"no-repeat",
                            // backgroundSize:"cover",
                            // backgroundImage: `url(${WavePattern})`,
                        }}
                    >
 <Box
component="img"
                            src={WavePattern}
                            alt="pattern"
                            sx={{
                                width:"100%",
                                maxHeight:"100vh"
                            }}
                            /> 
                    </Box> */}
                </Box>
<Container>
 
    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            margin: {xs: "6rem 0 3rem 0", md: "6rem 0 6rem 0" } 
                        }}
    >
<Box
                            sx={{ maxWidth: { xs: "100%", md: "60%" } }}
>
            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: "600",
                                    color: "#252525",
                                    fontSize: "32px !important",
                                    lineHeight: "32.5px",
                                    margin: "0 0 2rem 0",
                              
                                }}
            >
                                About <span style={{ color: "#009688" }}>us</span>
                </Typography>      
                        <Box>
                            <Typography
                            sx={{
                                mb:"1rem"
                            }}
                            >
                                    Validdocs is a web3 application that allows you to store, sign, manage, and verify documents using the Harmony blockchain and IPFS (Interplanetary File System).

                            </Typography>
                            <Typography
                                    sx={{
                                        mb: "1rem"
                                    }}
                            >
                                    Validdocs lets you upload any document, view it, and share it. Validdocs has a privacy feature that allows you to make your uploaded document public for search, private for personal use, create a sharable link, and add specific wallet addresses to view private documents. Validdocs also allows users to sign documents using their wallet addresses.
                            </Typography>
                            <Typography
                                    sx={{
                                        mb: "1rem"
                                    }}
                            >
                                    We mint NFTs for each document uploaded to our platform, and we store the document file on IPFS. Anybody can verify the authenticity of a document by inspecting the NFT using the harmony explorer.
                            </Typography>
                            <Typography
                                    sx={{
                                        mb: "1rem"
                                    }}
                            >
                                    Our goal is to provide a seamless user experience that web2 solutions offer while keeping true to the web3 ethos of decentralization, immutability, and transparency.
                            </Typography>
                            <Typography>
                                    Imagine a society where;
                            </Typography>
                        
                                <List>
                             
                                        <ListItem>
                                            <ListItemIcon sx={{minWidth:"16px"}}>
                                            <SquareIcon color="primary" sx={{ fontSize: 10 }}/>
                                            </ListItemIcon>
                                            <ListItemText
                                            primary="Physical contracts and deeds are signed and stored, with the blockchain tracking their authenticity."
                                            />
                                        </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: "16px" }}>
                                            <SquareIcon color="primary" sx={{ fontSize: 10 }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Governmental bodies upload documents for everyone to access in total transparency."
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon sx={{ minWidth: "16px" }}>
                                            <SquareIcon color="primary" sx={{ fontSize: 10 }} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary="Schools upload certificates, and companies can validate the authenticity of those certificates by checking their history on the blockchain."
                                        />
                                    </ListItem>
                                </List>
                                <Typography>We are building this revolution with Validdocs, and the harmony blockchain and IPFS power this. </Typography>
                        </Box>
</Box>
<Box
                            sx={{
                                width: { xs: "100%", md: "40%" },
                                position: "relative",
                                margin: { xs: "2rem 0 0 0", md: "0" },
                                pl:"2rem"
                            }}
                            >
                    <Box
                        component="img"
                        src={VisionaryIllustration}
                        alt="about"
                        sx={{ width: "100%" }}
                    />
                    </Box>
     </Box>
</Container>
        </Box>
            <Box
                sx={{ margin: "6rem 0", backgroundColor: "#009688", padding: "6rem 0", color: "#fff" }}
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
                                mt: "4rem"
                            }}
                        >
                            <Box
                                sx={{ my: "1.5rem" }}
                            >
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
                                        src={UploadIllustration}
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
                                        justifyContent: "center",
                                        alignItems: "center",
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
                                        src={PrivacyIllustration}
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
                                        src={FileTransferIllustration}
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
                                        height: "70px",
                                        padding: "0.5rem",
                                        backgroundColor: "#fff",
                                        borderRadius: "50%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        margin: "0 auto 2rem auto"
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={DocumentHistoryIllustration}
                                        alt="upload documents"
                                        sx={{
                                            width: "80%",


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
                <Container sx={{ margin: { xs: "0 auto 3rem auto", md: "0 auto 6rem auto" } }}>
                    <Box>
                        <Typography
                            variant="h2"
                            sx={{
                                textAlign: "center", fontWeight: 600, color: "#252525", fontSize: "38px !important",
                                lineHeight: "38.5px",
                            }}>
                            Questions{"?"} <Box component="span" sx={{ color: "#009688" }}>Answers</Box>
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
            </Box>
        <Footer />
        </>
    )
}


export default About