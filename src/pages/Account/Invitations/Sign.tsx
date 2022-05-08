import { Box, Button, ButtonProps, CircularProgress, Typography } from "@mui/material"
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GET_INVITATIONS } from "../../../api/validdocs";
import Header from "../../../components/Header"
import { useAppState } from "../../../context/Provider";
import { useContractFunction } from "../../../contract/hooks";

export const SigningInvitation = () => {
    const { token } = useParams();
    const { state } = useAppState();
    const { data, isLoading } = useQuery(['invitations', { _id: token }],
        GET_INVITATIONS, { placeholderData: [] as any });
    
    const signingInfo = data[0];

    return <Box bgcolor='white'>
        <Header />

        <Box display='flex' flexDirection='column'
            alignItems='center' justifyContent='center'
            minHeight='40rem' maxWidth='50rem' mx='auto'>
            {
                isLoading && 
                    <CircularProgress size={40} color='primary' />
            }
            {
                !isLoading && signingInfo && <>
                    <Typography align='center'>
                        {signingInfo.createdBy} has invited you to sign</Typography>
                    <Typography align='center' variant='h6' sx={{ mb: 4 }}>
                        The contract document</Typography>
                    <SignDocButton tokenId={signingInfo.metadat.tokenId}
                        signerAddress={state.walletAddress ?? ''} />
                </>
            }
        </Box>
    </Box>
}

interface SignDocButtonProps {
    tokenId: number
    signerAddress: string
    sx?: ButtonProps['sx']
}

const SignDocButton: React.FC<SignDocButtonProps> = ({ tokenId, signerAddress, sx }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { send } = useContractFunction('sign', () => {
        enqueueSnackbar('Signing Operation Complete', { variant: 'success' });
        navigate(`/documents/${tokenId}`);
    });

    return <Button color='primary' variant='contained' disabled={isLoading}
        onClick={() => {
            setIsLoading(true);
            send(tokenId, signerAddress);
        }} sx={sx} startIcon={isLoading && <CircularProgress size={20} color='inherit' />}>
        sign
    </Button>    
}
