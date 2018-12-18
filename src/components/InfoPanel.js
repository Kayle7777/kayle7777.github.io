import React, { useState, useEffect, useContext } from 'react';
import { CardContent, CardActions, CardHeader, Button, Typography, Collapse } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit / 2,
    },
    center: {
        margin: 'auto',
    },
    centerButtons: {
        display: 'flex',
        justifyContent: 'center',
    },
    centerText: {
        textAlign: 'center',
    },
    arrow: {
        fontSize: '2.5rem',
        transform: 'rotate(0deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    },
    arrowShift: {
        fontSize: '2.5rem',
        transform: 'rotate(180deg)',
        transition: theme.transitions.create(['transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.complex,
        }),
    },
});

const Tag = ({ classes, topicName }) => (
    <Button
        href={`https://github.com/topics/${topicName}`}
        className={classes.button}
        target="_blank"
        rel="noreferrer noopener">
        {topicName}
    </Button>
);

const InfoPanel = props => {
    //eslint-disable-next-line
    const { repo, owner, classes } = props;
    const topics = repo.repositoryTopics.edges;
    const [panelIn, togglePanel] = useState(true);
    useEffect(() => togglePanel(true), [props]);
    return (
        <>
            <Button fullWidth onClick={() => togglePanel(!panelIn)}>
                <Typography variant="button" className={classes.centerText}>
                    <KeyboardArrowUp className={panelIn ? classes.arrow : classes.arrowShift} />
                </Typography>
            </Button>
            <Collapse in={panelIn}>
                <div className={classes.center}>
                    <CardHeader className={classes.centerText} title={repo.name} />
                    <CardContent>
                        <Typography align="center" variant="overline">
                            {repo.description}
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.centerButtons}>
                        {topics.length > 0 && (
                            <>
                                <Typography variant="button">Tags: </Typography>
                                {topics.map(each => {
                                    const topicName = each.node.topic.name;
                                    return (
                                        <Tag
                                            key={topicName.substr(0, 5) + Math.floor(Math.random() * 1000) + '...'}
                                            classes={classes}
                                            topicName={topicName}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </CardActions>
                </div>
            </Collapse>
        </>
    );
};

export default withStyles(styles, { withTheme: true })(InfoPanel);
