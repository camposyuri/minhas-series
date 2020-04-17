import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

const Generos = () => {
  const [data, setData] = useState([]);

  // Listando minha API
  useEffect(() => {
    axios.get('/api/genres').then(res => {
      setData(res.data.data);
    });
  }, []);

  // Função de Delete e filtrando os valores que não foram deletados
  const deleteGenero = (id) => {
    axios.delete('/api/genres/' + id).then(res => {
      const filtrado = data.filter(item => item.id !== id);
      setData(filtrado);
    })
  }

  const renderizaLinha = (record) => {
    //[{"id":1,"name":"Ação"},{"id":2,"name":"Comédia"}]
    // Está modificando esse Array e retornando ele em <tr>
    return (
      <tr key={record.id}>
        <th scope="row">{record.id}</th>
        <td>{record.name}</td>
        {/* Criei uma função que quando clicar vai chamar o deleteGenero e vai passar o id como parametro */}
        <td>
          <button className="btn btn-danger mr-3" onClick={() => deleteGenero(record.id)}>Remover</button>
          <Link className="btn btn-warning" to={'/editar-generos/' + record.id}>Editar</Link>
        </td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      <div className="container">
        <h1>Genêros</h1>
        <Link className="btn btn-primary my-2" to="/novo-genero">Novo genêro</Link>
        <div className="alert alert-warning" role="alert">
          Você não possui genêros criados
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h1>Genêros</h1>
        <Link className="btn btn-primary my-2" to="/novo-genero">Novo genêro</Link>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NOME</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map(renderizaLinha)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Generos;