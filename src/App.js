import React from 'react';
import Search from './Search';
import Entry from './Entry';
import Home from './Home';
import Login from './Login';
import Upload from './Upload';
import { UserProvider } from './UserContext';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import './App.css';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.grey[200],
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  toolbarLink: {
    margin: theme.spacing(0, 1.5),
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[300],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(10, 0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

export default function App() {
  const classes = useStyles();
  
  return (
    <UserProvider>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              <Link href="/" color="inherit">
                Home
              </Link>
            </Typography>
            <Link href="/search" className={classes.toolbarLink}>
              SEARCH
            </Link>
            <Login />
          </Toolbar>
        </AppBar>
        <BrowserRouter>
          <Switch>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/article/:reponame/">
              <Entry />
            </Route>
            <Route path="/upload">
              <Upload />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    </UserProvider>
  );
}

//  children={<Articles />}