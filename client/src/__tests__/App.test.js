import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import axios from 'axios';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test('backend express API calls working', async () => {
    let data = await axios.get('http://localhost:3000/api/gitHub/getAll');
    console.log(data);
});
