import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
state = {
  checked: false,
  loading: false,
  favSongs: [],
}

componentDidMount = async () => {
  this.setState({ loading: true });
  const favoriteSongs = await getFavoriteSongs();
  this.setState({ favSongs: favoriteSongs });
  const { favSongs } = this.state;
  const { trackId } = this.props;
  const checkedFav = favSongs.some((song) => song.trackId === trackId);
  this.setState({ loading: false, checked: checkedFav });
}

saveFavoriteMusics = async () => {
  const { checked } = this.state;
  const { music } = this.props;
  console.log({ music });
  this.setState({ loading: true });
  if (checked === false) {
    await addSong({ music });
  }
  if (checked === true) {
    await removeSong({ music });
  }
  this.setState({ loading: false, checked: !checked });
}

render() {
  const { trackName, previewUrl, trackId } = this.props;
  const { checked, loading } = this.state;

  return (

    <section className="music-card">
      {
        loading ? <Loading /> : (
          <section>

            <p>{trackName}</p>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ `checkbox-music-${trackId}` }>
              Adicionar aos favoritos
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id={ `checkbox-music-${trackId}` }
                name={ trackId }
                type="checkbox"
                checked={ checked }
                onChange={ this.saveFavoriteMusics }
              />
            </label>

          </section>

        )
      }
    </section>

  );
}
}

export default MusicCard;

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.string.isRequired,
};
