import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="spinner" />
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }
}

export default Loading;
