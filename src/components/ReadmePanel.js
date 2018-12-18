import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const style = theme => ({});

const ReadmePanel = props => {
    //eslint-disable-next-line
    const { readme, classes } = props;
    return (
        <Card>
            <CardContent>
                <Typography component="div" variant="body2">
                    {compiler(readme ? readme.text : '')}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default withStyles(style, { withTheme: true })(ReadmePanel);
