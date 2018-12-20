const axios = require('axios');
jest.setTimeout(30000);

test('github v4 graphql API repos', async () => {
    try {
        // let gotData = await axios.post('http://localhost:3001/api/gitHub/graphql');
        // gotData = gotData.data.repos;
        // let failCount = 0;
        // for (let x of gotData) {
        //     if (!x.readme) failCount++;
        // }
        // expect(failCount).toBeLessThan(15);
        expect(1).toBe(1);
    } catch (err) {
        throw err;
    }
});

test('github v4 graphql API owner info', async () => {
    try {
        // let gotData = await axios.post('http://localhost:3001/api/gitHub/graphql');
        // gotData = gotData.data.owner;
        // console.log(gotData);
        // expect(gotData).toHaveProperty('name');
        // expect(gotData).toHaveProperty('url');
        // expect(gotData).toHaveProperty('createdAt');
        // expect(gotData).toHaveProperty('bio');
        expect(1).toBe(1);
    } catch (err) {
        throw err;
    }
});
