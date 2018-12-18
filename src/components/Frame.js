import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Hidden, Divider, Drawer, CardContent } from '@material-ui/core';
import { Menu as MenuIcon, Home as HomeIcon } from '@material-ui/icons';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 280,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: 280,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - 280px)`,
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
        width: 280,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
});

const Frame = props => {
    const { classes, theme, name, home } = props;
    const [ListItems, ...Rest] = props.children;
    const [mobileOpen, navToggle] = useState(false);
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
                    <IconButton aria-label="Go to main page" onClick={() => home()}>
                        <HomeIcon />
                    </IconButton>
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
