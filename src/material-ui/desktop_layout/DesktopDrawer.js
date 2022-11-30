import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { desktopDrawerWidth } from "../HomeLayout";
import useDialog from "../custom_hooks/useDialog";
import useListItems from "../custom_hooks/useListItems";
import NavLinkItem from "../NavLinkItem";

const openedMixin = (theme) => ({
    width: desktopDrawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "desktopOpen",
})(({ theme, desktopOpen }) => ({
    width: desktopDrawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(desktopOpen && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!desktopOpen && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function DesktopDrawer({ desktopOpen }) {
    const [openDialog, handleDialogOpen, handleDialogClose] = useDialog();
    const listItems = useListItems(openDialog, handleDialogClose);

    return (
        <Drawer
            variant="permanent"
            desktopOpen={desktopOpen}
            sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                    marginLeft: { xl: `calc(50vw - 770px)` },
                },
            }}
        >
            <Toolbar />
            <List disablePadding>
                {listItems.map(({ icon, textLabel, url, labelDialog }) => (
                    <NavLinkItem
                        key={textLabel}
                        textLabel={textLabel}
                        url={url}
                        topPadding={true}
                    >
                        <ListItem sx={{ py: 0 }}>
                            <ListItemButton
                                sx={{
                                    borderRadius: 3,
                                    px: 3,
                                    ml: -1,
                                }}
                                onClick={
                                    textLabel === "Edit Labels"
                                        ? handleDialogOpen
                                        : undefined
                                }
                                disableRipple
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: desktopOpen ? 2 : "auto",
                                        ml: -1.5,
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={textLabel}
                                    primaryTypographyProps={{
                                        color: "secondary.main",
                                        fontSize: "text",
                                    }}
                                    sx={{
                                        opacity: desktopOpen ? 1 : 0,
                                    }}
                                />
                            </ListItemButton>
                            {labelDialog}
                        </ListItem>
                    </NavLinkItem>
                ))}
            </List>
        </Drawer>
    );
}
