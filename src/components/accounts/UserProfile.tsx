import { Box, Button, Skeleton, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { GET_DOCUMENTS } from "../../api/validdocs"
import { Documents } from "../documents/Documents"
import { SlidingAccountForm } from "./AccountForm"
import { UserAvatar } from "./UserAvatar"

interface UserProfileProps {
    account?: { username: string, address: string },
    editable?: boolean
}

export const UserProfile: React.FC<UserProfileProps> = ({ account, editable }) => {
    const [showForm, setShowForm] = useState(false);
    const query = useMemo(
        () => ({
            authorAddress: account?.address,
            ...(editable ? {} : { isPublic: true })
        }),
        [account, editable]
    );
    const { data: documents, isFetching: documentFetching } = useQuery(
        ['documents', query], GET_DOCUMENTS,
        { enabled: !!account?.address, placeholderData: [] as any });

    return <Box>
        <Box display='flex' alignItems='center'>

            {account && <UserAvatar username={account.username} sx={{ fontSize: 36, width: 100, height: 100 }} />}
            {!account && <Skeleton variant="circular" sx={{ width: 100, height: 100 }} />}

            <Box ml={2}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h5' sx={{ maxWidth: { xs: 100, sm: 400, md: 600 } }} noWrap>
                        {account?.username || <Skeleton sx={{ width: 100 }} />}
                    </Typography>

                    {editable && <Button onClick={() => setShowForm(true)} sx={{ ml: 4 }}>Change</Button>}
                </Box>

                <Typography sx={{ maxWidth: { xs: 150, sm: 500, md: 600 } }} noWrap>
                    {account?.address || <Skeleton />}
                </Typography>
            </Box>

        </Box>

        <Box mt={6}>
            <Typography variant='h4'>Uploaded Documents</Typography>

            <Documents isLoading={documentFetching || !account} documents={documents} sx={{ mt: 2 }} />
        </Box>

        <SlidingAccountForm open={showForm} onClose={() => setShowForm(false)} />
    </Box>
}
