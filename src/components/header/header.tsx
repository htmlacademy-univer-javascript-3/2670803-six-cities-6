import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../api/types/types';

interface HeaderProps {
  authorizationStatus: AuthorizationStatus;
  user: { email: string; avatarUrl?: string } | null;
  favoriteCount?: number;
  onSignOut?: () => void;
  hideAuthLinks?: boolean;
}

const Header: FC<HeaderProps> = ({ authorizationStatus, user, favoriteCount = 0, onSignOut, hideAuthLinks = false }) => {
  const handleSignOut = useCallback(() => {
    onSignOut?.();
  }, [onSignOut]);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          {!hideAuthLinks && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to="/favorites"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          {user.avatarUrl && (
                            <img
                              className="user__avatar"
                              src={user.avatarUrl}
                              alt={user.email}
                              width="20"
                              height="20"
                            />
                          )}
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                        {favoriteCount > 0 && (
                          <span className="header__favorite-count">{favoriteCount}</span>
                        )}
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
                  <li className="header__nav-item user">
                    <Link
                      className="header__nav-link header__nav-link--profile"
                      to="/login"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
