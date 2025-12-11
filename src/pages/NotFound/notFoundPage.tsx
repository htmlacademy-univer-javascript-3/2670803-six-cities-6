import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './notFoundPage.module.css';

interface NotFoundPageProps {
  authorizationStatus: 'AUTH' | 'NO_AUTH' | 'UNKNOWN';
  user: { email: string; avatarUrl?: string } | null;
  handleSignOut: () => void;
}

const NotFoundPage: FC<NotFoundPageProps> = ({ authorizationStatus, user, handleSignOut }) => (
  <div className="page">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === 'AUTH' && user ? (
                <>
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to="/profile">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                        {user.avatarUrl && <img className="user__avatar" src={user.avatarUrl} alt="Avatar" />}
                      </div>
                      <span className="header__user-name user__name">{user.email}</span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <span
                      className="header__nav-link"
                      style={{ cursor: 'pointer' }}
                      onClick={handleSignOut}
                    >
                      <span className="header__signout">Sign out</span>
                    </span>
                  </li>
                </>
              ) : (
                <li className="header__nav-item">
                  <Link className="header__nav-link" to="/login">
                    <span className="header__signout">Login</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className={styles.pageMain}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Упс! Страница не найдена</p>
      <Link className={styles.button} to="/">Вернуться на главную</Link>
    </main>

    <footer className="footer container">
      <Link className='footer__logo-link' to="/">
        <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
      </Link>
    </footer>
  </div>
);

export default NotFoundPage;
