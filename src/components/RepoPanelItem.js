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
        transform: 'rotate(180deg)',

        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    iconShift: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    },
});

const RepoPanelItem = props => {
    let { classes, selectedRepo, selectRepo, name, index } = props;
    const clickFunction = index => {
        if (index === selectedRepo) {
            selectRepo(null);
        } else selectRepo(index);
    };
    const selected = selectedRepo == index;
    return (
        // expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}
        <ListItem selected={selected} button onClick={() => clickFunction(index)}>
            <ListItemText primary={name.length >= 12 ? name.slice(0, 12) + '...' : name} />
            <ListItemIcon>
                <PlayArrow className={selected ? classes.iconShift : classes.icon} />
            </ListItemIcon>
        </ListItem>
    );
};

export default withStyles(styles, { withTheme: true })(RepoPanelItem);
