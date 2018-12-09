import React, { useState, useEffect } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import RepoPanel from '../components/RepoPanel';
import axios from 'axios';

const Main = () => {
    const [gitData, setRepos] = useState({ owner: {}, repos: [] });
    const [selectedRepo, selectRepo] = useState(0);

    const fetchData = async () => {
        const url = 'http://localhost:3001';
        const result = await axios(`${url}/api/gitHub/`);
        setRepos(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid container>
            <Grid item md={4}>
                {!gitData
                    ? 'Loading...'
                    : [0, 1, 2, 3, 4].map(e => {
                          return <RepoPanel />;
                      })}
            </Grid>
            <Grid item md={8}>
                placeholder
            </Grid>
        </Grid>
    );
};

export default withStyles({}, { withTheme: true })(Main);
