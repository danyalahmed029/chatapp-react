import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Header from '../Layout/Header';
import ChatBox from './ChatBox';
import Users from './Users';

const useStyles = makeStyles(theme => ({
    paper: {
        minHeight: 'calc(100vh - 64px)',
        borderRadius: 0,
    },
    sidebar: {
        zIndex: 8,
    },
    subheader: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    globe: {
        backgroundColor: theme.palette.grey,
    },
    subheaderText: {
        color: theme.palette.grey,
    },
}));

const Chat = () => {
    const [scope, setScope] = useState('Global Chat');
    const [tab, setTab] = useState(0);
    const [user, setUser] = useState(null);
    const classes = useStyles();

    const handleChange = (e, newVal) => {
        setTab(newVal);
    };

    return (
        <React.Fragment>
            <Header />
            <Grid container>
            <Grid item md={8}>
                    <ChatBox scope={scope} user={user} />
                </Grid>
                <Grid item md={4} className={classes.sidebar}>
                    <Paper className={classes.paper} square elevation={5}>
                        <Paper square>
                            <Tabs
                                onChange={handleChange}
                                variant="fullWidth"
                                value={tab}
                                indicatorColor="primary"
                                textColor="primary"
                            >
                                <Tab label="Users" />
                            </Tabs>
                        </Paper>
                            <Users setUser={setUser} setScope={setScope} />
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Chat;
