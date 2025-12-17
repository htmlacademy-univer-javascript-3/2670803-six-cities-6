import { FC, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../api/types/types';
import MapUpdater from '../map-updater/map-updater';

const DEFAULT_CUSTOM_ICON = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const ACTIVE_CUSTOM_ICON = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type MapProps = {
  offers: Offer[];
  activeOfferId?: string | null;
  mode?: 'default' | 'offer';
};

const OfferMap: FC<MapProps> = ({ offers, activeOfferId, mode = 'default' }) => {
  let preparedOffers = offers;
  let forcedActiveId = activeOfferId;

  if (mode === 'offer') {
    const [current, ...near] = offers;
    preparedOffers = [current, ...near.slice(0, 3)];
    forcedActiveId = current.id;
  }

  const city = offers[0]?.location;

  const markers = useMemo(
    () =>
      preparedOffers.map((offer) => {
        const isActive = offer.id === forcedActiveId;
        const icon = isActive ? ACTIVE_CUSTOM_ICON : DEFAULT_CUSTOM_ICON;

        return (
          <Marker
            key={offer.id}
            position={[offer.location.latitude, offer.location.longitude]}
            icon={icon}
          >
            <Popup>{offer.title}</Popup>
          </Marker>
        );
      }),
    [preparedOffers, forcedActiveId]
  );

  if (!city) {
    return <div className='cities__map map'>No location data</div>;
  }

  return (
    <MapContainer
      center={[city.latitude, city.longitude]}
      zoom={city.zoom}
      scrollWheelZoom
      className='cities__map map'
      style={{ height: '400px', width: '100%' }}
    >
      <MapUpdater offers={preparedOffers} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  );
};

export default OfferMap;
