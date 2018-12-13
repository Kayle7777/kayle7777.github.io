import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import themes from './themes';

const selectTheme = listOfTopics => {
    // select first of match 'react' 'angular' 'ember' 'vue' from list of topics
    for (let x of listOfTopics) if (['react', 'angular', 'ember', 'vue'].includes(x.toLowerCase())) return; // themePicker(x.toLowerCase());
};

ReactDOM.render(
    <MuiThemeProvider theme={themes.default}>
        <CssBaseline />
        <App selectTheme={selectTheme} />
    </MuiThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
