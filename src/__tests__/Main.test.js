import React from 'react';
import { render } from 'react-testing-library';
import Main from '../pages/Main';

test('pulls gets its state set correctly', () => {
    const { container } = render(<Main />);
    console.log(Object.keys(container));
});
