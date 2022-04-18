import { colors, createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
    palette: {
        primary: colors.teal
    },
    typography: {
        fontFamily: [
            '"Poppins"',
            '"Roboto"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1024,
            xl: 1200,
         
        },
    }
});

theme = responsiveFontSizes(theme);

export { theme };
