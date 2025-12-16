import CitiesList from '../../components/cities-list/citites-list';
import CityItem from '../../components/city-item/city-item';
import OfferList from '../../components/offer-list/offer-list';
import PlaceCard from '../../components/place-card/place-card';
import OfferMap from '../../components/map/map';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import SortOptions from '../../components/sort-options/sort-options';
import ReviewForm from '../../components/sent-form/sent-form';
import { withMemo } from '../With-memo';

export const MemoizedCitiesList = withMemo(CitiesList);
export const MemoizedCityItem = withMemo(CityItem);
export const MemoizedOfferList = withMemo(OfferList);
export const MemoizedPlaceCard = withMemo(PlaceCard);
export const MemoizedOfferMap = withMemo(OfferMap);
export const MemoizedNearPlacesList = withMemo(NearPlacesList);
export const MemoizedSortOptions = withMemo(SortOptions);
export const MemoizedReviewForm = withMemo(ReviewForm);
