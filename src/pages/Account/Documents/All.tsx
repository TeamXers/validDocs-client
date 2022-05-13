import {
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { AppBreadcrumbs } from "../../../components/Breadcrumbs";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { GET_DOCUMENTS } from "../../../api/validdocs";
import { useAppState } from "../../../context/Provider";
import { Documents } from "../../../components/documents/Documents";


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

        <Documents isLoading={isFetching} documents={data ?? []} sx={{ mt: 6 }} />
      </Container>

      <Footer />
    </Stack>
  );
};
