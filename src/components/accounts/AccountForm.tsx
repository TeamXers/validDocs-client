import { Backdrop, Slide, Box, Typography } from "@mui/material"
import * as yup from "yup";
import { useMutation } from "react-query";
import { SET_USERNAME } from "../../api/validdocs";
import { useAppState } from "../../context/Provider";
import { IField } from "../forms/Fields";
import { Form, SpinnerButton } from "../forms/Form"
import { useSnackbar } from "notistack";

interface SlidingAccountFormProps {
    open: boolean,
    onClose: () => void
}

const FIELDS: IField[] = [
    {
        name: "username",
        label: "Display name",
        initialValue: "",
        validator: yup.string().required("Please enter a display name"),
    },
];

export const SlidingAccountForm: React.FC<SlidingAccountFormProps> = ({ open, onClose }) => {
    const { state, updateState } = useAppState();
    const { enqueueSnackbar } = useSnackbar();
    const { mutate, isLoading } = useMutation(SET_USERNAME, {
        onSuccess: (_data, account) => {
            enqueueSnackbar("Display name updated successfully", { variant: 'success' });
            onClose();

            if (!updateState)
                return;
            updateState({ account });
        },
        onError: () => {
            enqueueSnackbar("An error occurred", { variant: 'error' });
        }
    });


    return <Backdrop
        open={open} onClick={onClose}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
        <Slide direction='up' in={open}>
            <Box bgcolor='white'
                borderRadius={'20px 20px 0 0'}
                onClick={(e) => { e.stopPropagation(); }}
                position='absolute'
                pt={10}
                top={'50%'} bottom={0}
                boxSizing={'border-box'}
                width={'100%'} maxWidth={'1000px'}
                sx={{ px: { xs: 2, md: 4 } }}>
                <Box sx={{ maxWidth: "50rem" }}>
                    <Typography variant='h4' sx={{ mb: 4 }}>Update your display name</Typography>

                    <Form
                        fields={FIELDS}
                        onSubmit={({ username }) =>
                            mutate({ username, address: state.walletAddress as string })
                        }
                    >
                        <SpinnerButton
                            loading={isLoading}
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Save
                        </SpinnerButton>
                    </Form>
                </Box>
            </Box>
        </Slide>
    </Backdrop>
}
