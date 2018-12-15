import React, { useState, useEffect } from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography, Collapse, CardActionArea } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';
import InfoPanel from './InfoPanel';

const style = theme => ({
    center: {
        textAlign: 'center',
    },
    arrow: {
        fontSize: '2.5rem',
        transform: 'rotate(0deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    },
    arrowShift: {
        fontSize: '2.5rem',
        transform: 'rotate(180deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    },
});

const MainPanel = props => {
    const { owner, repo, readme, classes } = props;
    const [panelIn, togglePanel] = useState(false);
    useEffect(() => togglePanel(false), [props]);
    return (
        <>
            {props.readme ? (
                <Card>
                    <CardActionArea onClick={() => togglePanel(!panelIn)} className={classes.center}>
                        <Typography>
                            <KeyboardArrowUp className={panelIn ? classes.arrowShift : classes.arrow} />
                        </Typography>
                    </CardActionArea>
                    <Collapse in={panelIn}>
                        <InfoPanel owner={owner} repo={repo} />
                    </Collapse>
                    <CardContent>
                        <Typography component="div" variant="body2">
                            {compiler(readme.text)}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <div />
            )}
        </>
    );
};

export default withStyles(style, { withTheme: true })(MainPanel);
