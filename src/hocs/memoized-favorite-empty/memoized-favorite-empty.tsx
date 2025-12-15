import FavoritesEmpty from '../../components/favorite-empty/favorite-empty';
import { withMemo } from '../With-memo';

const MemoizedFavoritesEmpty = withMemo(FavoritesEmpty);

export default MemoizedFavoritesEmpty;
