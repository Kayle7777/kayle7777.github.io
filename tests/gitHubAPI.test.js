const request = require('supertest');
const server = require('../server');

jest.setTimeout(30000);

test('github v3 repos', async () => {
    let gotData = await request(server)
        .get('/api/gitHub/')
        .expect(200);
    let failCount = 0;
    for (let x of gotData.body.repos) {
        if (!x.readme_url) failCount++;
    }
    // console.log(gotData.body);
    expect(gotData.body.repos.length).toBeGreaterThan(1);
    expect(failCount).toBeLessThan(15);
});

test('github v4 repos', async () => {
    let gotData = await request(server)
        .post('/api/gitHub/graphql')
        .expect(200);
    console.log(gotData.body.data.viewer.repositories);
});
