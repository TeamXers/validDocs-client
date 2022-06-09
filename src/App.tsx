import { Routes, BrowserRouter, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import {
  DAppProvider,
  Config,
  DEFAULT_SUPPORTED_CHAINS,
  Mainnet,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { QueryClient, QueryClientProvider } from "react-query";
import { Account } from "./pages/Account/Account";
import { AllDocuments } from "./pages/Account/Documents/All";
import { CreateDocument } from "./pages/Account/Documents/Create";
import { ViewDocument } from "./pages/Account/Documents/Document";
import { CurrentUserProfile, Profile } from "./pages/Account/Profile";
import Home from "./pages/Home";
import Search from "./pages/Search";
import About  from "./pages/About"
import { AppBreadcrumbs } from "./components/Breadcrumbs";
import { StateProvider } from "./context/Provider";
import { theme } from "./theme";
import { Testnet } from "./ChainConfig";
import { SigningInvitation } from "./pages/Account/Invitations/Sign";
import { ViewInvitation } from "./pages/Account/Invitations/View";
import { AppConfig } from "./Config";
import ScrollToTop from "./components/ScrollToTop";
import TeamValid from "./pages/TeamValid";

const SnackbarParent = SnackbarProvider as any;

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  // Testnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider("mainnet"),
    [Testnet.chainId]: "https://api.s0.b.hmny.io",
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, Testnet],
};

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <DAppProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SnackbarParent maxSnack={3}>
          <StateProvider>
            <BrowserRouter>
            <ScrollToTop />
              <Routes>
                <Route path="/" element={<App />}>
                  <Route index element={<Home />} />
<Route path="about-us" element={<About />} />
<Route path="team_valid" element={<TeamValid />} />
                  <Route path="account" element={<Account />}>
                    <Route index element={<AllDocuments />} />
                    <Route path="profile" element={<CurrentUserProfile />} />
                    <Route path="documents" element={<Outlet />}>
                      <Route index element={<AllDocuments />} />
                      <Route path="new" element={<CreateDocument />} />
                      <Route
                        path=":tokenId"
                        element={
                          <ViewDocument
                            breadcrumbs={
                              <AppBreadcrumbs
                                links={[
                                  { title: "Account" },
                                  {
                                    title: "Documents",
                                    link: "/account/documents",
                                  },
                                  { title: "View Document" },
                                ]}
                              />
                            }
                          />
                        }
                      />
                    </Route>
                    <Route path="invitations" element={<Outlet />}>
                      <Route
                        path="sign/:token"
                        element={<SigningInvitation />}
                      />
                      <Route path="view/:token" element={<ViewInvitation />} />
                    </Route>
                  </Route>

                  <Route path="accounts" element={<Outlet />}>
                    <Route path=":address" element={<Profile />} />
                  </Route>

                  <Route path="documents" element={<Outlet />}>
                    <Route
                      path=":tokenId"
                      element={
                        <ViewDocument
                          breadcrumbs={
                            <AppBreadcrumbs
                              links={[
                                { title: "Home", link: "/" },
                                { title: "View Document" },
                              ]}
                            />
                          }
                        />
                      }
                    />
                  </Route>
                  <Route path="search/:term" element={<Search />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </StateProvider>
        </SnackbarParent>
      </QueryClientProvider>
    </DAppProvider>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppConfig>
        <Outlet />
      </AppConfig>
    </ThemeProvider>
  );
}

export default AppRoutes;
