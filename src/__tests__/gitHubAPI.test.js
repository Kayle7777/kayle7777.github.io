import gitHubAPI from '../utils/gitHubGet';
const { graphql, repoSchema, ownerSchema, pinnedRepoSchema } = gitHubAPI;
jest.setTimeout(30000);

test('github v3 standard API repos', async () => {
    try {
        let gotData = await gitHubAPI.getAllRepoData();
        let failCount = 0;
        gotData = gotData.repos;
        for (let x of gotData) {
            if (!x.readme_url) failCount++;
        }
        expect(gotData.length).toBeGreaterThan(1);
        expect(failCount).toBeLessThan(15);
    } catch (err) {
        throw err;
    }
});

test('github v4 graphql API repos', async () => {
    try {
        let gotData = await graphql(repoSchema);
        let failCount = 0;
        for (let x of gotData.data.viewer.repositories.nodes) {
            if (!x.readme) failCount++;
        }
        expect(failCount).toBeLessThan(15);
    } catch (err) {
        throw err;
    }
});

test('github v4 graphql API owner info', async () => {
    try {
        let gotData = await graphql(ownerSchema);
        expect(gotData.data.viewer).toHaveProperty('name');
        expect(gotData.data.viewer).toHaveProperty('url');
        expect(gotData.data.viewer).toHaveProperty('createdAt');
        expect(gotData.data.viewer).toHaveProperty('bio');
    } catch (err) {
        throw err;
    }
});

test('github v4 graphql API pinnedRepo info', async () => {
    try {
        let gotData = await graphql(pinnedRepoSchema);
        expect(gotData.data.viewer.pinnedRepositories.edges.length).toBeGreaterThanOrEqual(2);
    } catch (err) {
        throw err;
    }
});
