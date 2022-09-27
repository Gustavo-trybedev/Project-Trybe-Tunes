import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
state = {
  musics: [],
  artist: '',
  album: '',
  imgUrl: '',
}

async componentDidMount() {
  const { match: { params: { id } } } = this.props;
  const musicResponse = await getMusics(id);
  this.setState({
    musics: musicResponse,
    artist: musicResponse[0].artistName,
    album: musicResponse[0].collectionName,
    imgUrl: musicResponse[0].artworkUrl100,
  });
}

render() {
  const { musics, artist, album, imgUrl } = this.state;
  const filteredMusics = musics.filter((music) => music.kind === 'song');
  return (
    <div data-testid="page-album">
      <Header />
      <section className="music-card-container">
        <section className="album-info">
          <img
            src={ imgUrl }
            alt={ album }
            className="album-cover"
          />
          <p data-testid="artist-name">
            Artista:
            { artist }
          </p>
          <p data-testid="album-name">
            Album:
            { album }
          </p>
        </section>
        <section>
          { musics.length > 0 && (
            filteredMusics.map(({ trackName, previewUrl, trackId }) => (
              <MusicCard
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
                key={ trackId }
                music={ musics }
              />
            ))
          )}
        </section>
      </section>
    </div>
  );
}
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
