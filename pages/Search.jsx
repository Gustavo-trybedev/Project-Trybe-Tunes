import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  state = {
    searchTerm: '',
    isSearchButtonDisabled: true,
    isRequisitionDone: false,
    albuns: [],
    artist: '',
  };

validateArtistName = ({ target }) => {
  this.setState({
    searchTerm: target.value }, () => {
    const { searchTerm } = this.state;
    const searchMinLength = 2;
    const rule = searchTerm.length >= searchMinLength;
    this.setState({ isSearchButtonDisabled: !rule });
  });
};

searchArtist = () => {
  const { searchTerm } = this.state;
  this.setState({
    albuns: [],
    isSearchButtonDisabled: true,
  }, async () => {
    const albumsResponse = await searchAlbumsAPI(searchTerm);
    this.setState({
      albuns: albumsResponse,
      isRequisitionDone: false,
      artist: searchTerm,
      searchTerm: '',
    });
  });
}

render() {
  const {
    searchTerm,
    isSearchButtonDisabled,
    albuns,
    isRequisitionDone,
    artist,
  } = this.state;
  return (
    <section data-testid="page-search">
      <Header />
      {
        isRequisitionDone ? (
          <Loading />
        ) : (
          <form className="search-field">
            <section className="input-container">
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do artista"
                className="search-input"
                value={ searchTerm }
                onChange={ this.validateArtistName }
              />
            </section>

            <section className="button-container">
              <button
                type="button"
                data-testid="search-artist-button"
                className="search-btn"
                disabled={ isSearchButtonDisabled }
                onClick={ this.searchArtist }
              >
                Pesquisar
              </button>
            </section>
          </form>
        )
      }
      <section className="album-container">
        {
          (albuns.length === 0)
            ? <p className="error-message"> Nenhum álbum foi encontrado </p>
            : (
              <div>
                <ul className="album-list">
                  <p>{ `Resultado de álbuns de: ${artist}` }</p>

                  {
                    albuns.map(({
                      collectionId,
                      collectionName,
                      artworkUrl100,
                      collectionPrice,
                      releaseDate,
                      trackCount,
                    }) => (
                      <section className="album-card" key={ collectionId }>
                        <Link
                          to={ `/album/${collectionId}` }
                          data-testid={ `link-to-album-${collectionId}` }
                        >
                          { collectionName }
                        </Link>
                        <br />
                        <img src={ artworkUrl100 } alt={ collectionName } />
                        <li>
                          Ano de Lançamento:
                          { releaseDate }
                        </li>
                        <li>
                          Faixas:
                          { trackCount }
                        </li>
                        <li>
                          Preço:
                          R$
                          { collectionPrice }
                        </li>
                      </section>
                    ))
                  }
                </ul>
              </div>
            )
        }
      </section>
    </section>
  );
}
}

export default Search;
