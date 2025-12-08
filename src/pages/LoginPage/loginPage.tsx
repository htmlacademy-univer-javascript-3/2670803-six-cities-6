import { FC, useState, FormEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../components/Store';
import { login } from '../../components/Store/api-actions';
import Spinner from '../../components/Spinner/Spinner';

const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const error = useAppSelector((state) => state.error);

  useEffect(() => {
    if (authorizationStatus === 'AUTH') {
      navigate('/');
    }
  }, [authorizationStatus, navigate]);

  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const validateForm = (): boolean => {
    setFormError('');

    if (!email.trim()) {
      setFormError('Please enter email');
      return false;
    }
    if (!password.trim()) {
      setFormError('Please enter password');
      return false;
    }
    if (password.includes(' ')) {
      setFormError('Password shouldn`t contain spaces');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await dispatch(login({
        email: email.trim(),
        password: password.trim()
      })).unwrap();
    } catch {
      if (!formError) {
        setFormError('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
