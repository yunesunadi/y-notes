import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { desktopDrawerWidth } from "./HomeLayout";
import DesktopMenuIcon from "./desktop_layout/DesktopMenuIcon";
import MobileMenuIcon from "./mobile_layout/MobileMenuIcon";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import FilterIcon from "./FilterIcon";
import MobileOpenSearchBtn from "./mobile_layout/MobileOpenSearchBtn";
import MobileCloseSearchBtn from "./mobile_layout/MobileCloseSearchBtn";
import { useBreakpointsUp } from "./custom_hooks/useBreakpoints";
import { useState, useEffect } from "react";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "desktopOpen",
})(({ theme, desktopOpen }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(desktopOpen && {
        marginLeft: desktopDrawerWidth,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function AppBarLayout({
    mobileOpen,
    desktopOpen,
    handleDesktopDrawer,
    handleMobileDrawer,
}) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const matches = useBreakpointsUp();

    useEffect(() => {
        localStorage.setItem("searchStr", JSON.stringify(searchValue));
    }, [searchValue]);

    function handleSearch() {
        setSearchOpen((prevState) => !prevState);
    }

    const MenuAndLogo = (
        <>
            <DesktopMenuIcon handleDesktopDrawer={handleDesktopDrawer} />
            <MobileMenuIcon handleMobileDrawer={handleMobileDrawer} />
            {(!mobileOpen || matches) && <Logo />}
        </>
    );

    return (
        <AppBar
            position="fixed"
            color="background"
            desktopOpen={desktopOpen}
            elevation={0}
        >
            <Container maxWidth="xl" disableGutters>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        columnGap: { sm: 5, lg: 20 },
                        "&.MuiToolbar-root": {
                            px: 1.5,
                        },
                    }}
                >
                    {!searchOpen && (
                        <>
                            {matches ? (
                                <Box style={{ display: "flex" }}>
                                    {MenuAndLogo}
                                </Box>
                            ) : (
                                MenuAndLogo
                            )}

                            {matches && (
                                <SearchBox
                                    searchValue={searchValue}
                                    setSearchValue={setSearchValue}
                                />
                            )}
                            <Box>
                                <MobileOpenSearchBtn
                                    handleSearch={handleSearch}
                                />
                                <FilterIcon setSearchValue={setSearchValue} />
                            </Box>
                        </>
                    )}
                    {searchOpen && (
                        <>
                            <SearchBox
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                            />
                            <MobileCloseSearchBtn handleSearch={handleSearch} />
                        </>
                    )}
                </Toolbar>
            </Container>
            <Divider />
        </AppBar>
    );
}
