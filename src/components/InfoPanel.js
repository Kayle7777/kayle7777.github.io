import React from 'react';
import { Card, CardContent, CardActions, CardHeader, CardMedia, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit / 2,
    },
    center: {
        margin: 'auto',
    },
    card: {
        width: '75%',
        marginBottom: theme.spacing.unit * 3,
    },
    header: {
        textAlign: 'center',
    },
    centerButtons: {
        display: 'flex',
        justifyContent: 'center',
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

const InfoPanel = ({ repo, owner, classes }) => {
    const topics = repo.repositoryTopics.edges;
    return (
        <Card className={`${classes.card} ${classes.center}`}>
            <CardHeader className={classes.header} title={repo.name} />
            <CardContent>{repo.description}</CardContent>
            <CardActions className={classes.centerButtons}>
                {topics.length > 0 && (
                    <>
                        <Typography variant="button">Tags: </Typography>
                        {topics.map(each => {
                            const topicName = each.node.topic.name;
                            return <Tag key={topicName.substr(0, 5) + '...'} classes={classes} topicName={topicName} />;
                        })}
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default withStyles(styles)(InfoPanel);
