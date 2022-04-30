import { ReactElement, useEffect, useState } from "react";
import {
    Box, Button, Container, Link, Typography,
    Skeleton, IconButton, Paper
} from "@mui/material";
import { OpenInNew, ContentCopy, MoreVert } from "@mui/icons-material";
import { useTransition, animated, TransitionFn } from "react-spring";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import axios from "axios";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { formatDate } from "../../../utils/date";
import { GET_DOCUMENT } from "../../../api/validdocs";
import { Testnet } from "../../../ChainConfig";
import { useContractFunction } from "../../../contract/hooks";
import { AddSigner, Signers } from "./Signers";
import { AddViewer, Viewers } from "./Viewers";

interface ViewDocumentProps {
  breadcrumbs: ReactElement<any, any>;
}

export const ViewDocument: React.FC<ViewDocumentProps> = ({ breadcrumbs }) => {
    const { tokenId } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const [fileUrl, setFileUrl] = useState('');
    const { send } = useContractFunction('tokenURI', async (status) => {
        try {
            const res = await axios.get(status.transaction as any);
            setFileUrl(res.data.file);
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Failed to get File', { variant: 'error' });
        }
    }, 'Mining');

    const { data, error, isFetching } = useQuery(
        ['document', tokenId], GET_DOCUMENT,
        {
            enabled: Boolean(tokenId),
            initialData: [] as any,
            placeholderData: [] as any,
            onError: (error: any) => { enqueueSnackbar(error.message, { variant: 'error' }) }
        }
    );
    const transition = useTransition(isFetching && !error, {
        enter: { opacity: 1, position: 'relative' },
        leave: { opacity: 0, position: 'absolute' }
    });

    useEffect(() => {
        (async () => {
            try {
                if (!tokenId) return;
                await send(tokenId);
            } catch (error) {
                console.log(error);
                enqueueSnackbar('Could not get token info', { variant: 'error' });
            }
        })();
    }, [send, tokenId, setFileUrl]);

    const document = data[0];
    const shareableUrl = `${process.env.REACT_APP_BASE_URL}/documents/${tokenId}`;
    const blockchainUrl = Testnet.getExplorerTransactionLink(document?.tranxHash ?? '');

    return <Box bgcolor='white'>
        <Header />

        <Container sx={{ py: 8 }}>
            <Box mb={2}>
                {breadcrumbs}
            </Box>

            <Box display='flex' justifyContent={'space-between'}>
                <Box sx={{ width: { xs: '100%', md: '60%' } }}>
                    <Box>
                        <Typography component='div' variant='body2' sx={{
                            color: 'white',
                            bgcolor: 'secondary.main',
                            px: 1, py: 0.5,
                            borderRadius: 1,
                            display: 'inline'
                        }}>
                            Private
                        </Typography>

                        <Typography component='div' variant='h3'>
                            <LoaderOrContent transition={transition}>
                                <Box display='flex' justifyContent={'space-between'} alignItems={'center'}>
                                    <Box flexGrow={1}>{document?.name}</Box>

                                    <IconButton sx={{ display: { md: 'none' }, width: '40px', height: '40px' }}>
                                        <MoreVert />
                                    </IconButton>
                                </Box>
                            </LoaderOrContent>
                        </Typography>

                        <Box>
                            <Button component={'a'}
                                href={fileUrl} target="_blank"
                                disabled={!fileUrl}
                                variant='contained'
                                color='primary'
                                sx={{ mr: 2, mt: 2 }}
                                endIcon={<OpenInNew />}
                                size='small'
                            >
                                View File
                            </Button>

                            <Button variant='outlined' color='primary'
                                sx={{ mt: 2 }} endIcon={<ContentCopy />}
                                size='small'
                                onClick={() => {
                                    navigator.clipboard.writeText(shareableUrl);
                                    enqueueSnackbar('Copied to clipboard!');
                                }}
                            >
                                Copy url
                            </Button>
                        </Box>
                    </Box>


                    <Box mt={4} mb={4}>
                        <Typography component='div'>
                            <LoaderOrContent transition={transition}>
                                Created by {document?.author} on {document?.createdAt && formatDate(document.createdAt)}
                            </LoaderOrContent>
                        </Typography>

                        <Box mt={2}>
                            <Typography component='div' variant='h6'>
                                <LoaderOrContent transition={transition}>
                                    Description
                                </LoaderOrContent>
                            </Typography>

                            <Typography component='div' sx={{ minHeight: '5rem' }}>
                                <LoaderOrContent transition={transition}>
                                    {document?.description}
                                </LoaderOrContent>
                            </Typography>
                        </Box>
                    </Box>


                    <Link color='primary' href={blockchainUrl} target="_blank">
                        View on the Harmony Blockchain
                    </Link>
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'block' }, width: '35%' }}>
                    <Box component={Paper} variant='outlined'
                        minHeight='200px' p={2} borderRadius={'20px'}>
                        <Box display='flex' alignItems='center' mb={2}>
                            <Typography variant='h5' sx={{ flexGrow: 1 }}>
                                Signers</Typography>

                            <AddSigner>
                                {
                                    (toggleAddSigner) =>
                                        <Button size='small' color='primary' onClick={toggleAddSigner}>Add</Button>
                                }
                            </AddSigner>
                        </Box>

                        <Signers />
                    </Box>

                    <Box component={Paper} variant='outlined'
                        minHeight='200px' p={2} mt={4} borderRadius={'20px'}>
                        <Box display='flex' alignItems='center' mb={2}>
                            <Typography variant='h5' sx={{ flexGrow: 1 }}>
                                Viewers</Typography>

                            <AddViewer>{
                                (toggleAddViewer) =>
                                    <Button size='small' color='primary' onClick={toggleAddViewer}>Add</Button>
                            }</AddViewer>
                        </Box>

                        <Viewers />
                    </Box>
                </Box>
            </Box>
        </Container>

        <Footer />
    </Box>
};

const LoaderOrContent: React.FC<{
  transition: TransitionFn<boolean, any>;
}> = ({ children, transition }) =>
  transition((styles, isFetching) => (
    <animated.div style={{ ...styles }}>
      {isFetching ? <Skeleton /> : children}
    </animated.div>
  ));
