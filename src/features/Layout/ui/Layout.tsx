import {Link as RouterLink, Outlet} from "react-router-dom";
import {AppBar, Button, Toolbar, Typography} from "@mui/material";

export const Layout = () => {
    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        React Paginated Table
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/users/1">
                        Home
                    </Button>
                </Toolbar>
            </AppBar>
            <main>
                <Outlet/>
            </main>
        </>
    );
};
