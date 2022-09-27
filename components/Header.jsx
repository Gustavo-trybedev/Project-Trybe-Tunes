import { Link } from 'react-router-dom';
import { FaSearch,
  FaHeart,
  FaUserAlt,
  FaAddressCard,
  FaSignOutAlt,
} from 'react-icons/fa';
import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
state = {
  user: {},
};

async componentDidMount() {
  await this.getUserInfo();
}

getUserInfo = async () => {
  const user = await getUser();
  this.setState({ user });
}

render() {
  const { user } = this.state;
  const { name } = user;

  return (
    <header data-testid="header-component">
      { name ? (
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
            className="link"
          >
            <FaSearch />
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="link"
          >
            <FaHeart />
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="link"
          >
            <FaAddressCard />
          </Link>
          <section className="user-title">
            <h2
              data-testid="header-user-name"
              className="user-name"
            >
              <FaUserAlt />
              { name }
              <section>
                <FaSignOutAlt />
              </section>
            </h2>
          </section>
        </nav>
      ) : (
        <Loading />
      )}
    </header>
  );
}
}

export default Header;
