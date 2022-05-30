import { Stack, Container, Typography } from "@mui/material";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AppBreadcrumbs } from "../../components/Breadcrumbs";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useAppState } from "../../context/Provider";
import { UserProfile } from "../../components/accounts/UserProfile";
import { GET_ACCOUNT } from "../../api/validdocs";


export const CurrentUserProfile: React.FC = () => {
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

        <UserProfile account={state.account} editable />
      </Container>

      <Footer />
    </Stack>
  );
};

export const Profile: React.FC = () => {
  const { address } = useParams();
  const { state } = useAppState();
  const query = useMemo(() => ({ address }), [address, state.authToken]);
  const { data } = useQuery(
    ['accounts', query], GET_ACCOUNT,
    { enabled: !!address, placeholderData: [] as any }
  );

  return (
    <Stack minHeight="100vh">
      <Header />

      <Container sx={{ py: 8, flexGrow: 1 }}>
        <AppBreadcrumbs
          sx={{ mb: 2 }}
          links={[{ title: "Account" }, { title: "Profile" }]}
        />

        <Typography variant="h2" sx={{ mb: 6 }}>
          User Profile
        </Typography>

        <UserProfile account={data[0]} />
      </Container>

      <Footer />
    </Stack>
  )
}
