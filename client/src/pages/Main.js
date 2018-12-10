import React, { useState, useEffect } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { List, Typography, Grid } from '@material-ui/core';
import RepoPanelItem from '../components/RepoPanelItem';
import axios from 'axios';
import Frame from '../components/Frame';

const styles = theme => ({
    toolbar: theme.mixins.toolbar,
});

const Main = props => {
    const [gitData, setRepos] = useState({ owner: {}, repos: [] });
    const [selectedRepo, selectRepo] = useState(null);

    const fetchData = async () => {
        const url = 'http://localhost:3001';
        const result = await axios.post(`${url}/api/gitHub/graphql`);
        console.log(result);
        setRepos({ owner: result.data.data.viewer, repos: result.data.data.viewer.repositories.nodes });
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
