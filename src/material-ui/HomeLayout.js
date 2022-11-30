import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBarLayout from "./AppBarLayout";
import DesktopDrawer from "./desktop_layout/DesktopDrawer";
import MobileDrawer from "./mobile_layout/MobileDrawer";
import MainLayout from "./MainLayout";
import LabelsProvider from "../context/LabelContext";
import { useState } from "react";

export const mobileDrawerWidth = 230;
export const desktopDrawerWidth = 210;

export default function HomeLayout({ children }) {
    const [desktopOpen, setDesktopOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDesktopDrawer = () => {
        setDesktopOpen((prevState) => !prevState);
    };

    const handleMobileDrawer = () => {
        setMobileOpen((prevState) => !prevState);
    };

    localStorage.setItem("desktopOpen", JSON.stringify(desktopOpen));

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBarLayout
                mobileOpen={mobileOpen}
                desktopOpen={desktopOpen}
                handleDesktopDrawer={handleDesktopDrawer}
                handleMobileDrawer={handleMobileDrawer}
            />
            <LabelsProvider>
                <DesktopDrawer desktopOpen={desktopOpen} />
                <MobileDrawer
                    mobileOpen={mobileOpen}
                    handleMobileDrawer={handleMobileDrawer}
                />
            </LabelsProvider>
            <MainLayout>{children}</MainLayout>
        </Box>
    );
}
