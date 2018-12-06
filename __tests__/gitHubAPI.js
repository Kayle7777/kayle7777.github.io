const gitHubGet = require('../controllers/gitHubGet');

test('should show me what this returns', async () => {
    let data = await gitHubGet.getAllRepoData();
    console.log(data);
});
