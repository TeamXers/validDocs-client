import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AppBreadcrumbs } from "../../../components/Breadcrumbs";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Documents } from "../../../components/documents/Documents";
import { TabPanel } from "../../../components/TabPanel";
import { SharedDocuments } from "./SharedDocuments";
import { YourDocuments } from "./YourDocuments";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const AllDocuments = () => {
  const [tab, settab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newtab: number) => {
    settab(newtab);
  };

  return (
    <Stack minHeight="100vh">
      <Header />

      <Container sx={{ py: 8, flexGrow: 1 }}>
        <AppBreadcrumbs
          sx={{ mb: 2 }}
          links={[{ title: "Account" }, { title: "Your Documents" }]}
        />

        <Typography variant="h2" sx={{ mb: 1 }}>
          All Documents
        </Typography>

        <Button
          component={RouterLink}
          to="/account/documents/new"
          variant="contained"
          color="primary"
        >
          New
        </Button>

        <Box sx={{ width: '100%', mt: 4 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={handleChangeTab} aria-label="all documents">
              <Tab label="Yours" {...a11yProps(0)} />
              <Tab label="Shared" {...a11yProps(1)} />
              <Tab label="Signed" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <TabPanel value={tab} index={0}>
            <YourDocuments />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <SharedDocuments />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <Documents isLoading={true} documents={[]} />
          </TabPanel>
        </Box>
      </Container>

      <Footer />
    </Stack>
  );
};
