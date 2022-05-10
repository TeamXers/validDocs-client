import { useState } from "react";
import {
  Box,
  ButtonBase,
  Stack,
  Typography,
  Skeleton as MuiSkeleton,
  SkeletonProps,
  Button,
  Container,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DocumentIcon from "../../assets/document.svg";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTransition, animated } from "react-spring";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { SEARCH } from "../../api/validdocs";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Skeleton = styled(MuiSkeleton)<SkeletonProps>(() => ({
  transform: "scale(1, 1)",
}));

const Loader: React.FC<SkeletonProps> = (props) => (
  <>
    <Skeleton {...props} />
    <Skeleton {...props} />
    <Skeleton {...props} />
  </>
);

const Search = () => {
  const { term } = useParams();
  const [searchTerm, setSearchTerm] = useState(`${term}`);
  const [expanded, setExpanded] = useState<string | boolean>(true);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { data, isFetching } = useQuery(
    ["SearchResults", term],
    SEARCH as any,
    {
      enabled: Boolean(term),
      initialData: [] as any,
      placeholderData: [] as any,
      onError: (error: any) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = () => {
    navigate(`/search/${searchTerm}`);
  };
  console.log(data);
  const transitions = useTransition(isFetching, {
    enter: { opacity: 1, position: "relative" },
    leave: { opacity: 0, position: "absolute", width: "100%" },
  });

  const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Find Documents | ValidDocs</title>
      </Helmet>
      <Header />
      <Box sx={{ padding: "5rem 0" }}>
        <Container>
          <Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "20px",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minWidth: "300px",
                  marginBottom: { xs: "1rem", md: 0 },
                }}
              >
                <input
                  value={`${searchTerm}`}
                  onChange={handleChange}
                  type="search"
                  className="search-input"
                  placeholder="Enter Reference ID"
                />
                <span style={{ color: "rgb(0, 191, 173)" }}>
                  <SearchIcon />
                </span>
              </Box>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  display: { xs: "flex", md: "inline-flex" },
                  margin: { xs: "0 auto", md: "0 0 0 1rem" },
                  backgroundColor: "rgb(0, 191, 173)",
                  borderRadius: "10px",
                  padding: ".7rem 2rem",
                }}
              >
                Search
              </Button>
            </Box>
            {/* <Typography
        
              sx={{ textAlign: "center", margin: "1rem 0", fontSize:"20px" }}
            >
              Search Results
            </Typography> */}
          </Box>
          <Box sx={{ padding: "2rem 0" }}>
            <Box sx={{ margin: "0rem 0 2rem 0" }}>
              <Accordion
                expanded={expanded === true || expanded === "panel1"}
                onChange={handleChange1("panel1")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      color={
                        expanded === true || expanded === "panel1"
                          ? "primary"
                          : "inherit"
                      }
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h4" sx={{ fontSize: "20px !important" }}>
                    Accounts({data.accounts ? `${data.accounts.length}` : "0"})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {transitions((style: any, loading: any) => (
                    <animated.div key={`${loading}`} style={style}>
                      <Stack
                        alignItems={"center"}
                        direction={{ xs: "column", sm: "row" }}
                        flexWrap="wrap"
                      >
                        {loading ? (
                          <Loader
                            sx={{ my: 3, mr: 3 }}
                            width={"250px"}
                            height={"300px"}
                          />
                        ) : (
                          <>
                            {data.accounts && data.accounts.length > 0 ? (
                              <>
                                {data.accounts.map((account: any) => (
                                  <ButtonBase>
                                    <Box
                                      key={account.address}
                                      sx={{
                                        boxShadow:
                                          "0px 3px 10px 0 rgba(0, 0, 0, 0.25)",
                                        width: { xs: "200px", md: "350px" },
                                        height: "50px",
                                        margin: { xs: "1rem 0", md: "0 1rem" },
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <Avatar
                                          sx={{
                                            margin: "0rem 1rem",
                                            backgroundColor: "#009688",
                                          }}
                                        >
                                          {account.username.charAt(0)}
                                        </Avatar>
                                        <Typography>
                                          {account.username}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </ButtonBase>
                                ))}
                              </>
                            ) : (
                              <Typography
                                align="center"
                                sx={{ mt: 4, mx: "auto" }}
                              >
                                No data to display
                              </Typography>
                            )}
                          </>
                        )}
                      </Stack>
                    </animated.div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box>
              <Accordion
                expanded={expanded === true || expanded === "panel2"}
                onChange={handleChange1("panel2")}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon
                      color={
                        expanded === true || expanded === "panel2"
                          ? "primary"
                          : "inherit"
                      }
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h4" sx={{ fontSize: "20px !important" }}>
                    Documents({data.docs ? `${data.docs.length}` : "0"})
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {transitions((style: any, loading: any) => (
                    <animated.div key={`${loading}`} style={style}>
                      <Stack
                        alignItems={"center"}
                        direction={{ xs: "column", sm: "row" }}
                        flexWrap="wrap"
                      >
                        {loading ? (
                          <Loader
                            sx={{ my: 3, mr: 3 }}
                            width={"250px"}
                            height={"300px"}
                          />
                        ) : (
                          <>
                            {data.docs && data.docs.length > 0 ? (
                              <>
                                {data.docs.map((doc: any, index: number) => (
                                  <ButtonBase sx={{ margin: "1rem 0" }}>
                                    <Box
                                      key={index}
                                      sx={{
                                        boxShadow:
                                          "0px 3px 10px 0 rgba(0, 0, 0, 0.25)",
                                        width: "200px",
                                        height: "270px",
                                        margin: "0 1rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        padding: "1rem 0",
                                      }}
                                    >
                                      <img
                                        src={DocumentIcon}
                                        style={{ width: "90%" }}
                                        alt={doc.name}
                                      />
                                      <Box
                                        sx={{
                                          margin: "1rem 0 0 0",
                                          width: "100%",
                                        }}
                                      >
                                        <Typography>{doc.name}</Typography>
                                      </Box>
                                      <Typography
                                        sx={{
                                          margin: "auto auto 0 0.5rem",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {doc.author}
                                      </Typography>
                                    </Box>
                                  </ButtonBase>
                                ))}
                              </>
                            ) : (
                              <Typography
                                align="center"
                                sx={{ mt: 4, mx: "auto" }}
                              >
                                No data to display
                              </Typography>
                            )}
                          </>
                        )}
                      </Stack>
                    </animated.div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Search;
