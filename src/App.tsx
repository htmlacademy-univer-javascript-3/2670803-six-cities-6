import { FC } from 'react';
import MainPage from './pages/MainPage/mainPage';
import { MainPageProps } from './components/types';

type AppProps = {
  mainPageData: MainPageProps;
}

const App: FC<AppProps> = ({mainPageData}) => <MainPage {...mainPageData}/>;

export default App;
