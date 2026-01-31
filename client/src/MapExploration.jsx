import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Layers, Utensils, Bus, Car, Stethoscope, MapPin, Navigation } from 'lucide-react';
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
    // Mock distinct coordinates based on destination (Approximation for demo)
    const center = [35.6762, 139.6503]; // Default to Tokyo

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

    useEffect(() => {
        // Generate mock markers based on plan activities + extra categories
        const newMarkers = [];

        // 1. Places (from Itinerary)
        // 1. Places (from Itinerary)
        if (plan && plan.itinerary) {
            plan.itinerary.forEach((day, dIdx) => {
                const dayActivities = [day.morning, day.afternoon, day.evening].filter(Boolean);
                dayActivities.forEach((act, aIdx) => {
                    newMarkers.push({
                        id: `act-${dIdx}-${aIdx}`,
                        type: 'places',
                        position: [center[0] + (Math.random() - 0.5) * 0.05, center[1] + (Math.random() - 0.5) * 0.05],
                        title: act.title,
                        desc: `${act.time} • ${act.type}`
                    });
                });
            });
        }

        // 2. Food Spots
        const foodNames = ["Sakura Ramen", "Sushi Zen", "Matcha Cafe", "Street Yakitori", "Golden Curry"];
        foodNames.forEach((name, i) => {
            newMarkers.push({
                id: `food-${i}`,
                type: 'food',
                position: [center[0] + (Math.random() - 0.5) * 0.04, center[1] + (Math.random() - 0.5) * 0.04],
                title: name,
                desc: "4.8 Stars • $$"
            });
        });

        // 3. Transport (Public)
        const transportSpots = [
            { name: "Central Station", desc: "Hub for all lines" },
            { name: "North Bus Terminal", desc: "City & Intercity bus" },
            { name: "Metro Line A", desc: "Rapid Transit" },
            { name: "Metro Line B", desc: "Downtown Loop" }
        ];
        transportSpots.forEach((t, i) => {
            newMarkers.push({
                id: `trans-${i}`,
                type: 'transport',
                position: [center[0] + (Math.random() - 0.5) * 0.06, center[1] + (Math.random() - 0.5) * 0.06],
                title: t.name,
                desc: t.desc
            });
        });

        // 4. Rental / Private Transport
        const rentalSpots = [
            { name: "City Bike Share", desc: "$5/hour" },
            { name: "Zoom Car Rental", desc: "Compact & SUVs" },
            { name: "E-Scooter Hub", desc: "Quick ride" }
        ];
        rentalSpots.forEach((r, i) => {
            newMarkers.push({
                id: `rental-${i}`,
                type: 'rental',
                position: [center[0] + (Math.random() - 0.5) * 0.03, center[1] + (Math.random() - 0.5) * 0.03],
                title: r.name,
                desc: r.desc
            });
        });

        // 5. Emergency Services
        const emergencySpots = [
            { name: "City General Hospital", desc: "24/7 ER" },
            { name: "Tourist Police Station", desc: "English Support" },
            { name: "Central Pharmacy", desc: "Open late" }
        ];
        emergencySpots.forEach((e, i) => {
            newMarkers.push({
                id: `emerg-${i}`,
                type: 'emergency',
                position: [center[0] + (Math.random() - 0.5) * 0.08, center[1] + (Math.random() - 0.5) * 0.08],
                title: e.name,
                desc: e.desc
            });
        });

        setMarkers(newMarkers);
    }, [plan]);

    const toggleLayer = (layer) => {
        setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
    };

    const visibleMarkers = markers.filter(m => activeLayers[m.type]);

    return (
        <div className="map-exploration-container card" style={{ padding: 0, overflow: 'hidden', height: '500px', display: 'flex', flexDirection: 'column' }}>
            <div className="map-header" style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', zIndex: 10 }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MapPin size={20} color="var(--primary)" /> Map Exploration
                </h3>
                <div className="layer-toggles" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <LayerToggle label="Places" icon={<MapPin size={14} />} active={activeLayers.places} onClick={() => toggleLayer('places')} />
                    <LayerToggle label="Food" icon={<Utensils size={14} />} active={activeLayers.food} onClick={() => toggleLayer('food')} />
                    <LayerToggle label="Transport" icon={<Bus size={14} />} active={activeLayers.transport} onClick={() => toggleLayer('transport')} />
                    <LayerToggle label="Rental" icon={<Car size={14} />} active={activeLayers.rental} onClick={() => toggleLayer('rental')} />
                    <LayerToggle label="Emergency" icon={<Stethoscope size={14} />} active={activeLayers.emergency} onClick={() => toggleLayer('emergency')} />
                </div>
            </div>

            <div style={{ flex: 1, position: 'relative' }}>
                <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
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
                    🗺️ Interactive Map
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
