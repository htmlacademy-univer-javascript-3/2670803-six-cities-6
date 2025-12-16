import { FC, useState, FormEvent, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/Store';
import Spinner from '../../components/spinner/spinner';
import { login } from '../../components/Store/user/user-thunks';
import { AuthorizationStatus } from '../../api/types/auth';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../components/Store';

const selectLoginData = createSelector(
  (state: RootState) => state.user.authorizationStatus,
  (state: RootState) => state.offer.error,
  (authorizationStatus, error) => ({ authorizationStatus, error })
);

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { authorizationStatus, error } = useAppSelector(selectLoginData);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>('');

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const validateForm = useCallback((): boolean => {
    let errorMsg = '';

    if (!email.trim()) {
      errorMsg = 'Please enter email';
    } else if (!password.trim()) {
      errorMsg = 'Please enter password';
    } else if (password.includes(' ')) {
      errorMsg = 'Password shouldn`t contain spaces';
    } else if (!/^(?=.*[A-Za-z])(?=.*\d).+$/.test(password)) {
      errorMsg = 'Password must contain at least one letter and one number';
    }

    setFormError(errorMsg);
    return !errorMsg;
  }, [email, password]);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    dispatch(login({ email: email.trim(), password: password.trim() }))
      .unwrap()
      .catch(() => {
        setFormError('Login failed. Please try again.');
      })
      .finally(() => setIsSubmitting(false));
  }, [dispatch, email, password, validateForm]);

  if (isSubmitting) {
    return <Spinner text="Signing in..." />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            {formError && (
              <div className="login__error" style={{
                color: '#5a0000ff',
                backgroundColor: '#ffe6e6',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px',
                textAlign: 'center'
              }}
              >
                <p>{formError}</p>
              </div>
            )}
            <form className="login__form form" onSubmit={(e) => void handleSubmit(e)}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
