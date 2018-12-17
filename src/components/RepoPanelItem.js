import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { ArrowForwardIos as PlayArrow, Star } from '@material-ui/icons';

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
    listItem: {
        backgroundSize: '200% 100%',
        backgroundImage: `linear-gradient(to right, ${theme.palette.background.paper} 50%, ${
            theme.palette.primary.light
        } 50%)`,
        backgroundPosition: '-100%',
        transition: theme.transitions.create(['background-position'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    },
    listItemShift: {
        backgroundSize: '200% 100%',
        backgroundImage: `linear-gradient(to right, ${theme.palette.background.paper} 50%, ${
            theme.palette.primary.light
        } 50%)`,
        backgroundPosition: '0',
        transition: theme.transitions.create(['background-position'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    },
});

const RepoPanelItem = props => {
    let { classes, selectedRepo, selectRepo, name, index, pinned } = props;
    const selected = selectedRepo == index;
    return (
        <ListItem
            selected={selected}
            className={selected ? classes.listItem : classes.listItemShift}
            button
            onClick={() => selectRepo(selected ? null : index)}
        >
            {pinned && (
                <ListItemIcon>
                    <Star />
                </ListItemIcon>
            )}
            <ListItemText primary={name} primaryTypographyProps={{ noWrap: true }} />
            <ListItemIcon>
                <PlayArrow className={selected ? classes.iconShift : classes.icon} />
            </ListItemIcon>
        </ListItem>
    );
};

export default withStyles(styles, { withTheme: true })(RepoPanelItem);
