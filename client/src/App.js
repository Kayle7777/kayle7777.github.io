import React from 'react';
import Main from './pages/Main';
import Nav from './components/Nav';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

const theme = createMuiTheme({
    pallete: {
        type: 'dark',
    },
});

const App = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Nav />
            <Main />
        </MuiThemeProvider>
    );
};

export default App;
