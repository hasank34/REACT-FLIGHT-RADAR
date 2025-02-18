import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { clearRoute } from "../redux/slices/infoSlice";
import "leaflet-rotatedmarker";

// Açı hesaplama fonksiyonu
const calculateBearing = (startLat, startLng, finishLat, finishLng) => {
  const toRadians = (deg) => (deg * Math.PI) / 180;

  const lat1 = toRadians(startLat);
  const lat2 = toRadians(finishLat);
  const dLng = toRadians(finishLng - startLng);

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);

  let bearing = Math.atan2(y, x) * (180 / Math.PI); // Radyanı dereceye çevir
  bearing = (bearing + 360) % 360; // Açıyı 0-360 aralığına getir

  return bearing;
};

const Map = ({ setDetailId }) => {
  const dispatch = useDispatch();
  const { flights } = useSelector((store) => store.flight);
  const { route } = useSelector((store) => store.info);

  // Uçak simgesi
  const planeIcon = new icon({
    iconUrl: "plane-icon.png",
    iconSize: [25, 25],
  });

  return (
    <MapContainer center={[39.9208, 34.926]} zoom={6} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {flights.map((flight, i) => {
        // Her uçuşun bir önceki pozisyonuna göre dinamik yönünü hesapla
        const prevFlight = flights[i - 1]; // Bir önceki uçuşu al
        let bearing = 0; // Varsayılan yön

        if (prevFlight) {
          // Eğer önceki uçuş varsa, yönü ona göre hesapla
          bearing = calculateBearing(
            prevFlight.lat,
            prevFlight.lng,
            flight.lat,
            flight.lng
          );
        }

        // İkonu 45 + 90 derece döndürmek için başlangıç açısını ekle
        const finalBearing = bearing; // Başlangıçta 135 derece döndürme

        return (
          <Marker
            key={i}
            icon={planeIcon}
            position={[flight.lat, flight.lng]}
            rotationAngle={finalBearing} // Hesaplanan açıyı kullan
            rotationOrigin="center" // İkonun merkezini döndürme noktası olarak ayarla
          >
            <Popup>
              <div className="popup">
                <span>Kod: {flight.code}</span>
                <button onClick={() => setDetailId(flight.id)}>Detay</button>

                <button
                  className=""
                  onClick={() => {
                    dispatch(clearRoute());
                    setDetailId(null);
                  }}
                >
                  Rotayı Temizle
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {route && <Polyline positions={route} />}
    </MapContainer>
  );
};

export default Map;
