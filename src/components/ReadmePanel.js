import React, { useContext, useEffect } from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { ThemeSelector, selectTheme } from '../App';

const style = theme => ({});

const ReadmePanel = ({ readme, classes, topics }) => {
    // eslint-disable-next-line
    const [theme, setTheme] = useContext(ThemeSelector);
    useEffect(() => setTheme(selectTheme(topics.map(each => each.node.topic.name))), [topics]);
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
