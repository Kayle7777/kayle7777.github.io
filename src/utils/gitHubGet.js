import axios from 'axios';

const readme = url => `https://raw.githubusercontent.com/${url.replace(/^.*\.com\//, '')}/master/README.md`;
const tryReadme = async url => {
    try {
        let data = await axios.get(readme(url));
        return { url: url, data: data.data };
    } catch (err) {
        return { url: null, data: null };
    }
};

export default {
    // old github v3 API
    // when express hits /api/gitHub/
    getAllRepoData: async (req, res) => {
        try {
            const jw = 'https://api.github.com/users/kayle7777';
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
            let readmes = await Promise.all(data.map(e => tryReadme(e.url)));
            for (let i in data) {
                data[i]['readme_url'] = readmes[i].url;
                data[i]['readme'] = readmes[i].data;
            }
            return {
                owner: owner,
                repos: data,
            };
        } catch (err) {
            return err;
        }
    },
    // new github v4 API, using graphQL
    // when express hits /api/gitHub/graphql
    graphql: async schema => {
        const axiosGitHubGraphQL = axios.create({
            baseURL: 'https://api.github.com/graphql',
            headers: {
                Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
            },
        });
        try {
            const result = await axiosGitHubGraphQL({
                url: '',
                method: 'post',
                data: {
                    // This really should be in a separate .gql file
                    query: schema,
                },
            });
            return result.data;
        } catch (err) {
            console.log(err);
        }
    },
    repoSchema: `{
        viewer {
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
    pinnedRepoSchema: `{
        viewer {
            pinnedRepositories(last: 4) {
                edges {
                    node {
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
        }
    }`,
    ownerSchema: `{
        viewer {
            bio
            createdAt
            email
            isHireable
            login
            location
            name
            url
            updatedAt
            company
        }
    }`,
};
