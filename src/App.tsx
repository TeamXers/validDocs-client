import { Routes, BrowserRouter, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { DAppProvider, Config, DEFAULT_SUPPORTED_CHAINS, Mainnet } from '@usedapp/core';
import {getDefaultProvider} from "ethers"
import { QueryClient, QueryClientProvider } from 'react-query';
import { Account } from './pages/Account/Account';
import { AllDocuments } from './pages/Account/Documents/All';
import { CreateDocument } from './pages/Account/Documents/Create';
import { ViewDocument } from './pages/Account/Documents/Document';
import { Profile } from './pages/Account/Profile';
import Home from './pages/Home';
import { AppBreadcrumbs } from './components/Breadcrumbs';
import { StateProvider } from './context/Provider';
import { theme } from './theme';
import { Testnet } from './ChainConfig';


const SnackbarParent = SnackbarProvider as any;

const config: Config = {
  readOnlyChainId: 
  Mainnet.chainId,
  // Testnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:getDefaultProvider('mainnet'),
    [Testnet.chainId]: "https://api.s0.b.hmny.io",
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS,Testnet]
}

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <DAppProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SnackbarParent maxSnack={3}>
          <StateProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<App />}>
                  <Route index element={<Home />} />

                  <Route path='account' element={<Account />}>
                    <Route index element={<AllDocuments />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='documents' element={<Outlet />}>
                      <Route index element={<AllDocuments />} />
                      <Route path='new' element={<CreateDocument />} />
                      <Route path=':tokenId' element={
                        <ViewDocument breadcrumbs={<AppBreadcrumbs links={
                          [
                            { title: 'Account' },
                            { title: 'Documents', link: '/account/documents' },
                            { title: 'View Document' }
                          ]
                        } />}
                        />
                      } />
                    </Route>
                  </Route>

                  <Route path='documents' element={<Outlet />}>
                    <Route path=':tokenId' element={
                      <ViewDocument breadcrumbs={<AppBreadcrumbs links={
                        [
                          { title: 'Home', link: '/' },
                          { title: 'View Document' }
                        ]
                      } />} />
                    } />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </StateProvider>
        </SnackbarParent>
      </QueryClientProvider>
    </DAppProvider>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>);
}

export default AppRoutes;
