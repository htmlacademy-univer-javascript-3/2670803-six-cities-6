import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './not-found-page.module.css';
import { AuthorizationStatus } from '../../api/types/types';
import { MemoizedHeader } from '../../components/memoized-component/memoized-component';
import Footer from '../../components/footer/footer';

interface NotFoundPageProps {
  authorizationStatus: AuthorizationStatus;
  user: { email: string; avatarUrl?: string } | null;
  handleSignOut: () => void;
}

const NotFoundPage: FC<NotFoundPageProps> = ({ authorizationStatus, user, handleSignOut }) => (
  <div className="page">

    <MemoizedHeader
      authorizationStatus={authorizationStatus}
      user={user}
      onSignOut={handleSignOut}
    />

    <main className={styles.pageMain}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Упс! Страница не найдена</p>
      <Link className={styles.button} to="/">Вернуться на главную</Link>
    </main>
    <Footer />
  </div>
);

export default NotFoundPage;
