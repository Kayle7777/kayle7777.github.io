const axios = require('axios');

const jw = 'https://api.github.com/users/kayle7777';

module.exports = {
    getAllRepoData: async (req, res) => {
        try {
            let data = await axios.get(`${jw}/repos?sort=updated`);
            const owner = data.data[0].owner;
            data = data.data.map(gitObj => {
                return {
                    id: gitObj.id,
                    name: gitObj.name,
                    url: gitObj.html_url,
                    createdAt: gitObj.created_at,
                    updatedAt: gitObj.updated_at,
                    description: gitObj.description,
                };
            });
            res.send({
                owner: owner,
                repos: data,
            });
        } catch (err) {
            res.send(err);
        }
    },
};
