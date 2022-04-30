import { useState } from "react";
import { ContentCopy } from "@mui/icons-material";
import { ButtonBase, Dialog, DialogContent, DialogTitle, Paper, Typography } from "@mui/material"

export const AddSigner: React.FC<{ children: (toggle: () => void) => React.ReactNode }>
    = ({ children }) => {
        const [open, setOpen] = useState(false);
        const toggle = () => setOpen(o => !o);

        return <>
            {children(toggle)}
            <Dialog open={open} onClose={toggle}>
                <DialogTitle>Invite a Signer</DialogTitle>

                <DialogContent>
                    <Typography variant='body2'>Invite anyone to sign this document with this link</Typography>
                    <ButtonBase sx={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, mt: 1,
                        border: '1px solid #cccccc', borderRadius: '4px'
                    }}>
                        <Typography noWrap sx={{ width: '80%', maxWidth: '400px' }}>
                            Eu duis esse commodo tempor ea quis id commodo aute veniam mollit eiusmod veniam.
                        </Typography>

                        <ContentCopy sx={{ ml: 2 }} />
                    </ButtonBase>
                </DialogContent>
            </Dialog>
        </>
    }

export const Signers = () => {
    return <Typography component='div' variant='body2'>
        <Paper variant='outlined' sx={{ p: 1, mb: 1 }}>AngoJay</Paper>
        <Paper variant='outlined' sx={{ p: 1, mb: 1 }}>WarriCEO</Paper>
        <Paper variant='outlined' sx={{ p: 1 }}>Mikkybang</Paper>
    </Typography>
}
