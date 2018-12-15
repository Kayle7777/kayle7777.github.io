import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Button,
    Hidden,
    Divider,
    Drawer,
    CardContent,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

const Frame = props => {
    const { classes, theme, name } = props;
    const [mobileOpen, navToggle] = useState(false);
    const [ListItems, ...Rest] = props.children;
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        aria-label="Open Drawer"
                        onClick={() => navToggle(!mobileOpen)}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap className={classes.grow}>
                        {name}
                    </Typography>
                    <Button onClick={() => sessionStorage.clear()}>clear session storage</Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    {/* This is the variant temp for mobile section */}
                    <Drawer
                        container={props.container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={() => navToggle(!mobileOpen)}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {/* <div className={classes.toolbar} /> */}
                        <CardContent className={classes.toolbar}>
                            <Typography noWrap align="center" variant="overline">
                                sort by last updated
                            </Typography>
                        </CardContent>
                        <Divider />
                        {ListItems}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    {/* This is the perma section */}
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <CardContent className={classes.toolbar}>
                            <Typography noWrap align="center" variant="overline">
                                sort by last updated
                            </Typography>
                        </CardContent>
                        <Divider />
                        {ListItems}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {Rest}
            </main>
        </div>
    );
};

export default withStyles(styles, { withTheme: true })(Frame);
