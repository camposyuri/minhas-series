import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';
// import { Container } from './styles';

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
    name: ''
  });
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState('INFO');
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState('');

  // Carregar os dados para informar
  useEffect(() => {
    axios.get('/api/series/' + match.params.id).then(res => {
      setData(res.data);
      setForm(res.data);
    })
  }, [match.params.id]);

  useEffect(() => {
    axios.get('/api/genres').then(res => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const encontrado = genres.find(value => data.genre === value.name);
      if (encontrado) {
        setGenreId(encontrado.id);
      }
    });
  }, [data]);

  // Custom header
  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }

  const onChangeGenre = (evt) => {
    setGenreId(evt.target.value);
  }

  // Passando duas funções nele para alterar valores
  const onChange = (field) => (evt) => {
    setForm({
      ...form,
      [field]: evt.target.value
    });
  }

  const seleciona = (value) => () => {
    setForm({
      ...form,
      status: value
    });
  }

  // Criando meu novo genêro e salvando
  const save = () => {
    axios.put('/api/series/' + match.params.id, {
      ...form,
      genre_id: genreId
    }).then(res => {
      setSuccess(true);
    })
  }

  // Se o success for true redireciona para a página de séries
  if (success) {
    return <Redirect to="/series" />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: 'rgba(0,0,0,0.7)' }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img className="img-fluid" src={data.poster} alt={data.name} />
              </div>
              <div className="col-9">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  {data.status === 'ASSISTIDO' &&
                    <Badge color="success">Assistido</Badge>
                  }

                  {data.status === 'PARA_ASSISTIR' &&
                    <Badge color="warning">Para Assistir</Badge>
                  }
                  Genêro: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Quando clicar em editar vai mudar o value do meu STATE para EDIT e mostrar o meu form */}
      <div className="container">
        <button className="btn btn-primary" onClick={() => setMode('EDIT')}>Editar</button>
      </div>

      {/* Se meu MODE tiver um retorno true, ele vai mostrar o meu FORM SHORTCUT */}
      {
        mode === 'EDIT' &&
        <div className="container">
          <h1>Editar Séries</h1>
          {/* <pre>{JSON.stringify(form)}</pre> */}
          {/* Quando clicar em cancelar vai mudar o value do meu STATE para INFO e esconder o meu FORM */}
          <button className="btn btn-primary" onClick={() => setMode('INFO')}>Cancelar edição</button>
          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input type="text" value={form.name} onChange={onChange('name')} className="form-control" id="name" placeholder="Nome da série" />
            </div>

            <div className="form-group">
              <label htmlFor="comment">Comentários</label>
              <input type="text" value={form.comments} onChange={onChange('comments')} className="form-control" id="comment" placeholder="Digite seu comentário" />
            </div>

            <div className="form-group">
              <label htmlFor="generos">Genêro</label>
              <select className="form-control" id="generos" onChange={onChangeGenre} value={genreId}>
                {genres.map(genre =>
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>)
                }
              </select>
            </div>

            <div className="form-check">
              <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSISTIDO" checked={form.status === 'ASSISTIDO'} onChange={seleciona('ASSISTIDO')} />
              <label className="form-check-label" htmlFor="assistido">
                Assistido
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARA_ASSISTIR" checked={form.status === 'PARA_ASSISTIR'} onChange={seleciona('PARA_ASSISTIR')} />
              <label className="form-check-label" htmlFor="paraAssistir">
                Para assistir
              </label>
            </div>

            <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
          </form>
        </div>
      }
    </div>


  );
}

export default InfoSerie;