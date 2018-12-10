import axios from 'axios';

const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`,
    },
});

export default {
    graphQLGitHub: async () => {
        try {
            const result = await axiosGitHubGraphQL({
                url: '',
                method: 'post',
                data: {
                    query: `
                query {
                viewer {
                  repositories(last:30,affiliations:[OWNER,COLLABORATOR,ORGANIZATION_MEMBER]) {
                    edges {
                      node {
                        name
                        owner {
                          login
                        }
                      }
                    }
                  }
                }
              }`,
                },
            });
            console.log(result);
        } catch (err) {
            throw err;
        }
    },
};
