import React, { useState, useEffect } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { List, Typography, Grid } from '@material-ui/core';
import RepoPanelItem from '../components/RepoPanelItem';
import Frame from '../components/Frame';
import API from '../utils/gitHubGet';
const { graphql, repoSchema, pinnedRepoSchema, ownerSchema } = API;

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
});

const Main = props => {
    const [gitData, setRepos] = useState({ owner: {}, repos: [], pinnedRepos: [] });
    const [selectedRepo, selectRepo] = useState(null);

    const fetchData = async () => {
        // Implement localhost caching here once ready
        let repos = await graphql(repoSchema);
        let owner = await graphql(ownerSchema);
        let pinnedRepos = await graphql(pinnedRepoSchema);
        repos.data.viewer.repositories.nodes = repos.data.viewer.repositories.nodes.filter(e => {
            let test = pinnedRepos.data.viewer.pinnedRepositories.edges.map(each => each.node.name);
            return !test.includes(e.name);
        });
        pinnedRepos = pinnedRepos.data.viewer.pinnedRepositories.edges.map(e => e.node);

        // Correctly set the state to OBJECT owner, ARRAY repos, ARRAY pinnedRepos
        setRepos({ owner: owner.data.viewer, repos: repos.data.viewer.repositories.nodes, pinnedRepos: pinnedRepos });
    };

    useEffect(() => {
        fetchData();
    }, gitData);

    return (
        <>
            <Frame>
                <List className={props.classes.toolbar}>
                    {gitData.repos.map((repoData, index) => {
                        return (
                            <RepoPanelItem
                                selectedRepo={selectedRepo}
                                selectRepo={selectRepo}
                                repoData={repoData}
                                index={index}
                                key={repoData.id}
                            />
                        );
                    })}
                </List>
            </Frame>
            <Grid container>
                <Grid item md={2} />
                <Grid item>placeholder</Grid>
            </Grid>
        </>
    );
};

export default withStyles(styles, { withTheme: true })(Main);
