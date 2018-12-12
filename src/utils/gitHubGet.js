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
            repositories(last: 30, orderBy: {field: UPDATED_AT, direction: DESC}) {
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
