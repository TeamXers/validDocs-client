import Header from "../../components/Header"
import Footer from "../../components/Footer"
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
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import JeffPic from "../../assets/jeff_pic.png"
import NovoPic from "../../assets/novo_pic.jpg"
import ToyoPic from "../../assets/toyo_pic.png"




const TeamValid = () => {
    return (
        <>
            <Header />
            <Box
                sx={{
                    padding: { xs: "3rem 0rem", md: "6rem 0" },
                }}
            >
                <Container>
                    <Box
                        sx={
                            {
                                display: "flex",
                                width: "100%",
                                flexDirection: "column",
                                alignItems: "center"
                            }
                        }
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
                            Meet The <span style={{ color: "#009688" }}>Team</span>
                        </Typography>

                        <Typography
                            variant={"h6"}
                            sx={{
                                color: "#707070",
                                padding: { xs: "0", md: "0 2rem 0 0" },
                                margin: "2rem 0",
                                fontWeight: "300",
                                textAlign: "center"
                            }}
                        >
                            We are building the future of document storage, powered by Harmony Blockchain and IPFS.
                            <br />
                        </Typography>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: `repeat(${1}, ${1}fr)`,
                                    md: `repeat(${3}, ${1}fr)`,
                                },
                                rowGap: "3rem",
                                columnGap: "1.5rem",
                                width: "100%",
                                mt: "4rem"
                            }}
                        >
                            <Box
                                sx={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }
                                }
                            >
                                <Box
                                    component="img"
                                    sx={
                                        {
                                            borderRadius: "20px",
                                            width: "90%",
                                            maxWidth: "90%"
                                        }
                                    }
                                    src={NovoPic}
                                    alt="Emmanuel Usiwoma"
                                />
                                <Typography
                                    variant={"h6"}
                                    sx={{
                                        color: "#252525",
                                        margin: "1rem 0",
                                        fontWeight: "600",
                                    }}
                                >
                                    Usiwoma Emmanuel
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#707070",
                                        fontWeight: "300",
                                    }}
                                >
                                    Software Engineer
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "90%",
                                        mt: "1rem"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <LinkedInIcon />
                                        </Button>

                                    </Box>
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <GitHubIcon />
                                        </Button>

                                    </Box>
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <TwitterIcon />
                                        </Button>

                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }
                                }
                            >
                                <Box
                                    sx={{
                                        borderRadius: "20px",
                                        width: "90%",
                                        maxWidth: "90%",
                                        height: "100%"
                                    }}
                                >
                                    <Box
                                        component="img"
                                        sx={
                                            {
                                                borderRadius: "20px",
                                                width: "100%",
                                                maxWidth: "100%",
                                                height: "100%",
                                                objectFit: "cover"

                                            }
                                        }
                                        src={ToyoPic}
                                        alt="Toyosi Ayanleye"
                                    />
                                </Box>
                                <Typography
                                    variant={"h6"}
                                    sx={{
                                        color: "#252525",
                                        margin: "1rem 0",
                                        fontWeight: "600",
                                    }}
                                >
                                    Ayanleye Toyosi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#707070",
                                        fontWeight: "300",
                                    }}
                                >
                                    Content Marketing
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "90%",
                                        mt: "1rem"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <LinkedInIcon />
                                        </Button>

                                    </Box>
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <GitHubIcon />
                                        </Button>

                                    </Box>
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <TwitterIcon />
                                        </Button>

                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                sx={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }
                                }
                            >
                                <Box
                                    component="img"
                                    sx={
                                        {
                                            borderRadius: "20px",
                                            width: "90%",
                                            maxWidth: "90%"
                                        }
                                    }
                                    src={JeffPic}
                                    alt="Ango Jeffrey"
                                />
                                <Typography
                                    variant={"h6"}
                                    sx={{
                                        color: "#252525",
                                        margin: "1rem 0",
                                        fontWeight: "600",
                                    }}
                                >
                                    Ango Jeffrey
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#707070",
                                        fontWeight: "300",
                                    }}
                                >
                                    Frontend Engineer
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        width: "90%",
                                        mt: "1rem"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <LinkedInIcon />
                                        </Button>

                                    </Box>
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <GitHubIcon />
                                        </Button>

                                    </Box>
                                    <Box
                                        sx={{
                                            mx: "0.25rem",
                                            color: "#252525",
                                            ":hover": {
                                                color: "#009688"
                                            }
                                        }}
                                    >
                                        <Button
                                            component="a"
                                            href=""
                                            color="inherit"
                                            sx={{
                                                width: "fit-content",
                                                minWidth: "auto"
                                            }}
                                        >
                                            <TwitterIcon />
                                        </Button>

                                    </Box>
                                </Box>
                            </Box>
                         
                            {/* <Box
                                sx={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }
                                }
                            >
                                <Box
                                    component="img"
                                    sx={
                                        {
                                            borderRadius: "20px",
                                            width: "90%",
                                            maxWidth: "90%"
                                        }
                                    }
                                    src={ToyoPic}
                                    alt="Toyosi Ayanleye"
                                />
                                <Typography
                                    variant={"h6"}
                                    sx={{
                                        color: "#252525",
                                        margin: "1rem 0",
                                        fontWeight: "600",
                                    }}
                                >
                                    Ayanleye Toyosi
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#707070",
                                        fontWeight: "300",
                                    }}
                                >
                                    Web3 Specialist
                                </Typography>
                            </Box>
                            <Box
                                sx={
                                    {
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center"
                                    }
                                }
                            >
                                <Box
                                    component="img"
                                    sx={
                                        {
                                            borderRadius: "20px",
                                            width: "90%",
                                            maxWidth: "90%"
                                        }
                                    }
                                    src={ToyoPic}
                                    alt="Toyosi Ayanleye"
                                />
                                <Typography
                                    variant={"h6"}
                                    sx={{
                                        color: "#252525",
                                        margin: "1rem 0",
                                        fontWeight: "600",
                                    }}
                                >
                                   Arinze Ebuka
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#707070",
                                        fontWeight: "300",
                                    }}
                                >
                                   Product Manager
                                </Typography>
                            </Box> */}
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    )
}


export default TeamValid