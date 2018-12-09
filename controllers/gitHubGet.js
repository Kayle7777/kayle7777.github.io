const axios = require('axios');

const jw = 'https://api.github.com/users/kayle7777';

let tryReadme = async url => {
    try {
        url = url.replace(/^.*(Kayle7777.*)/, (_m, g) => g);
        url = `https://raw.githubusercontent.com/${url}/master/README.md`;
        let data = await axios.get(url);
        return { url: url, data: data.data };
    } catch (err) {
        return { url: null, data: null };
    }
};

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
            for (let i in data) {
                let res = await tryReadme(data[i].url);
                data[i]['readme_url'] = res.url;
                data[i]['readme'] = res.data;
            }
            res.json({
                owner: owner,
                repos: data,
            });
            console.log(`Sent data, including owner info and ${data.length} code repo information packets.`);
        } catch (err) {
            res.send(err);
        }
    },
};
