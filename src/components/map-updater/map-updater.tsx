import { FC, useEffect, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import { Offer } from '../../api/types/types';

interface MapUpdaterProps {
  offers: Offer[];
}

const DEFAULT_ZOOM = 13;

const MapUpdater: FC<MapUpdaterProps> = ({ offers }) => {
  const map = useMap();

  const city = useMemo(() => offers[0]?.location, [offers]);

  useEffect(() => {
    let isMounted = true;

    if (city && isMounted) {
      map.setView([city.latitude, city.longitude], DEFAULT_ZOOM);
    }

    return () => {
      isMounted = false;
    };
  }, [map, city]);

  return null;
};

export default MapUpdater;
