import React, { useState, useEffect } from 'react';
import Main from './pages/Main';
import Nav from './components/Nav';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import axios from 'axios';

const theme = createMuiTheme({
    pallete: {
        type: 'dark',
    },
});

const App = () => {
    const [repos, setRepos] = useState({ owner: {}, repos: [] });

    const fetchData = async () => {
        const url = 'http://localhost:3001';
        const result = await axios(`${url}/api/gitHub/`);
        setRepos(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);
    console.log(repos);
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Nav />
            {/* <Route exact path="/" component={Main} /> */}
        </MuiThemeProvider>
    );
};

export default App;
