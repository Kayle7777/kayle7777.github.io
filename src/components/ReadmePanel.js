import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const style = theme => ({});

const ReadmePanel = ({ readme, classes }) => {
    return (
        <>
            {readme && (
                <Card>
                    <CardContent>
                        <Typography component="div" variant="body2">
                            {compiler(readme.text)}
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </>
    );
};

export default withStyles(style, { withTheme: true })(ReadmePanel);
