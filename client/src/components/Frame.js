import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Hidden, Drawer } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        marginLeft: 240,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - 240px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0,
        },
    },
    drawerWidth: {
        width: 240,
    },
});

const Frame = props => {
    const { classes, theme } = props;
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
                    <Typography variant="h6" noWrap>
                        Nav
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    {/* This is the variant temp for mobile section */}
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={() => navToggle(!mobileOpen)}
                        classes={{
                            paper: classes.drawerWidth,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {props.children}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    {/* This is the perma section */}
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerWidth,
                        }}
                    >
                        {props.children}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
};

export default withStyles(styles, { withTheme: true })(Frame);
