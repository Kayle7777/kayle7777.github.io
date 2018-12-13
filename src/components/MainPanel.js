import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography } from '@material-ui/core';

const MainPanel = props => {
    return (
        <Card>
            <CardContent>
                <Typography component="div" variant="body2">
                    {props.readme && compiler(props.readme.text)}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default MainPanel;
