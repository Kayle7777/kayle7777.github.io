import gitHubAPI from '../utils/gitHubGet';

jest.setTimeout(30000);

test('github v3 standard API repos', async () => {
    try {
        let gotData = await gitHubAPI.getAllRepoData();
        let failCount = 0;
        for (let x of gotData.repos) {
            if (!x.readme_url) failCount++;
        }
        expect(gotData.repos.length).toBeGreaterThan(1);
        expect(failCount).toBeLessThan(15);
    } catch (err) {
        throw err;
    }
});

test('github v4 graphql API repos', async () => {
    try {
        let gotData = await gitHubAPI.graphQLgitData();
        let failCount = 0;
        for (let x of gotData.data.viewer.repositories.nodes) {
            if (!x.readme) failCount++;
        }
        expect(failCount).toBeLessThan(15);
    } catch (err) {
        throw err;
    }
});
