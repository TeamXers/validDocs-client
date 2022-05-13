import { Box, Stack, ButtonBase, Paper, Typography, SkeletonProps, Skeleton as MuiSkeleton, styled, BoxProps } from "@mui/material";
import { useTransition, animated } from "react-spring";
import { Link as RouterLink } from "react-router-dom";
import DocumentIcon from "../../assets/document.svg";
import { formatDate } from "../../utils/date";

const Skeleton = styled(MuiSkeleton)<SkeletonProps>(() => ({
    transform: "scale(1, 1)",
}));

interface DocumentsProps {
    documents: any[],
    isLoading: boolean
}

export const Documents: React.FC<DocumentsProps & Pick<BoxProps, 'sx'>> = ({ documents, isLoading, ...boxProps }) => {
    const transitions = useTransition(isLoading, {
        enter: { opacity: 1, position: "relative" },
        leave: { opacity: 0, position: "absolute", width: "100%" },
    });

    return <Box { ...boxProps }>
        {transitions((style: any, loading: any) => (
            <animated.div key={`${loading}`} style={style}>
                <Stack
                    alignItems={"center"}
                    direction={{ xs: "column", sm: "row" }}
                    flexWrap="wrap"
                >
                    {loading ? (
                        <Loader sx={{ my: 3, mr: 3 }} width={250} height={300} />
                    ) : (
                        <>
                            {documents && documents.length > 0 ? (
                                documents?.map((doc: any, index: number) => (
                                    <ButtonBase
                                        key={index}
                                        component={RouterLink}
                                        to={`/account/documents/${doc.tokenId}`}
                                        sx={{
                                            my: 3,
                                            mr: 3,
                                            textAlign: "left",
                                            width: 250,
                                            height: 300,
                                        }}
                                    >
                                        <Paper
                                            variant={"outlined"}
                                            sx={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                        >
                                            <Stack
                                                alignItems="center"
                                                justifyContent="center"
                                                height={200}
                                                bgcolor="#eeeeee"
                                            >
                                                <img
                                                    src={DocumentIcon}
                                                    style={{ objectFit: "cover", width: 100 }}
                                                    alt={doc.name}
                                                />
                                            </Stack>
                                            <Typography
                                                sx={{ mx: 1, mt: 2 }}
                                                overflow="ellipsis"
                                            >
                                                {doc.name}
                                            </Typography>
                                            <Typography sx={{ mx: 1 }} variant="body2">
                                                Created on {formatDate(doc.createdAt)}
                                            </Typography>
                                        </Paper>
                                    </ButtonBase>
                                ))
                            ) : (
                                <Typography align="center" sx={{ mt: 4, mx: "auto" }}>
                                    No documents to display
                                </Typography>
                            )}
                        </>
                    )}
                </Stack>
            </animated.div>
        ))}
    </Box>
}

const Loader: React.FC<SkeletonProps> = (props) => (
    <>
        <Skeleton {...props} />
        <Skeleton {...props} />
        <Skeleton {...props} />
        <Skeleton {...props} />
        <Skeleton {...props} />
        <Skeleton {...props} />
        <Skeleton {...props} />
        <Skeleton {...props} />
    </>
);
