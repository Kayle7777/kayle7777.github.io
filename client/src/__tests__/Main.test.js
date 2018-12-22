import React from 'react';
import { render } from 'react-testing-library';
import request from 'supertest';
import app from '../../../server';
import Main from '../pages/Main';
import dotenv from 'dotenv';
dotenv.config();
jest.setTimeout(15000);

test('render Main with data test', async () => {
    try {
        const apiResponse = await request(app).post('/api/gitHub/graphql');
        const { getByText } = render(<Main testData={apiResponse.body} />);
        const header = getByText('Jesse Webb');
        expect(header.textContent).toBe('Jesse Webb');
    } catch (e) {
        throw new Error(e);
    }
});
