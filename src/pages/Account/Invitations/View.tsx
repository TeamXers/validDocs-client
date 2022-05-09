import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom";
import { POST_VIEWERS } from "../../../api/validdocs"
import Header from "../../../components/Header";
import { useAppState } from "../../../context/Provider";

export const ViewInvitation = () => {
    const { token } = useParams();
    const { state } = useAppState();
    const { data, isLoading } = useQuery(
        ['invitations', { token, address: state.walletAddress ?? '' }],
        POST_VIEWERS, { enabled: !!state?.walletAddress });
    const navigate = useNavigate();

    if (data) {
        navigate(`/documents/${(data as any).documentTokenId}`);
    }

    return <Box>
        <Header />

        <Box width='100%' minHeight='50rem' display='flex' alignItems='center' justifyItems='center'>
            {isLoading && <CircularProgress color='primary' size={60} />}
        </Box>
    </Box>
}
