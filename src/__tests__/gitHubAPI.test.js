jest.setTimeout(30000);

test('github v3 standard API repos', async () => {
    try {
        let gotData = await request(server)
            .get('/api/gitHub/')
            .expect(200);
        let failCount = 0;
        for (let x of gotData.body.repos) {
            if (!x.readme_url) failCount++;
        }
        expect(gotData.body.repos.length).toBeGreaterThan(1);
        expect(failCount).toBeLessThan(15);
    } catch (err) {
        throw err;
    }
});

test('github v4 graphql API repos', async () => {
    try {
        let gotData = await request(server)
            .post('/api/gitHub/graphql')
            .expect(200);
        let failCount = 0;
        // gotData.body.data.viewer.repositories.nodes;
        for (let x of gotData.body.data.viewer.repositories.nodes) {
            if (!x.readme) failCount++;
        }
        expect(failCount).toBeLessThan(15);
    } catch (err) {
        throw err;
    }
});
