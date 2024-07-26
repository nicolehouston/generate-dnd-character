import {Box, Typography} from "@mui/material";

const Header = () => {
    return (
        <Box textAlign="center" paddingTop={4}>
            <Typography variant="h1" fontWeight={500}>
                DnD Character Generator
            </Typography>
            <Typography mt={2}>Select your character's attributes below and then click "Generate Image" to see your character's portrait!</Typography>
        </Box>
    )
}

export default Header;