import { Stack, Container, Typography, Box } from "@mui/material";
import * as yup from "yup";
import { useMutation } from "react-query";
import { AppBreadcrumbs } from "../../components/Breadcrumbs";
import { IField } from "../../components/forms/Fields";
import { Form, SpinnerButton } from "../../components/forms/Form";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { SET_USERNAME } from "../../api/validdocs";
import { useAppState } from "../../context/Provider";

const FIELDS: IField[] = [
  {
    name: "username",
    label: "Username",
    initialValue: "",
    validator: yup.string().required("Please enter a username"),
  },
];

export const Profile: React.FC = () => {
  const { state } = useAppState();
  const { mutate, isLoading } = useMutation(SET_USERNAME);

  return (
    <Stack minHeight="100vh">
      <Header />

      <Container sx={{ py: 8, flexGrow: 1 }}>
        <AppBreadcrumbs
          sx={{ mb: 2 }}
          links={[{ title: "Account" }, { title: "Profile" }]}
        />

        <Typography variant="h2" sx={{ mb: 6 }}>
          Your Profile
        </Typography>

        <Box sx={{ maxWidth: "50rem" }}>
          <Form
            fields={FIELDS}
            onSubmit={({ username }) =>
              mutate({ username, address: state.walletAddress as string })
            }
          >
            <SpinnerButton
              loading={isLoading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Save
            </SpinnerButton>
          </Form>
        </Box>
      </Container>

      <Footer />
    </Stack>
  );
};
