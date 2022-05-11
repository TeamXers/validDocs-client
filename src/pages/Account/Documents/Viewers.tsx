import React, { useState } from "react";
import {
    ButtonBase, Dialog, DialogTitle,
    DialogContent, Paper, Typography,
    CircularProgress
} from "@mui/material"
import { ContentCopy } from "@mui/icons-material";
import { useQuery } from "react-query";
import { useSnackbar } from "notistack";
import { GET_VIEWERS, GET_VIEW_INVITE } from "../../../api/validdocs";
import { Username } from "../../../components/queries/Accounts";

export interface AddViewerProps {
    children: (toggle: () => void) => React.ReactNode
    tokenId: string
}

export const AddViewer: React.FC<AddViewerProps>
    = ({ children, tokenId }) => {
        const [open, setOpen] = useState(false);
        const { enqueueSnackbar } = useSnackbar();
        const toggle = () => setOpen(o => !o);
        const { data, isLoading } = useQuery(['view-invite', tokenId],
            GET_VIEW_INVITE, { placeholderData: { inviteId: '' } as any, enabled: open });
        const url = `${process.env.REACT_APP_BASE_URL}account/invitations/view/${data?.inviteId}`;

        return <>
            {children(toggle)}
            <Dialog open={open} onClose={toggle}>
                <DialogTitle>Add Viewer</DialogTitle>

                <DialogContent>
                    <Typography variant='body2'>Anyone with this link can view</Typography>
                    <ButtonBase
                        onClick={async () => {
                            try {
                                if (isLoading) return;
                                await navigator.clipboard.writeText(url);
                                enqueueSnackbar('Copied to clipboard', { variant: 'success' });
                            } catch (e: any) {
                                enqueueSnackbar(e.message);
                            }
                        }}
                        sx={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, mt: 1,
                            border: '1px solid #cccccc', borderRadius: '4px'
                        }}>
                        <Typography noWrap sx={{ width: '80%', maxWidth: '400px' }}>
                            {url}
                        </Typography>

                        {
                            isLoading
                                ? <CircularProgress color='primary' size={20} sx={{ ml: 2 }} />
                                : <ContentCopy sx={{ ml: 2 }} />
                        }
                    </ButtonBase>
                </DialogContent>
            </Dialog>
        </>
    }

export const Viewers: React.FC<{ documentTokenId: string }> = ({ documentTokenId }) => {
    const { data } = useQuery(['viewers', { documentTokenId }],
        GET_VIEWERS, { placeholderData: [] as any, enabled: !!documentTokenId });

    return <Typography component='div' variant='body2'>
        {
            data.map((viewer: any, index: number) =>
                <Paper key={index} variant='outlined' sx={{ p: 1, mb: 1 }}>
                    <Username address={viewer.userAddress} /></Paper>)
        }
    </Typography>
}
