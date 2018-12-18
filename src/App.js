import React, { useState } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import themes from './themes';
import Main from './pages/Main';
export const selectTheme = listOfTopics => {
    for (let x of listOfTopics)
        if (['react', 'angular', 'ember', 'vue'].includes(x.toLowerCase())) return x.toLowerCase();
    return 'default';
};

const App = props => {
    const [theme, setTheme] = useState('default');
    return (
        <MuiThemeProvider theme={themes[theme] ? themes[theme] : themes.default}>
            <CssBaseline />
            <Main themeContext={[theme, setTheme, selectTheme]} />
        </MuiThemeProvider>
    );
};

export default App;
