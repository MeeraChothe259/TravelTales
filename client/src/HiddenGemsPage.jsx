import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, MapPin, Info, ExternalLink, X, Globe } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLanguage } from './LanguageContext';

// Fix for default Leaflet icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const HiddenGemsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { hiddenGems, destination } = location.state || { hiddenGems: [], destination: 'Unknown' };
    const [selectedGemForMap, setSelectedGemForMap] = React.useState(null);

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-main)', padding: '2rem' }}>
            {/* Header */}
            <header style={{ maxWidth: '1200px', margin: '0 auto 3rem auto', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '50%', p: '0.8rem', cursor: 'pointer', display: 'flex' }}
                >
                    <ArrowLeft size={24} color="var(--primary)" />
                </button>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800' }}>
                        {t('hiddenGemsCard')} - {destination}
                    </h1>
                    <p style={{ color: 'var(--text-sub)', fontSize: '1.1rem' }}>
                        {t('hiddenGemsDesc')}
                    </p>
                </div>
            </header>

            {/* Content Grid */}
            <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {hiddenGems.length > 0 ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {hiddenGems.map((gem, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card"
                                style={{ overflow: 'hidden', padding: 0, borderRadius: '24px', border: 'none', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}
                            >
                                <div style={{ height: '220px', position: 'relative' }}>
                                    <img
                                        src={gem.imageUrl || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80'}
                                        alt={gem.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Sparkles size={14} /> HIDDEN GEM
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>{gem.title}</h3>
                                    <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '1.2rem', lineHeight: '1.6' }}>
                                        {gem.description}
                                    </p>

                                    <div style={{ background: 'rgba(124, 58, 237, 0.05)', padding: '1rem', borderRadius: '16px', borderLeft: '4px solid #7C3AED' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7C3AED', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '4px' }}>
                                            <Info size={14} /> WHY IT'S UNDERRATED
                                        </div>
                                        <p style={{ fontSize: '0.85rem', margin: 0, color: 'var(--text-sub)' }}>
                                            {gem.whyUnderrated}
                                        </p>
                                    </div>

                                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                                        <button
                                            className="btn btn-primary"
                                            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                            onClick={() => setSelectedGemForMap(gem)}
                                        >
                                            <MapPin size={18} /> View on Map
                                        </button>
                                        <button className="btn" style={{ background: 'white', border: '1px solid var(--border)', color: 'var(--text-main)' }}>
                                            <ExternalLink size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <div style={{ background: 'rgba(0,0,0,0.05)', p: '2rem', borderRadius: '50%', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                            <Sparkles size={48} color="var(--border)" />
                        </div>
                        <h2>{t('noPlanFound')}</h2>
                        <p>{t('checkBackLater')}</p>
                    </div>
                )}
            </main>

            {/* Map Modal */}
            <AnimatePresence>
                {selectedGemForMap && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
                            zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '2rem'
                        }}
                        onClick={() => setSelectedGemForMap(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            style={{
                                width: '100%', maxWidth: '900px', height: '600px',
                                background: 'white', borderRadius: '24px', overflow: 'hidden',
                                display: 'flex', flexDirection: 'column', position: 'relative'
                            }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedGemForMap(null)}
                                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 1001, background: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
                            >
                                <X size={24} />
                            </button>

                            <div style={{ padding: '1.5rem', background: 'white', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: 'var(--primary-light)', p: '0.5rem', borderRadius: '12px' }}>
                                    <MapPin size={24} color="var(--primary)" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0 }}>{selectedGemForMap.title}</h3>
                                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-sub)' }}>{destination} • Hidden Gem Location</p>
                                </div>
                            </div>

                            <div style={{ flex: 1, position: 'relative' }}>
                                <MapContainer
                                    center={[selectedGemForMap.coords.lat, selectedGemForMap.coords.lng]}
                                    zoom={15}
                                    style={{ height: '100%', width: '100%' }}
                                >
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                    />
                                    <Marker position={[selectedGemForMap.coords.lat, selectedGemForMap.coords.lng]}>
                                        <Popup>
                                            <div style={{ textAlign: 'center' }}>
                                                <strong>{selectedGemForMap.title}</strong>
                                                <p style={{ margin: '5px 0 0 0', fontSize: '0.8rem' }}>Authentic local secret</p>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>

                            <div style={{ padding: '1.5rem', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                                    <Globe size={16} /> Open in Street View or local maps for navigation
                                </div>
                                <button className="btn btn-primary" onClick={() => window.open(`https://www.google.com/maps?q=${selectedGemForMap.coords.lat},${selectedGemForMap.coords.lng}`, '_blank')}>
                                    Open in Google Maps
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HiddenGemsPage;
