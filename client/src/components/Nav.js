import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
    },
};

function SimpleAppBar(props) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Photos</Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withStyles(styles)(SimpleAppBar);
