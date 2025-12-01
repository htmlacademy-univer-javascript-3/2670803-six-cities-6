import { FC } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../api/types/offer';
import { MapUpdater } from '../MapUpdater/mapUpdater';

const defaultCustomIcon = leaflet.icon({
  iconUrl: '/img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const activeCustomIcon = leaflet.icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type MapProps = {
  offers: Offer[];
  activeOfferId?: string | null;
};

const OfferMap: FC<MapProps> = ({ offers, activeOfferId }) => {
  const city = offers[0]?.location;

  if (!city) {
    return <div className='cities__map map'>No location data</div>;
  }

  return (
    <MapContainer
      center={[city.latitude, city.longitude]}
      zoom={city.zoom}
      scrollWheelZoom
      className='cities__map map'
    >

      <MapUpdater offers={offers} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {offers.map((offer) => (
        <Marker
          key={offer.id}
          position={[offer.location.latitude, offer.location.longitude]}
          icon={offer.id === activeOfferId ? activeCustomIcon : defaultCustomIcon}
        >
          <Popup>{offer.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default OfferMap;
