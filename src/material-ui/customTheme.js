import { grey, indigo, red } from "@mui/material/colors";

const customTheme = {
    breakpoints: {
        values: {
            xs: 0,
            xsm: 400,
            sm: 600,
            smd: 750,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
    },
    palette: {
        primary: {
            main: indigo[500],
            hover: indigo[600],
            light: indigo[100],
            dark: indigo[800],
        },
        secondary: {
            main: grey[700],
            light: grey[300],
        },
        background: {
            main: "#fff",
        },
        error: {
            main: red[400],
        },
    },
};

export default customTheme;
