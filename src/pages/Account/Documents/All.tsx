import {
  Box,
  Button,
  ButtonBase,
  Container,
  Paper,
  Stack,
  Skeleton as MuiSkeleton,
  SkeletonProps,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { AppBreadcrumbs } from "../../../components/Breadcrumbs";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import DocumentIcon from "../../../assets/document.svg";
import { GET_DOCUMENTS } from "../../../api/validdocs";
import { useAppState } from "../../../context/Provider";
import { formatDate } from "../../../utils/date";

const Skeleton = styled(MuiSkeleton)<SkeletonProps>(() => ({
  transform: "scale(1, 1)",
}));

export const AllDocuments = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAppState();
  const { data, isFetching } = useQuery(
    ["Docs", { authorAddress: state.walletAddress }],
    GET_DOCUMENTS as any,
    {
      initialData: [] as any[],
      enabled: Boolean(state.walletAddress),
      retry: 3,
      onError: (error: any) => {
        enqueueSnackbar(error.message, { variant: "error" });
      },
    }
  );
  const transitions = useTransition(isFetching, {
    enter: { opacity: 1, position: "relative" },
    leave: { opacity: 0, position: "absolute", width: "100%" },
  });

  return (
    <Stack minHeight="100vh">
      <Header />

      <Container sx={{ py: 8, flexGrow: 1 }}>
        <AppBreadcrumbs
          sx={{ mb: 2 }}
          links={[{ title: "Account" }, { title: "Your Documents" }]}
        />

        <Typography variant="h2" sx={{ mb: 1 }}>
          Your Documents
        </Typography>

        <Button
          component={RouterLink}
          to="/account/documents/new"
          variant="contained"
          color="primary"
        >
          New
        </Button>

        <Box mt={6}>
          {transitions((style: any, loading: any) => (
            <animated.div key={`${loading}`} style={style}>
              <Stack
                alignItems={"center"}
                direction={{ xs: "column", sm: "row" }}
                flexWrap="wrap"
              >
                {loading ? (
                  <Loader sx={{ my: 3, mr: 3 }} width={250} height={300} />
                ) : (
                  <>
                    {data && data.length > 0 ? (
                      data?.map((doc: any, index: number) => (
                        <ButtonBase
                          key={index}
                          component={RouterLink}
                          to={`/account/documents/${doc.tokenId}`}
                          sx={{
                            my: 3,
                            mr: 3,
                            textAlign: "left",
                            width: 250,
                            height: 300,
                          }}
                        >
                          <Paper
                            variant={"outlined"}
                            sx={{
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <Stack
                              alignItems="center"
                              justifyContent="center"
                              height={200}
                              bgcolor="#eeeeee"
                            >
                              <img
                                src={DocumentIcon}
                                style={{ objectFit: "cover", width: 100 }}
                                alt={doc.name}
                              />
                            </Stack>
                            <Typography
                              sx={{ mx: 1, mt: 2 }}
                              overflow="ellipsis"
                            >
                              {doc.name}
                            </Typography>
                            <Typography sx={{ mx: 1 }} variant="body2">
                              Created on {formatDate(doc.createdAt)}
                            </Typography>
                          </Paper>
                        </ButtonBase>
                      ))
                    ) : (
                      <Typography align="center" sx={{ mt: 4, mx: "auto" }}>
                        No data to display
                      </Typography>
                    )}
                  </>
                )}
              </Stack>
            </animated.div>
          ))}
        </Box>
      </Container>

      <Footer />
    </Stack>
  );
};

const Loader: React.FC<SkeletonProps> = (props) => (
  <>
    <Skeleton {...props} />
    <Skeleton {...props} />
    <Skeleton {...props} />
    <Skeleton {...props} />
    <Skeleton {...props} />
    <Skeleton {...props} />
    <Skeleton {...props} />
    <Skeleton {...props} />
  </>
);
