const { graphql, ownerSchema, repoSchema, pinnedRepoSchema } = require('./graphql');

module.exports = {
    // new github v4 API, using graphQL
    // when express hits /api/gitHub/graphql
    graphQLgitData: async (req, res) => {
        try {
            let [repos, owner, pinnedRepos] = await Promise.all([
                graphql(repoSchema),
                graphql(ownerSchema),
                graphql(pinnedRepoSchema),
            ]);
            repos.data.viewer.repositories.nodes = repos.data.viewer.repositories.nodes.filter(e => {
                let pinnedFilter = pinnedRepos.data.viewer.pinnedRepositories.edges.map(each => each.node.name);
                return !pinnedFilter.includes(e.name);
            });
            pinnedRepos = pinnedRepos.data.viewer.pinnedRepositories.edges.map(e => {
                e.node['isPinned'] = true;
                return e.node;
            });
            repos.data.viewer.repositories.nodes.unshift(...pinnedRepos.reverse());
            // Correctly set the state to OBJECT owner, ARRAY repos, ARRAY pinnedRepos
            let finalData = {
                owner: owner.data.viewer,
                repos: repos.data.viewer.repositories.nodes,
            };
            res.send(finalData);
        } catch (err) {
            console.log(`Man, you still don't get it!!\n\n${err}`);
        }
    },
};
