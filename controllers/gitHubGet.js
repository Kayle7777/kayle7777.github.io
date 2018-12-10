const axios = require('axios');

const jw = 'https://api.github.com/users/kayle7777';

const readme = url => `https://raw.githubusercontent.com/${url.replace(/^.*\.com\//, '')}/master/README.md`;
const tryReadme = async url => {
    try {
        let data = await axios.get(readme(url));
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
                    topics: gitObj.topics,
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
    graphQLgitData: async (req, res) => {
        const axiosGitHubGraphQL = axios.create({
            baseURL: 'https://api.github.com/graphql',
            headers: {
                Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
            },
        });
        try {
            const result = await axiosGitHubGraphQL({
                url: '',
                method: 'post',
                data: {
                    query: `{
                        viewer {
                            name
                            repositories(last: 30) {
                                nodes {
                                    name
                                    createdAt
                                    updatedAt
                                    pushedAt
                                    description
                                    id
                                    url
                                    readme: object(expression: "master:README.md") {
                                        ... on Blob {
                                            text
                                        }
                                    }
                                }
                            }
                        }
                    }`,
                },
            });
            res.send(result.data);
        } catch (err) {
            throw err;
        }
    },
};
