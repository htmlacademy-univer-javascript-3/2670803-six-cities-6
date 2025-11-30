import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Offer } from '../../api/types/offer';

interface MapUpdaterProps {
  offers: Offer[];
}

export const MapUpdater: FC<MapUpdaterProps> = ({ offers }) => {
  const map = useMap();

  useEffect(() => {
    if (offers.length > 0) {
      const city = offers[0].location;
      map.setView([city.latitude, city.longitude], 13);
    }
  }, [map, offers]);

  return null;
};
