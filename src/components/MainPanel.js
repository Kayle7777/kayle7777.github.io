import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography, Fade } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const MainPanel = props => {
    return (
        <Fade in={props.readme ? true : false}>
            {props.readme ? (
                <Card>
                    <CardContent>
                        <Typography component="div" variant="body2">
                            {compiler(props.readme.text)}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <div />
            )}
        </Fade>
    );
};

export default withStyles({}, { withTheme: true })(MainPanel);
