import React, { Suspense, lazy } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { PokemonProvider } from './PokemonContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./pages/home'));
const Detail = lazy(() => import('./pages/detail'));
const PokeDex = lazy(() => import('./pages/pokedex'));

const App = () => (
  <PokemonProvider>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Container>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/detail/:id" component={Detail}/>
            <Route path="/pokedex" component={PokeDex}/>
          </Switch>
        </Container>
      </Suspense>
    </Router>
  </PokemonProvider>
);

export default App;