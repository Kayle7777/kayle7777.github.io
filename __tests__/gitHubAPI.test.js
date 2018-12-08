const gitHubGet = require('../controllers/gitHubGet');

test('getAllRepoData worked', async () => {
    let data = await gitHubGet.getAllRepoData();
    expect(data.repos.length).toBeGreaterThan(5);
});
