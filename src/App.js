import React, { useState, createContext } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import themes from './themes';
import Main from './pages/Main';

export const ThemeSelector = createContext(['default', () => {}]);

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
