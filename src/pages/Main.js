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
        let gqlData = await Promise.all([graphql(repoSchema), graphql(ownerSchema), graphql(pinnedRepoSchema)]);
        gqlData[0].data.viewer.repositories.nodes = gqlData[0].data.viewer.repositories.nodes.filter(e => {
            let test = gqlData[2].data.viewer.pinnedRepositories.edges.map(each => each.node.name);
            return !test.includes(e.name);
        });
        gqlData[2] = gqlData[2].data.viewer.pinnedRepositories.edges.map(e => e.node);

        // Correctly set the state to OBJECT owner, ARRAY repos, ARRAY pinnedRepos
        setRepos({
            owner: gqlData[1].data.viewer,
            repos: gqlData[0].data.viewer.repositories.nodes,
            pinnedRepos: gqlData[2],
        });
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
