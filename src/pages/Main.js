import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';
import RepoPanelItem from '../components/RepoPanelItem';
import Frame from '../components/Frame';
import ReadmePanel from '../components/ReadmePanel';
import InfoPanel from '../components/InfoPanel';
import { post as fetch } from 'axios';

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
});

const Main = props => {
    const [selectedRepo, selectRepo] = useState(null);
    const [gitData, setRepos] = useState({ owner: {}, repos: [] });
    const [theme, setTheme, selectTheme] = props.themeContext || ['default', () => {}, () => {}];
    const currentRepo = gitData.repos[selectedRepo];
    const topics = currentRepo ? currentRepo.repositoryTopics.edges.map(each => each.node.topic.name) : [];

    useEffect(() => {
        const cached = JSON.parse(sessionStorage.getItem('apiData'));
        if (cached && cached.owner.name) return setRepos(cached);
        else if (process.env.NODE_ENV === 'test') return setRepos(props.testData || { owner: {}, repos: [] });
        else
            fetchData().then(data => {
                sessionStorage.setItem('apiData', JSON.stringify(data));
                setRepos(data);
            });
    }, gitData);

    useEffect(() => pickHomeRepo(gitData.repos), [gitData.repos]);

    const pickedTheme = selectTheme(topics);
    useEffect(
        () => {
            if (pickedTheme === theme) return;
            else return setTheme(pickedTheme);
        },
        [currentRepo]
    );

    return (
        <Frame owner={gitData.owner} home={() => pickHomeRepo(gitData.repos)}>
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
            {currentRepo && <InfoPanel repo={currentRepo} />}
            {currentRepo && <ReadmePanel readme={currentRepo.readme} />}
        </Frame>
    );

    function pickHomeRepo(nodeList) {
        for (let i in nodeList) if (nodeList[i].name === 'kayle7777.github.io') return selectRepo(i);
    }

    async function fetchData() {
        try {
            let data = await fetch('https://kayle7777.herokuapp.com/api/gitHub/graphql');
            return data.data;
        } catch (err) {
            return { owner: {}, repos: [] };
        }
    }
};

export default withStyles(styles)(Main);
