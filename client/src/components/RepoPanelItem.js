import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { ArrowForwardIos as PlayArrow } from '@material-ui/icons';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    iconShift: {
        transform: 'rotate(180deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    },
});

const RepoPanelItem = props => {
    const { classes, selectedRepo, selectRepo, repoData, index } = props;
    const clickFunction = index => {
        if (index === selectedRepo) {
            selectRepo(null);
        } else selectRepo(index);
    };
    return (
        // expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}
        <ListItem button onClick={() => clickFunction(index)}>
            <ListItemText primary="Inbox" />
            <ListItemIcon>
                <PlayArrow className={selectedRepo === index ? classes.iconShift : classes.icon} />
            </ListItemIcon>
        </ListItem>
    );
};

export default withStyles(styles, { withTheme: true })(RepoPanelItem);
