import React, { useState } from "react";
import {
    ButtonBase, Dialog, DialogTitle,
    DialogContent, Paper, Typography
} from "@mui/material"
import { ContentCopy } from "@mui/icons-material";

export const AddViewer: React.FC<{ children: (toggle: () => void) => React.ReactNode }>
    = ({ children }) => {
        const [open, setOpen] = useState(false);
        const toggle = () => setOpen(o => !o);

        return <>
            {children(toggle)}
            <Dialog open={open} onClose={toggle}>
                <DialogTitle>Add Viewer</DialogTitle>

                <DialogContent>
                    <Typography variant='body2'>Anyone with this link can view</Typography>
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

export const Viewers = () => {
    return <Typography component='div' variant='body2'>
        <Paper variant='outlined' sx={{ p: 1, mb: 1 }}>AngoJay</Paper>
        <Paper variant='outlined' sx={{ p: 1, mb: 1 }}>WarriCEO</Paper>
        <Paper variant='outlined' sx={{ p: 1 }}>Mikkybang</Paper>
    </Typography>
}
