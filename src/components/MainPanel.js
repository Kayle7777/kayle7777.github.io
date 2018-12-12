import React from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

const MainPanel = props => {
    return (
        <Card>
            <CardContent>
                <Typography>{props.readme !== null && compiler(props.readme.text)}</Typography>
            </CardContent>
        </Card>
    );
};

export default MainPanel;
