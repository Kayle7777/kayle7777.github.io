import React, { useState, createContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import themes from './themes';
import Main from './pages/Main';
export const ThemeSelector = createContext(['default', () => {}]);
export const selectTheme = listOfTopics => {
    // select first of match 'react' 'angular' 'ember' 'vue' from list of topics
    for (let x of listOfTopics) if (['react', 'angular', 'ember', 'vue'].includes(x.toLowerCase())) return x;
    return 'default';
};

const App = props => {
    const [theme, setTheme] = useState('default');
    return (
        <ThemeSelector.Provider value={[theme, setTheme]}>
            <MuiThemeProvider theme={themes[theme] ? themes[theme] : themes.default}>
                <CssBaseline />
                <Main selectTheme={props.selectTheme} />
            </MuiThemeProvider>
        </ThemeSelector.Provider>
    );
};

export default App;
