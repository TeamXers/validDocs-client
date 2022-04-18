import { Box, Container, Typography, Divider, Input, Button} from '@mui/material';
import IpfsLogo from "../assets/ipfs.svg"
import HarmonyLogo from "../assets/harmony.svg"

const Footer = () => {
    const getYear = (): number => {
        const currentYear: number = new Date().getFullYear();
        return currentYear;
    };
    return (
        <>
           
            <footer >
                <Box sx={{ display: "flex", flexDirection:{xs:"column", md:"row"},justifyContent: "center", backgroundColor: "rgb(0, 150, 136, 0.7)", margin: "2rem 0 0 0", padding: "2rem" }}>
      
                    <Box component={"img"} src={HarmonyLogo} alt="harmony logo" sx={{ display:"flex",width: "150px", margin: {xs:"0 auto",md:"0 4rem"}, opacity: "0.7",":hover":{opacity:"1"} }} />
                    <Box component={"img"} src={IpfsLogo} alt="ipfs logo" sx={{ display:"flex",width: "150px", opacity: "0.7", margin: { xs: "0 auto", md: "0 4rem" }, ":hover": { opacity: "1" } }} />
          
                </Box>
                <Box sx={{ padding: "1rem", margin: "0", backgroundColor: "#009688" }}>
                    <Container>
                    <Box sx={{display:"flex", margin:"2rem 0", flexDirection:{xs:"column", md:"row"} }}>
                            <Box sx={{ width: { xs: "100%", md: "50%" }, color:"#fff"}}>
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ mr: 2, display: { xs: 'flex' }, fontFamily: '"Roboto", sans-serif', width: "50%" }}
                                >
                                    VALIDDOCS
                                </Typography>
                                <Typography >
                                    Take advantage of the power of the blockchain to protect the authenticity and integrity of your documents.
                                </Typography>
                     </Box>
                        <Box sx={{color:"#fff", margin:{xs:"2rem 0 0 0", md:"0"}}}>
                            <Typography 
                            variant="h6"
                            >
                                Stay in the loop
                            </Typography>
                            <Typography>
                                join our mailing list to stay in the loop with our newest feature releases.
                            </Typography>
                                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, margin:"1.5rem 0", alignItems:"center"}}>    
                        <Input placeholder="Your email" name="mailList" sx={{width:{xs:"100%",md:"300px"}, padding:".5rem 1rem",backgroundColor:"#fff", borderRadius:"10px"}} />
                                    <Button variant="contained" sx={{ margin: {xs:"1rem 0 0 0",md:"0 0 0 1rem"}, backgroundColor: "rgb(0, 191, 173)", borderRadius:"10px", padding:".7rem 2rem" }}>SUBMIT</Button>
                        </Box>
                        </Box>
                        </Box>
                        <Box sx={{width:"100%"}}>
                                <Box sx={{ padding: "0rem 0 1rem 0" }}> <Divider sx={{ borderColor: "#fff" }} /></Box>
                                <Typography sx={{ textAlign: "center", color: "#fff", fontSize:"14px" }}>All rights reserved &copy;{getYear()} ValidDocs</Typography>
                       </Box>
                     
                    </Container>

                </Box>

            </footer>
        </>
    )
}

export default Footer