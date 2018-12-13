import axios from 'axios';

export default {
    // new github v4 API, using graphQL
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
                    repositoryTopics(last: 4) {
                        edges {
                            node {
                                topic {
                                    name
                                }
                            }
                        }
                    }
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
                        repositoryTopics(last: 4) {
                            edges {
                                node {
                                    topic {
                                        name
                                    }
                                }
                            }
                        }
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
