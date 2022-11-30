import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import HomeLayout from "../material-ui/HomeLayout";
import customTheme from "../material-ui/customTheme";
import { useBreakpointsDown } from "../material-ui/custom_hooks/useBreakpoints";
import { Outlet } from "react-router-dom";

export default function Layout() {
    const matches = useBreakpointsDown();

    const theme = createTheme({
        ...customTheme,
        typography: {
            text: matches ? 13.5 : 15,
            title: matches ? 16 : 19,
            filterText: matches ? 12 : 14,
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <HomeLayout>
                <Outlet />
            </HomeLayout>
        </ThemeProvider>
    );
}
