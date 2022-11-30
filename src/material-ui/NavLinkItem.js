import Box from "@mui/material/Box";
import { NavLink, useLocation } from "react-router-dom";

export default function NavLinkItem({ children, textLabel, url, topPadding }) {
    const { pathname } = useLocation();

    return (
        <Box
            sx={{
                "&:first-of-type": { pt: topPadding ? 1.5 : 0 },
                "& a.active .MuiListItemButton-root": {
                    backgroundColor:
                        textLabel !== "Edit Labels"
                            ? "secondary.light"
                            : undefined,
                },
                "& .MuiListItemButton-root": {
                    backgroundColor:
                        textLabel === "Notes" && pathname === "/"
                            ? "secondary.light"
                            : undefined,
                },
            }}
        >
            <NavLink to={url} style={{ textDecoration: "none" }}>
                {children}
            </NavLink>
        </Box>
    );
}
