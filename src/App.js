import React from 'react';
import Main from './pages/Main';

const App = props => {
    return (
        <>
            <Main selectTheme={props.selectTheme} />
        </>
    );
};

export default App;
