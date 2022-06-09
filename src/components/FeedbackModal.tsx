import { useState } from "react";
import {
    Box,
    Button,
    Typography,
    Modal,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as yup from "yup";
import { IField } from "./forms/Fields"
import { Form } from "./forms/Form"

const FIELDS: IField[] = [

    {
        name: "feedback",
        label: "Tell us how we can improve",
        multiline: true,
        initialValue: "",
        validator: yup.string(),
        customStyle: {
            width: "100%"
        }
    },

]

const FeedbackModal = () => {
    const [open, setOpen] = useState(true)
    const [toggleFeedback, setToggleFeedback] = useState(false)
    const [rating, setRating] = useState("")
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Modal
                sx={{ color: '#252525', display: "flex", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    backgroundColor: "#fff",
                    border: "none",
                    width: { xs: "90%", lg: "30%" },
                    px: "2rem",
                    py: "4rem",
                    display: "flex",
                    margin: "auto",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    ":focus-visible": {

                        outline: "1px solid #fff"
                    }

                }}>
                    {
                        !toggleFeedback ? (
                            <>
                                <Box>
                                    <CheckCircleIcon color="primary" sx={{ fontSize: 70, mb:"1rem" }} />
                                </Box>
                                <Typography variant="h6">Your Document was successfully uploaded</Typography>
                                <Button sx={{ mt: "2rem", textTransform:"none"}} onClick={() => setToggleFeedback(true)}>
                                    provide feedback?
                                </Button>
                            </>
                        )
                            : (
                                <>
                                    {rating === "" ? (<>
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontWeight: 600, color: "#252525", fontSize: "24px !important", width: "80%", mb: "2rem"
                                            }}>
                                            How would you rate your experience{"?"}
                                        </Typography>
                                        <Box sx={{ width: "80%" }}>
                                            {
                                                [
                                                    {
                                                        rating: "Not Satisfied",
                                                        id: "1"
                                                    },
                                                    {
                                                        rating: "Somewhat Satisfied",
                                                        id: "2"
                                                    },
                                                    {
                                                        rating: "Satisfied",
                                                        id: "3"
                                                    },
                                                    {
                                                        rating: "Very Satisfied",
                                                        id: "4"
                                                    },
                                                    {
                                                        rating: "Satisfied enough to tell others",
                                                        id: "5"
                                                    }
                                                ].map(
                                                    (item: any) => (
                                                        <Button
                                                            sx={{
                                                                border: "2px solid #009688",
                                                                borderRadius: "10px",
                                                                width: "100%",
                                                                display: "block",
                                                                my: "0.5rem",
                                                                textAlign: "left",
                                                                textTransform: "none",
                                                            }}
                                                            key={item.id}
                                                            onClick={() => setRating(item.rating)}>
                                                            {item.rating}
                                                        </Button>
                                                    )
                                                )
                                            }
                                        </Box>
                                    </>)
                                        :
                                        (
                                            <>
                                                <Typography
                                                    variant="h2"
                                                    sx={{
                                                        fontWeight: 600, color: "#252525", fontSize: "24px !important", width: "100%", mb: "2rem", textAlign: "center"
                                                    }}>
                                                    We value your <span style={{ color: "#009688" }}>feedback</span>
                                                </Typography>
                                                <Box sx={{ width: "100%" }}>
                                                    <Form fields={FIELDS} onSubmit={() => { handleClose() }}>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            type="submit"
                                                        >
                                                            Submit
                                                        </Button>
                                                    </Form>
                                                </Box>
                                            </>
                                        )
                                    }
                                </>
                            )

                    }

                </Box>
            </Modal>
        </>
    )
}



export default FeedbackModal