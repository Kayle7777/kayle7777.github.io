import React, { useState, createContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import themes from './themes';
import Main from './pages/Main';
export const ThemeSelector = createContext(['default', () => {}]);
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
            <ThemeSelector.Provider value={[theme, setTheme]}>
                <Main />
            </ThemeSelector.Provider>
        </MuiThemeProvider>
    );
};

export default App;
