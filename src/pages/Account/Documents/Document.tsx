import { ReactElement, useEffect, useState } from "react";
import {
    Box, Button, Container, Link, Typography,
    Skeleton
} from "@mui/material";
import { OpenInNew, ContentCopy } from "@mui/icons-material";
import { useTransition, animated, TransitionFn } from "react-spring";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import axios from "axios";
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { formatDate } from '../../../utils/date';
import { GET_DOCUMENT } from '../../../api/validdocs';
import { Testnet } from '../../../ChainConfig';
import { useContractFunction } from "../../../contract/hooks";


interface ViewDocumentProps {
    breadcrumbs: ReactElement<any, any>
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

    const { data, isFetching } = useQuery(
        ['document', tokenId], GET_DOCUMENT,
        {
            enabled: Boolean(tokenId),
            initialData: [] as any,
            placeholderData: [] as any,
            onError: (error: any) => { enqueueSnackbar(error.message, { variant: 'error' }) }
        }
    );
    const transition = useTransition(isFetching, {
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
    const blockchainUrl = Testnet.getExplorerAddressLink(tokenId ?? '');

    return <Box bgcolor='white'>
        <Header />

        <Container sx={{ py: 8 }}>
            <Box mb={2}>
                {breadcrumbs}
            </Box>

            <Box>
                {/* <Typography component='div' variant='body2' sx={{
                    color: 'white',
                    bgcolor: 'secondary.main',
                    px: 1, py: 0.5,
                    borderRadius: 1,
                    display: 'inline'
                }}>
                    Private
                </Typography> */}
                <Typography component='div' variant='h2'>
                    <LoaderOrContent transition={transition}>
                        {document?.name}
                    </LoaderOrContent>
                </Typography>

                <Box>
                    <Button component={'a'}
                        href={fileUrl} target="_blank"
                        disabled={!fileUrl}
                        variant='contained'
                        color='primary'
                        sx={{ mr: 4, mt: 2 }}
                        endIcon={<OpenInNew />}
                    >
                        View File
                    </Button>

                    <Button variant='outlined' color='primary'
                        sx={{ mt: 2 }} endIcon={<ContentCopy />}
                        onClick={() => {
                            navigator.clipboard.writeText(shareableUrl);
                            enqueueSnackbar('Copied to clipboard!');
                        }}
                    >
                        Copy url to clipboard
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
        </Container>

        <Footer />
    </Box>
}

const LoaderOrContent: React.FC<{
    transition: TransitionFn<boolean, any>
}> = ({ children, transition }) => (
    transition((styles, isFetching) => (
        <animated.div style={{ ...styles }}>
            {
                isFetching ? <Skeleton /> : children
            }
        </animated.div>
    ))
)
