import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import RepoPanelItem from '../components/RepoPanelItem';
import Frame from '../components/Frame';
import ReadmePanel from '../components/ReadmePanel';
import InfoPanel from '../components/InfoPanel';
import API from '../utils/gitHubGet';
const { graphql, repoSchema, pinnedRepoSchema, ownerSchema } = API;

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
});

const Main = props => {
    const [selectedRepo, selectRepo] = useState(null);
    const [gitData, setRepos] = useState({ owner: {}, repos: [] });

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
            setRepos(finalData);
            sessionStorage.setItem('apiData', JSON.stringify(finalData));
            return pickInitialRepo(finalData.repos);
        } else {
            cached = JSON.parse(cached);
            setRepos(cached);
            return pickInitialRepo(cached.repos);
        }
    };

    useEffect(() => {
        fetchData();
    }, gitData);

    return (
        <Frame name={gitData.owner.name} home={() => pickInitialRepo(gitData.repos)}>
            <List className={props.classes.toolbar}>
                {gitData.repos.map((repoData, index) => {
                    return (
                        <RepoPanelItem
                            selectedRepo={selectedRepo}
                            selectRepo={selectRepo}
                            name={repoData.name}
                            index={index}
                            key={repoData.id}
                            pinned={repoData.isPinned}
                        />
                    );
                })}
            </List>
            {gitData.repos[selectedRepo] && <InfoPanel owner={gitData.owner} repo={gitData.repos[selectedRepo]} />}
            {gitData.repos[selectedRepo] && (
                <ReadmePanel
                    topics={gitData.repos[selectedRepo].repositoryTopics.edges.map(each => each.node.topic.name)}
                    readme={gitData.repos[selectedRepo].readme}
                />
            )}
        </Frame>
    );
};

export default withStyles(styles, { withTheme: true })(Main);
