import { CircularProgress, Dialog, DialogContent, DialogTitle, FormControlLabel, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import { PATCH_DOCUMENT } from "../../../api/validdocs";

export interface IPrivacyStatusDialogProps {
    children: (toggle: () => void) => React.ReactNode
    tokenId: string
    isPublic: boolean
}

export const PrivacyStatusDialog: React.FC<IPrivacyStatusDialogProps>
    = ({ children, tokenId, isPublic }) => {
        const queryClient = useQueryClient();
        const { mutateAsync, isLoading } = useMutation(PATCH_DOCUMENT);
        const { enqueueSnackbar } = useSnackbar(); 
        const [open, setOpen] = useState(false);
        const toggle = () => setOpen(o => !o);
        const [checked, setChecked] = useState(isPublic);

        useEffect(() => setChecked(isPublic), [isPublic]);
        
        const handleChange = async () => {
            const initialVal = checked;
            try {
                setChecked(!initialVal);
                await mutateAsync({
                    update: { isPublic: !initialVal }, params: { tokenId } });
                queryClient.refetchQueries([['document', tokenId]]);
                // const data: any = queryClient.getQueryData(['document', tokenId]);
                // console.log(data, tokenId);
                // queryClient.setQueryData(
                //     ['document', tokenId], { ...data, isPublic: !initialVal })
            } catch (e: any) {
                console.log(e);
                setChecked(initialVal);
                enqueueSnackbar(
                    `Could not complete operation: ${e.message}`, { variant: 'error' });
            } 
        }

        return <>
            {children(toggle)}

            <Dialog open={open} onClose={toggle}>
                <DialogTitle>Update Privacy Status</DialogTitle>

                <DialogContent sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel control={
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                            disabled={isLoading}
                        />
                    } label='Is this document open to the public?' />

                    { isLoading && <CircularProgress color='primary' size={20} sx={{ ml: 2 }} /> }
                </DialogContent>
            </Dialog>
        </>
    }
