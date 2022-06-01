import { useState } from "react";
import {
    Box,
    ButtonBase,
    Stack,
    Typography,
    Skeleton as MuiSkeleton,
    SkeletonProps,
    Button,
    Container,
    Avatar,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const Questions = () => {
    const [expanded, setExpanded] = useState<string | boolean>(false);
    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
    const data = [
        {
            question:"What is ValidDocs?",
            answer:"ValidDocs is a web3 application that allows you to store, sign, manage, and verify documents using the Harmony blockchain and IPFS (Interplanetary File System).",
            panelNum:"panel1"
        },
        {
            question: "Who can see my documents?",
            answer: "ValidDocs has a privacy feature to make your uploaded document public and private. When private, it is seen by only you and accessible only via your wallet address, but when public, anyone can access it by searching from validdocs. You can also create sharable links and add specific wallet addresses to view private documents.",
            panelNum: "panel2"
        },
        {
            question: "Where are my documents stored?",
        answer: `ValidDocs stores your document file on IPFS. Click this link to find out more about ipfs ${<a href='https://ipfs.io/' target='_blank' >https://ipfs.io/</a>} .`,
            panelNum: "panel3"
        },
        {
            question: "How does document verification work on ValidDocs?",
            answer: "We mint NFTs for each document uploaded to our platform. Anybody can verify the authenticity of a document by inspecting the NFT using the harmony explorer.",
            panelNum: "panel4"
        }
    ]
    return (
    <>
         <Box>
              {
                  data.map(
                      (item)=>(
                            <Accordion
                    expanded={expanded === true || expanded === item.panelNum}
                    onChange={handleChange(item.panelNum)}
                    elevation={0.5}
                    // variant="outlined"
                >
                    <AccordionSummary
                        expandIcon={
                            <ExpandMoreIcon
                                color={
                                    expanded === true || expanded === item.panelNum
                                        ? "primary"
                                        : "inherit"
                                }
                            />
                        }
                        aria-controls={`${item.panelNum}-content`}
                                  id={`${item.panelNum}-header`}
                    >
                        <Typography variant="h4" sx={{ fontSize: "20px !important" }}>
                       {item.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails> 
                                  <Typography >{item.answer}</Typography> 
                        </AccordionDetails>
                        </Accordion> 
                     
                      )
                  )
              }
                <hr style={{margin:0, borderTopColor: "rgba(0, 0, 0, 0.1)"}}/>
                               </Box>
    </>
    )
};

// const AccordionSummary = styled((props: AccordionSummaryProps) => (
//     <MuiAccordionSummary
//         expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
//         {...props}
//     />
// ))(({ theme }) => ({
//     backgroundColor:
//         theme.palette.mode === 'dark'
//             ? 'rgba(255, 255, 255, .05)'
//             : 'rgba(0, 0, 0, .03)',
//     flexDirection: 'row-reverse',
//     '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
//         transform: 'rotate(90deg)',
//     },
//     '& .MuiAccordionSummary-content': {
//         marginLeft: theme.spacing(1),
//     },
// }));


export default Questions