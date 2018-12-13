import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, Button } from '@material-ui/core';
import RepoPanelItem from '../components/RepoPanelItem';
import Frame from '../components/Frame';
import MainPanel from '../components/MainPanel';
import API from '../utils/gitHubGet';
const { graphql, repoSchema, pinnedRepoSchema, ownerSchema } = API;

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    button: {
        margin: theme.spacing.unit,
    },
});

const Main = props => {
    const [gitData, setRepos] = useState({ owner: {}, repos: [], pinnedRepos: [] });
    const [selectedRepo, selectRepo] = useState(null);
    // const [selectedTheme, pickTheme] = useState('default');

    const fetchData = async () => {
        // Implement localhost caching here once ready
        let [repos, owner, pinnedRepos] = await Promise.all([
            graphql(repoSchema),
            graphql(ownerSchema),
            graphql(pinnedRepoSchema),
        ]);
        repos.data.viewer.repositories.nodes = repos.data.viewer.repositories.nodes.filter(e => {
            let test = pinnedRepos.data.viewer.pinnedRepositories.edges.map(each => each.node.name);
            return !test.includes(e.name);
        });
        pinnedRepos = pinnedRepos.data.viewer.pinnedRepositories.edges.map(e => e.node);
        repos.data.viewer.repositories.nodes.unshift(...pinnedRepos.reverse());
        // Correctly set the state to OBJECT owner, ARRAY repos, ARRAY pinnedRepos
        setRepos({
            owner: owner.data.viewer,
            repos: repos.data.viewer.repositories.nodes,
            pinnedRepos: pinnedRepos,
        });
        for (let i in repos.data.viewer.repositories.nodes) {
            if (repos.data.viewer.repositories.nodes[i].name === 'kayle7777.github.io') selectRepo(i);
        }
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
                {gitData.repos[selectedRepo] &&
                    gitData.repos[selectedRepo].repositoryTopics.edges.map(e => {
                        return (
                            <Button
                                href={`https://github.com/topics/${e.node.topic.name}`}
                                className={props.classes.button}
                                target="_blank"
                                rel="noreferrer noopener"
                                key={e.node.topic.name.substr(0, 5) + '...'}
                            >
                                {e.node.topic.name}
                            </Button>
                        );
                    })}
                {gitData.repos[selectedRepo] && <MainPanel readme={gitData.repos[selectedRepo].readme} />}
            </Frame>
        </>
    );
};

export default withStyles(styles, { withTheme: true })(Main);
