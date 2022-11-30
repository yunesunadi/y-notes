import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../Logo";
import { mobileDrawerWidth } from "../HomeLayout";
import useDialog from "../custom_hooks/useDialog";
import useListItems from "../custom_hooks/useListItems";
import NavLinkItem from "../NavLinkItem";

function MobileDrawer({ mobileOpen, handleMobileDrawer }) {
    const [openDialog, handleDialogOpen, handleDialogClose] =
        useDialog(handleMobileDrawer);
    const listItems = useListItems(openDialog, handleDialogClose);

    return (
        <Drawer
            variant="temporary"
            open={openDialog ? !mobileOpen : mobileOpen}
            onClose={handleMobileDrawer}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                display: { sm: "none" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: mobileDrawerWidth,
                },
                zIndex: 2000,
            }}
        >
            <List>
                <ListItem>
                    <Logo mobileOpen={mobileOpen} />
                </ListItem>
                {listItems.map(({ icon, textLabel, url, labelDialog }) => (
                    <NavLinkItem
                        key={textLabel}
                        textLabel={textLabel}
                        url={url}
                        topPadding={false}
                    >
                        <ListItem sx={{ pb: 0 }}>
                            <ListItemButton
                                sx={{
                                    display: "flex",
                                    columnGap: 1.5,
                                    borderRadius: 3,
                                }}
                                onClick={
                                    textLabel === "Edit Labels"
                                        ? handleDialogOpen
                                        : handleMobileDrawer
                                }
                                disableRipple
                            >
                                {icon}
                                <ListItemText
                                    primary={textLabel}
                                    primaryTypographyProps={{
                                        fontSize: 13.5,
                                        color: "secondary.main",
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

export default MobileDrawer;
