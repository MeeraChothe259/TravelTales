import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Utensils, Bus, Car, Stethoscope, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapExploration = ({ plan }) => {
    const { t } = useLanguage();
    const [mapCenter, setMapCenter] = useState([35.6762, 139.6503]); // Default to Tokyo
    const [isSearching, setIsSearching] = useState(false);

    const [activeLayers, setActiveLayers] = useState({
        places: true,
        food: true,
        transport: false,
        rental: false,
        emergency: false
    });

    const [markers, setMarkers] = useState([]);

    // Custom Icons Helper
    const createCustomIcon = (icon) => {
        return L.divIcon({
            html: `<div style="
                background: white; 
                border-radius: 50%; 
                width: 30px; 
                height: 30px; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                border: 2px solid var(--primary);
                font-size: 1.2rem;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            ">${icon}</div>`,
            className: 'custom-map-icon',
            iconSize: [30, 30],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30]
        });
    };

    const icons = {
        places: createCustomIcon('📍'),
        food: createCustomIcon('🍜'),
        transport: createCustomIcon('🚇'),
        rental: createCustomIcon('🚗'),
        emergency: createCustomIcon('🏥')
    };

    // Geocoding Logic: Resolve destination to coordinates
    useEffect(() => {
        if (!plan?.destination) return;

        const geocode = async () => {
            setIsSearching(true);
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(plan.destination)}&limit=1`);
                const data = await response.json();
                if (data && data.length > 0) {
                    const { lat, lon } = data[0];
                    setMapCenter([parseFloat(lat), parseFloat(lon)]);
                }
            } catch (error) {
                console.error("Geocoding failed:", error);
            } finally {
                setIsSearching(false);
            }
        };

        geocode();
    }, [plan?.destination]);

    // Component to handle map centering
    const RecenterMap = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            map.setView(center, 13);
        }, [center, map]);
        return null;
    };

    useEffect(() => {
        // Generate mock markers based on plan activities + extra categories
        const newMarkers = [];

        // 1. Places (from Itinerary)
        if (plan && plan.itinerary) {
            plan.itinerary.forEach((day, dIdx) => {
                const dayActivities = [day.morning, day.afternoon, day.evening].filter(Boolean);
                dayActivities.forEach((act, aIdx) => {
                    newMarkers.push({
                        id: `act-${dIdx}-${aIdx}`,
                        type: 'places',
                        position: [mapCenter[0] + (Math.random() - 0.5) * 0.05, mapCenter[1] + (Math.random() - 0.5) * 0.05],
                        title: act.title,
                        desc: `${act.time} • ${act.type}`
                    });
                });
            });
        }

        // 2. Food Spots
        const foodSpots = [
            { name: "Saffron & Spice", desc: "Authentic Local Cuisine • 4.9 ⭐" },
            { name: "The Blue Terrace", desc: "Fine Dining with View • $$$" },
            { name: "Urban Bistro", desc: "Cozy Brunch & Coffee • $$" },
            { name: "Spicy Street Kitchen", desc: "Famous Night Market Spot • $" },
            { name: "Velvet Lounge", desc: "Cocktails & Tapas • Late Night" }
        ];
        foodSpots.forEach((spot, i) => {
            newMarkers.push({
                id: `food-${i}`,
                type: 'food',
                position: [mapCenter[0] + (Math.random() - 0.5) * 0.04, mapCenter[1] + (Math.random() - 0.5) * 0.04],
                title: spot.name,
                desc: spot.desc
            });
        });

        // 3. Transport (Public)
        const transportHubs = [
            { name: "Grand Central Plaza", desc: "Main Railway & Metro Hub" },
            { name: "West Gate Bus Terminal", desc: "Intercity Express Services" },
            { name: "Waterfront Ferry Pier", desc: "Scenic River Transport" },
            { name: "Old Town Tram Stop", desc: "Heritage Transit Line" }
        ];
        transportHubs.forEach((hub, i) => {
            newMarkers.push({
                id: `trans-${i}`,
                type: 'transport',
                position: [mapCenter[0] + (Math.random() - 0.5) * 0.06, mapCenter[1] + (Math.random() - 0.5) * 0.06],
                title: hub.name,
                desc: hub.desc
            });
        });

        // 4. Rental / Private Transport
        const rentalAgencies = [
            { name: "Velocity Bike Rentals", desc: "Daily & Hourly Rates" },
            { name: "Prime Auto Hire", desc: "Sedans, SUVs & EVs" },
            { name: "Swift E-Scooters", desc: "App-based unlock" },
            { name: "Luxury Chauffeur Service", desc: "Private Airport Transfers" }
        ];
        rentalAgencies.forEach((agency, i) => {
            newMarkers.push({
                id: `rental-${i}`,
                type: 'rental',
                position: [mapCenter[0] + (Math.random() - 0.5) * 0.03, mapCenter[1] + (Math.random() - 0.5) * 0.03],
                title: agency.name,
                desc: agency.desc
            });
        });

        // 5. Emergency Services
        const emergencyFacilities = [
            { name: "St. Jude General Hospital", desc: "24/7 Trauma & Emergency Center" },
            { name: "Central Police Precinct", desc: "Tourist Assistance Desk" },
            { name: "Lifeline late-night Pharmacy", desc: "Open 24 Hours" },
            { name: "Metropolitan Fire Station", desc: "Response Unit" }
        ];
        emergencyFacilities.forEach((facility, i) => {
            newMarkers.push({
                id: `emerg-${i}`,
                type: 'emergency',
                position: [mapCenter[0] + (Math.random() - 0.5) * 0.08, mapCenter[1] + (Math.random() - 0.5) * 0.08],
                title: facility.name,
                desc: facility.desc
            });
        });

        setMarkers(newMarkers);
    }, [plan, mapCenter]);

    const toggleLayer = (layer) => {
        setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    const visibleMarkers = markers.filter(m => activeLayers[m.type]);

    return (
        <div className="map-exploration-container card" style={{ padding: 0, overflow: 'hidden', height: '500px', display: 'flex', flexDirection: 'column' }}>
            <div className="map-header" style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', zIndex: 10 }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} color="var(--primary)" /> {t('mapExploration')}
                </h3>
                <div className="layer-toggles" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <LayerToggle label={t('places')} icon={<MapPin size={14} />} active={activeLayers.places} onClick={() => toggleLayer('places')} />
                    <LayerToggle label={t('food')} icon={<Utensils size={14} />} active={activeLayers.food} onClick={() => toggleLayer('food')} />
                    <LayerToggle label={t('transport')} icon={<Bus size={14} />} active={activeLayers.transport} onClick={() => toggleLayer('transport')} />
                    <LayerToggle label={t('rental')} icon={<Car size={14} />} active={activeLayers.rental} onClick={() => toggleLayer('rental')} />
                    <LayerToggle label={t('emergency')} icon={<Stethoscope size={14} />} active={activeLayers.emergency} onClick={() => toggleLayer('emergency')} />
                </div>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
                <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <RecenterMap center={mapCenter} />
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    {visibleMarkers.map(marker => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            icon={icons[marker.type] || DefaultIcon}
                        >
                            <Popup>
                                <strong>{marker.title}</strong><br />
                                {marker.desc}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* 3D Overlay Hint (Visual Touch) */}
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', zIndex: 1000, background: 'rgba(255,255,255,0.9)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    🗺️ {t('interactiveMap')}
                </div>
            </div>
        </div>
    );
};

const LayerToggle = ({ label, icon, active, onClick }) => (
    <button
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            padding: '0.4rem 0.8rem',
            borderRadius: '50px',
            border: active ? '1px solid var(--primary)' : '1px solid var(--border-light)',
            background: active ? 'var(--primary-light)' : 'white',
            color: active ? 'var(--primary)' : 'var(--text-muted)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            fontWeight: active ? 'bold' : 'normal',
            transition: 'all 0.2s'
        }}
    >
        {icon} {label}
    </button>
);

export default MapExploration;

