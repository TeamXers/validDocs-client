import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useQuery } from "react-query"
import { GET_DOCUMENTS } from "../../api/validdocs"
import { Documents } from "../documents/Documents"
import { SlidingAccountForm } from "./AccountForm"
import { UserAvatar } from "./UserAvatar"

interface UserProfileProps {
    account: { username: string, address: string },
    editable?: boolean
}

export const UserProfile: React.FC<UserProfileProps> = ({ account, editable }) => {
    const [showForm, setShowForm] = useState(false);
    const { data: documents, isFetching: documentFetching } = useQuery(
        ['documents', { authorAddress: account.address, ...(editable ? {} : { isPublic: true }) }],
        GET_DOCUMENTS, { placeholderData: [] as any });

    return <Box>
        <Box display='flex' alignItems='center'>

            <UserAvatar username={account.username} sx={{ fontSize: 36, width: 100, height: 100 }} />

            <Box ml={2}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h5' sx={{ maxWidth: { xs: 100, sm: 400, md: 600 } }} noWrap>
                        {account.username}
                    </Typography>

                    {editable && <Button onClick={() => setShowForm(true)} sx={{ ml: 4 }}>Change</Button>}
                </Box>

                <Typography sx={{ maxWidth: { xs: 150, sm: 500, md: 600 } }} noWrap>
                    {account.address}
                </Typography>
            </Box>

        </Box>

        <Box mt={6}>
            <Typography variant='h4'>Uploaded Documents</Typography>

            <Documents isLoading={documentFetching} documents={documents} sx={{ mt: 2 }} />
        </Box>

        <SlidingAccountForm open={showForm} onClose={() => setShowForm(false)} />
    </Box>
}
