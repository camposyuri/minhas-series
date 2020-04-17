import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header/';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Generos from './components/Generos';
import NovoGenero from './components/NovoGenero/';
import EditarGenero from './components/EditarGenero';


const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/api').then(res => {
      setData(res.data);
    });
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generos" component={Generos} />
          <Route path="/novo-genero" component={NovoGenero} />
          <Route path="/editar-generos/:id" component={EditarGenero} />
        </Switch>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
}

export default App;
