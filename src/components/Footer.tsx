import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Input,
  Button,
} from "@mui/material";
import Logo from "../assets/Black_and_White_Logo_Symbol_only_Transparent.png";
import SearchIcon from "@mui/icons-material/Search";
import IpfsLogo from "../assets/ipfs.svg";
import HarmonyLogo from "../assets/harmony.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { IField } from "./forms/Fields";
import { Form } from "./forms/Form"
import * as yup from "yup";




const FIELDS : IField[] = [
  {
name:"email",
initialValue:"",
    placeholder:"Your email",
  validator: yup.string().email("Please enter a valid email").required("Please enter your email address"),
    customStyle: {
      width: { xs: "100%", md: "250px" },
      backgroundColor: "#fff",
      borderRadius: "10px",
}
}
]

const Footer = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const getYear = (): number => {
    const currentYear: number = new Date().getFullYear();
    return currentYear;
  };
  return (
    <>
      <footer>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            backgroundColor: "rgb(0, 150, 136, 0.7)",
            margin: "2rem 0 0 0",
            padding: "2rem",
          }}
        >
          <Box
            component={"img"}
            src={HarmonyLogo}
            alt="harmony logo"
            sx={{
              display: "flex",
              width: "150px",
              margin: { xs: "2rem auto", md: "0 4rem" },
              opacity: "0.7",
              ":hover": { opacity: "1" },
            }}
          />
          <Box
            component={"img"}
            src={IpfsLogo}
            alt="ipfs logo"
            sx={{
              display: "flex",
              width: "150px",
              opacity: "0.7",
              margin: { xs: "0 auto", md: "0 4rem" },
              ":hover": { opacity: "1" },
            }}
          />
        </Box>
        <Box sx={{ padding: "1rem", margin: "0", backgroundColor: "#009688" }}>
          <Container>
            <Box
              sx={{
                display: "grid",
                rowGap: "1rem",
                columnGap: "1.5rem",
                gridTemplateColumns: {
                  xs: `repeat(${1}, ${1}fr)`,
                  md: `repeat(${3}, ${1}fr)`,
                },
                margin: "4rem 0",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  color: "#fff",
                  textAlign: { xs: "center", md: "left" },
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "0 0 1rem 0",
                    justifyContent: { xs: "center", md: "flex-start" },
                  }}
                >
                  <img
                    src={Logo}
                    style={{
                      width: "30px",
                      height: "30px",
                      margin: "0 0.5rem 0 0",
                      display: "flex",
                    }}
                    alt="logo"
                  />
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      mr: 2,
                      display: { xs: "flex" },
                      fontFamily: '"Roboto", sans-serif',
                      width: { xs: "auto", md: "50%" },
                    }}
                  >
                    VALIDDOCS
                  </Typography>
                </Box>
                <Typography>
                  Take advantage of the power of the blockchain to protect the
                  authenticity and integrity of your documents.
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: { xs: "center", md: "flex-start" },
                  margin: { xs: "2rem 0 0 0", md: "0" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", margin: "0 0 1rem 0" }}
                >
                  Quick Links
                </Typography>
                <Button
                  sx={{
                    color: "#fff",
                    textAlign: "left !important",
                    justifyContent: "flex-start !important",
                    textTransform: "none",
                    paddingLeft: 0,
                  }}
                  component={RouterLink}
                  to="#"
                >
                  Support
                </Button>

                <Button
                  sx={{
                    color: "#fff",
                    textAlign: "left !important",
                    justifyContent: "flex-start !important",
                    textTransform: "none",
                    paddingLeft: 0,
                  }}
                  component={RouterLink}
                  to="#"
                >
                  About Us
                </Button>
                <div className="container-2" style={{ border: "none" }}>
                  <form
                    onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
                      e.preventDefault();

                      navigate(`/search/${searchTerm}`);
                    }}
                  >
                    <input
                      type="search"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchTerm(e.target.value)
                      }
                      placeholder="Find Documents"
                      className="search-header footer-search"
                      name="search"
                    />
                  </form>
                  {/* <SearchIcon sx={{ position: "absolute", top: "50%", left: 0, transform: `translate(0px, ${-44}%)`, marginLeft:0 }} /> */}
                </div>
              </Box>
              <Box
                sx={{
                  color: "#fff",
                  margin: { xs: "2rem 0 0 0", md: "0" },
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Typography variant="h6" sx={{ margin: "0 0 1rem 0" }}>
                  Stay in the loop
                </Typography>
                <Typography>
                  join our mailing list to stay in the loop with our newest
                  feature releases.
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    margin: "1.5rem 0",
                    alignItems: "center",
                  }}
                >
                  <Form fields={FIELDS} onSubmit={()=>{}} className="suscribe-email" >
                    <Button
                      variant="contained"
                      sx={{
                        margin: { xs: "1rem 0 0 0", md: "0 0 0 1rem" },
                        backgroundColor: "rgb(0, 191, 173)",
                        borderRadius: "10px",
                        padding: ".7rem 2rem",
                      }}
                      type="submit"
                    >
                      SUBMIT
                    </Button>
                  </Form>
                  {/* <Input
                    placeholder="Your email"
                    name="mailList"
                    disableUnderline={true}
                    sx={{
                      width: { xs: "100%", md: "250px" },
                      padding: ".5rem 1rem",
                      backgroundColor: "#fff",
                      borderRadius: "10px",
                    }}
                  /> */}
               
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ padding: "0rem 0 1rem 0" }}>
                {" "}
                <Divider sx={{ borderColor: "#fff" }} />
              </Box>
              <Typography
                sx={{ textAlign: "center", color: "#fff", fontSize: "14px" }}
              >
                All rights reserved &copy;{getYear()} ValidDocs
              </Typography>
            </Box>
          </Container>
        </Box>
      </footer>
    </>
  );
};

export default Footer;
