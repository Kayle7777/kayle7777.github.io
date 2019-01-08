import React from 'react';
import { render } from 'react-testing-library';
import { post as fetch } from 'axios';
import adapter from 'axios/lib/adapters/http';
import Main from '../pages/Main';
jest.setTimeout(15000);

describe('testing Main.js', () => {
    test('render Main with real data', async () => {
        try {
            let apiResponse = await fetch('https://kayle7777.herokuapp.com/api/gitHub/graphql', undefined, { adapter });
            const { getByText } = render(<Main testData={apiResponse.data} />);
            const header = getByText('Jesse Webb');
            const mainReadmePanel = getByText('kayle7777.github.io');
            expect(header.textContent).toBe('Jesse Webb');
        } catch (e) {
            throw new Error(e);
        }
    });
    test('render Main with no data', () => {
        try {
            render(<Main />);
        } catch (err) {
            throw err;
        }
    });
});
