import { Stack, Container, Typography, Skeleton } from "@mui/material";
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

        {state.account && <UserProfile account={state.account} editable />}
      </Container>

      <Footer />
    </Stack>
  );
};

export const Profile: React.FC = () => {
  const { address } = useParams();
  const { data, isFetching } = useQuery(
    ['accounts', { address }], GET_ACCOUNT,
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

        {data[0] && <UserProfile account={data[0]} />}
        {isFetching && <Stack>
            <Skeleton sx={{ height: 150 }} />
            <Skeleton sx={{ height: 400 }} />
          </Stack>}
      </Container>

      <Footer />
    </Stack>
  )
}
