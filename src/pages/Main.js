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
        margin: theme.spacing.unit / 2,
    },
});

const Main = props => {
    const [selectedRepo, selectRepo] = useState(null);
    const [gitData, setRepos] = useState({ owner: {}, repos: [] });
    // const [selectedTheme, pickTheme] = useState('default');

    const pickInitialRepo = nodeList => {
        for (let i in nodeList) if (nodeList[i].name === 'kayle7777.github.io') return selectRepo(i);
    };

    const fetchData = async () => {
        let cached = sessionStorage.getItem('apiData');
        if (!cached) {
            let [repos, owner, pinnedRepos] = await Promise.all([
                graphql(repoSchema),
                graphql(ownerSchema),
                graphql(pinnedRepoSchema),
            ]);
            repos.data.viewer.repositories.nodes = repos.data.viewer.repositories.nodes.filter(e => {
                let pinnedFilter = pinnedRepos.data.viewer.pinnedRepositories.edges.map(each => each.node.name);
                return !pinnedFilter.includes(e.name);
            });
            pinnedRepos = pinnedRepos.data.viewer.pinnedRepositories.edges.map(e => e.node);
            repos.data.viewer.repositories.nodes.unshift(...pinnedRepos.reverse());
            // Correctly set the state to OBJECT owner, ARRAY repos, ARRAY pinnedRepos
            let finalData = {
                owner: owner.data.viewer,
                repos: repos.data.viewer.repositories.nodes,
            };
            setRepos(finalData);
            sessionStorage.setItem('apiData', JSON.stringify(finalData));
            pickInitialRepo(finalData.repos);
        } else {
            cached = JSON.parse(cached);
            setRepos(cached);
            pickInitialRepo(cached.repos);
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
                                name={repoData.name}
                                index={index}
                                key={repoData.id}
                            />
                        );
                    })}
                </List>
                {gitData.repos[selectedRepo] &&
                    gitData.repos[selectedRepo].repositoryTopics.edges.map(each => {
                        const topicName = each.node.topic.name;
                        return (
                            <Button
                                href={`https://github.com/topics/${topicName}`}
                                className={props.classes.button}
                                target="_blank"
                                rel="noreferrer noopener"
                                key={topicName.substr(0, 5) + '...'}>
                                {topicName}
                            </Button>
                        );
                    })}
                {gitData.repos[selectedRepo] && <MainPanel readme={gitData.repos[selectedRepo].readme} />}
            </Frame>
        </>
    );
};

export default withStyles(styles, { withTheme: true })(Main);
