import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import WelcomePage from './views/Welcome';
import NavBar from './components/NavBar';
import Home from './views/Home';
import DogBreeds from './views/DogBreeds';
import companies from './views/Companies';
import About from './views/About';
import Page from './components/Page';
import { Box, makeStyles } from '@material-ui/core';
import Result from './views/Result';

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      marginLeft: 250,
      marginTop: 50
    }
  }
}));
const App = () => {
  const classes = useStyles();
  return (
    <Box>
      <Router history={history}>
        <NavBar />
        <Box className={classes.content}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dogs" component={DogBreeds} />
            <Route exact path="/companies" component={WelcomePage} />
            <Route exact path="/about" component={About} />
            <Route exact path="/result" component={Result} />
          </Switch>
        </Box>
      </Router>
    </Box>
  );
};

export default App;
