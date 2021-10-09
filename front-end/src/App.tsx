import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import CompanySimilarities from './views/CompanySimilarities';
import NavBar from './components/NavBar';
import Home from './views/Home';
import DogBreeds from './views/DogBreeds';
import About from './views/About';
import { Box, makeStyles } from '@material-ui/core';
import Result from './views/Result';
import NotFound from './views/NotFound';
import AddUseCase from './views/AddUseCase';
import './App.css'
import CustomUseCaseRunner from './views/CustomUseCase';
import { SnackbarProvider } from 'notistack';
import UseCaseDetail from './views/CustomUseCase/InnerPage';

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      marginLeft: 250,
      marginTop: 50
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 50
    }
  }
}));
const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <SnackbarProvider dense maxSnack={3}>
        <Router history={history}>
          <NavBar />
          <Box className={classes.content}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/dogs" component={DogBreeds} />
              <Route exact path="/companies" component={CompanySimilarities} />
              <Route exact path="/about" component={About} />
              <Route exact path="/result" component={Result} />
              <Route exact path="/add" component={AddUseCase} />
              <Route exact path="/customUseCase" component={CustomUseCaseRunner} />
              <Route exact path="/customUseCase/:usecaseName" component={UseCaseDetail} />
              <Route component={NotFound} />
            </Switch>
          </Box>
        </Router>
      </SnackbarProvider>

    </React.Fragment>
  );
};

export default App;
