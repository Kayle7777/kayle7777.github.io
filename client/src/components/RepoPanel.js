import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';

const styles = theme => {
    console.log(theme);
    return {
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            // color: theme.palette.text.secondary,
        },
    };
};

const RepoPanel = props => {
    const { classes, selectedRepo, selectRepo } = props;
    return (
        // expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>General settings</Typography>
                <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
                    dignissim quam.
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
};

export default withStyles(styles, { withTheme: true })(RepoPanel);
