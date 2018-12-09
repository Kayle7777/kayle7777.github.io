const request = require('supertest');
const server = require('../server');

jest.setTimeout(30000);

test('enough repos have valid README files', async () => {
    let gotData = await request(server)
        .get('/api/gitHub/')
        .expect(200);
    let failCount = 0;
    for (let x of gotData.body.repos) {
        if (!x.readme_url) failCount++;
    }
    expect(gotData.body.repos.length).toBeGreaterThan(1);
    expect(failCount).toBeLessThan(15);
});
