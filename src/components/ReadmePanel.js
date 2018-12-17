import React, { useContext, useEffect } from 'react';
import { compiler } from 'markdown-to-jsx';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { ThemeSelector, selectTheme } from '../App';

const style = theme => ({});

const ReadmePanel = ({ readme, classes, topics }) => {
    // eslint-disable-next-line
    const [theme, setTheme] = useContext(ThemeSelector);
    useEffect(
        () => {
            let pickedTheme = selectTheme(topics);
            if (pickedTheme === 'default') {
                if (theme === 'default') return;
                else return setTheme('default');
            } else return setTheme(pickedTheme);
        },
        [readme]
    );
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
