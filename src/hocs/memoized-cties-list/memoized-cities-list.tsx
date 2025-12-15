import CitiesList from '../../components/cities-list/citites-list';
import { withMemo } from '../With-memo';

const MemoizedCitiesList = withMemo(CitiesList);

export default MemoizedCitiesList;
