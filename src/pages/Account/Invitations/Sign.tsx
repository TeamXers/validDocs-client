import { OpenInNew } from "@mui/icons-material";
import { Box, Button, ButtonProps, CircularProgress, Typography } from "@mui/material"
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GET_INVITATIONS } from "../../../api/validdocs";
import Header from "../../../components/Header"
import { useAppState } from "../../../context/Provider";
import { useContractFunction, useGetFileToken } from "../../../contract/hooks";

export const SigningInvitation = () => {
    const { token } = useParams();
    const { state } = useAppState();
    const { data, isLoading } = useQuery(['invitations', { _id: token }],
        GET_INVITATIONS, { placeholderData: [] as any });
    const signingInfo = data[0];
    const { fileUrl } = useGetFileToken(signingInfo?.metadata?.tokenId);

    return <Box bgcolor='white'>
        <Header />

        <Box display='flex' flexDirection='column'
            alignItems='center' justifyContent='center'
            minHeight='30rem' maxWidth='50rem' mx='auto'>
            {
                isLoading &&
                <CircularProgress size={40} color='primary' />
            }
            {
                !isLoading && signingInfo && <>
                    <Typography align='center' variant='h6'>
                        {signingInfo.createdBy} has invited you to sign</Typography>
                    <Typography align='center' variant='h4' sx={{ mb: 2 }}>
                        The contract document</Typography>

                    <Box display='flex' alignItems={'center'} justifyContent={'center'}>
                        <SignDocButton tokenId={signingInfo.metadata.tokenId}
                            sx={{ width: '50%', maxWidth: '10rem' }} />
                        
                        <Button
                            color='primary'
                            variant='outlined'
                            sx={{ width: '15rem', ml: 4 }}
                            component={'a'}
                            disabled={!fileUrl}
                            href={fileUrl}
                            target="_blank"
                            endIcon={
                                fileUrl
                                ? <OpenInNew />
                                : <CircularProgress size={20} color='inherit' />
                            }
                        >
                            view document
                        </Button>
                    </Box>
                </>
            }
        </Box>
    </Box>
}

interface SignDocButtonProps {
    tokenId: number
    sx?: ButtonProps['sx']
}

const SignDocButton: React.FC<SignDocButtonProps> = ({ tokenId, sx }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { send } = useContractFunction('signDocument', () => {
        enqueueSnackbar('Signing Operation Complete', { variant: 'success' });
        navigate(`/documents/${tokenId}`);
    });

    return <Button color='primary' variant='contained' disabled={isLoading}
        onClick={() => {
            setIsLoading(true);
            send(tokenId);
        }} sx={sx} startIcon={isLoading && <CircularProgress size={20} color='inherit' />}>
        sign
    </Button>
}
