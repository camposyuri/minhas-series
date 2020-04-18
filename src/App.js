import React from 'react';
import Header from './components/Header/';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Generos from './components/Generos';
import NovoGenero from './components/NovoGenero/';
import EditarGenero from './components/EditarGenero';
import Series from './components/Series';
import NovaSerie from './components/NovaSerie';
import InfoSerie from './components/InfoSerie';


const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/generos" component={Generos} />
        <Route path="/novo-genero" component={NovoGenero} />
        <Route path="/editar-generos/:id" component={EditarGenero} />
        <Route path="/series" component={Series} />
        <Route path="/nova-serie" component={NovaSerie} />
        <Route path="/info-serie/:id" component={InfoSerie} />
      </Switch>
    </Router>
  );
}

export default App;
