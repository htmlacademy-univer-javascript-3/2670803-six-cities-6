import { FC, useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import { Offer } from '../../api/types/offer';

interface MapUpdaterProps {
  offers: Offer[];
}

const DEFAULT_ZOOM = 13;

export const MapUpdater: FC<MapUpdaterProps> = ({ offers }) => {
  const map = useMap();

  const city = useMemo(() => offers[0]?.location, [offers]);

  useEffect(() => {
    if (city) {
      map.setView([city.latitude, city.longitude], DEFAULT_ZOOM);
    }
  }, [map, city]);

  return null;
};
