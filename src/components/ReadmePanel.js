import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import noReadme from '../utils/noReadme.js';

const style = theme => ({});
const compilerOptions = {
    overrides: {
        a: {
            component: props => <Button color="secondary" target="_blank" rel="noreferrer noopener" {...props} />,
        },
    },
};

const ReadmePanel = props => {
    //eslint-disable-next-line
    const { readme, classes } = props;
    return (
        <Card>
            <CardContent>
                <Typography component="div" variant="body2">
                    {compiler(readme ? readme.text : noReadme.readme.trim().replace(/ {4}/gm, ''), compilerOptions)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default withStyles(style)(ReadmePanel);
