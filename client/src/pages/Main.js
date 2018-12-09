import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
    const [gitData, setRepos] = useState({ owner: {}, repos: [] });

    const fetchData = async () => {
        const url = 'http://localhost:3001';
        const result = await axios(`${url}/api/gitHub/`);
        setRepos(result.data);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <div>placeholder</div>
        </>
    );
};

export default Main;
