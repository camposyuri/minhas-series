import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

// import { Container } from './styles';

const EditarGenero = ({ match }) => {
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  // Carregar os dados para editar
  useEffect(() => {
    axios.get('/api/genres/' + match.params.id).then(res => {
      setName(res.data.name);
    });
  }, [match.params.id]);

  // Pegando o valor do meu input
  const onChange = (evt) => {
    setName(evt.target.value);
  }

  // Editando meu genêro pelo ID e salvando
  const save = () => {
    axios.put('/api/genres/' + match.params.id, {
      name
    }).then(res => {
      setSuccess(true);
    })
  }

  if (success) {
    return <Redirect to="/generos" />
  }

  return (
    <>
      <div className="container">
        <h1>Editar Genêro</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" value={name} onChange={onChange} className="form-control" id="name" placeholder="Nome do genêro" />
          </div>
          <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
        </form>
      </div>
    </>
  );
}

export default EditarGenero;