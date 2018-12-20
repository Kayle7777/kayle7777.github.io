const request = require('supertest');
const app = require('../server');
const API = require('../controllers/graphql');
const { graphql, ownerSchema, repoSchema } = API;
require('dotenv').config();
jest.setTimeout(30000);

test('github v4 graphql API repos', async () => {
    try {
        let repoData = await graphql(repoSchema);
        repoData = repoData.data.viewer.repositories.nodes;
        expect(repoData).toBeTruthy();
        let failCount = 0;
        for (let x of repoData) if (!x.readme) failCount++;
        expect(failCount).toBeLessThan(10);
    } catch (err) {
        throw new Error(`Should have returned an Array, and shouldn't have too many empty readmes.`);
    }
});

test('github v4 graphql API owner info', async () => {
    try {
        let ownerData = await graphql(ownerSchema);
        ownerData = ownerData.data.viewer;
        expect(ownerData).toHaveProperty('bio');
        expect(ownerData).toHaveProperty('createdAt');
        expect(ownerData).toHaveProperty('name');
    } catch (err) {
        throw new Error(`Should have returned an object of owner values`);
    }
});

test('actual API return', async () => {
    try {
        const apiResponse = await request(app).post('/api/gitHub/graphql');
        expect(apiResponse.statusCode).toBe(200);
        expect(apiResponse.body).toHaveProperty('owner');
        expect(apiResponse.body).toHaveProperty('repos');
        let pinnedCount = 0;
        for (let x of apiResponse.body.repos) if (x.isPinned) pinnedCount++;
        expect(pinnedCount).toBeGreaterThanOrEqual(1);
    } catch (e) {
        throw new Error(`API not working correctly`);
    }
});
