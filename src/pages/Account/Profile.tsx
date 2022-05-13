import { Stack, Container, Typography } from "@mui/material";
import { AppBreadcrumbs } from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAppState } from "../../context/Provider";
import { UserProfile } from "../../components/accounts/UserProfile";


export const Profile: React.FC = () => {
  const { state } = useAppState();

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

        {state.account && <UserProfile account={state.account} editable />}
      </Container>

      <Footer />
    </Stack>
  );
};
