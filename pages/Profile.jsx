import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state ={
    isRequisitionDone: false,
    user: {},
  }

  getUserInfo = async () => {
    this.setState({ isRequisitionDone: true }, async () => {
      const user = await getUser();
      this.setState({ user, isRequisitionDone: false });
    });
  }

  render() {
    const { isRequisitionDone, user } = this.state;
    const { name, image, description, email } = user;
    return (
      <div>
        { isRequisitionDone ? (
          <Loading />
        ) : (
          <div data-testid="page-profile">
            <Header />
            <form>
              <div className="profile-image">
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt={ name }
                />
              </div>
              <Link to="/profile/edit">
                <button
                  type="button"
                  data-testid="login-submit-button"
                  className="button is-success is-small"
                >
                  Editar perfil
                </button>
              </Link>
              <div className="profile-name">
                <p>
                  Nome:
                  { name }
                </p>
              </div>
              <div className="profile-email">
                <p>
                  Email:
                  { email }
                </p>
              </div>
              <div className="profile-description">
                <p>
                  Descrição:
                  { description }
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
