import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import WelcomePage from './views/Welcome';
import NavBar from './components/NavBar';
import Home from './views/Home';
import DogBreeds from './views/DogBreeds';
import companies from './views/Companies';
import About from './views/About';
import Page from './components/Page';
const history = createBrowserHistory();
const App = () => {
  return (
    <React.Fragment>
      <Page title="KGNET">
        <Router history={history}>
          <NavBar />
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/dogs" component={DogBreeds} />
            <Route path="/companies" component={WelcomePage} />
            <Route path="/about" component={About} />
          </Switch>
        </Router>
      </Page>
    </React.Fragment>
  );
};

export default App;
