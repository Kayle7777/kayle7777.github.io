import React from 'react';
import { render } from 'react-testing-library';
import request from 'supertest';
import app from '../../../server';
import Main from '../pages/Main';
jest.setTimeout(15000);

describe('testing Main.js', () => {
    test('render Main with real data', async () => {
        try {
            const apiResponse = await request(app).post('/api/gitHub/graphql');
            const { getByText } = render(<Main testData={apiResponse.body} />);
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
