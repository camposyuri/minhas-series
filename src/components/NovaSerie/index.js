import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// import { Container } from './styles';

const NovaSerie = () => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  // Pegando o valor do meu input
  const onChange = (evt) => {
    setName(evt.target.value);
  }

  // Criando meu novo genêro e salvando
  const save = () => {
    axios.post('/api/series', {
      name
    }).then(res => {
      setSuccess(true);
    })
  }

  if (success) {
    return <Redirect to="/series" />
  }

  return (
    <>
      <div className="container">
        <h1>Nova Séries</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome da série" />
          </div>
          <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
        </form>
      </div>
    </>
  );
}

export default NovaSerie;