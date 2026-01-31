import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Home, Star, MapPin, Coffee,
    Wifi, Car, Shield, ChevronRight, Info, Phone, Mail, Globe, X
} from 'lucide-react';
import { useLanguage } from './LanguageContext';
import Navbar from './components/Navbar';

const HotelSuggestionsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { hotels, destination } = location.state || {};
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [showContactCard, setShowContactCard] = useState(false);

    const amenityIcons = {
        'Wifi': <Wifi size={14} />,
        'Breakfast': <Coffee size={14} />,
        'Parking': <Car size={14} />,
        'Security': <Shield size={14} />,
        'Pool': <Info size={14} />,
        'Gym': <Info size={14} />,
        'Spa': <Info size={14} />,
        'Tea Garden': <Info size={14} />,
        'Library': <Info size={14} />,
        'Wine Bar': <Info size={14} />,
        'Work Desk': <Info size={14} />,
        'Coffee Bar': <Info size={14} />
    };

    if (!hotels) {
        return (
            <div className="flex justify-center items-center" style={{ minHeight: '100vh' }}>
                <div className="text-center">
                    <h2>{t('noHotelsFound') || 'No hotel suggestions found.'}</h2>
                    <button onClick={() => navigate(-1)} className="btn btn-primary">{t('back') || 'Go Back'}</button>
                </div>
            </div>
        );
    }

    const handleCloseModal = () => {
        setSelectedHotel(null);
        setShowContactCard(false);
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', paddingTop: '80px', paddingBottom: '3rem' }}>
            <Navbar />

            <div className="container">
                <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        style={{ border: 'none', background: 'white', padding: '0.75rem', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex' }}
                    >
                        <ArrowLeft size={20} color="var(--primary)" />
                    </button>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.75rem', color: 'var(--text-main)' }}>
                            {t('staysIn') || 'Stay Suggestions in'} {destination} ({hotels.length})
                        </h1>
                        <p style={{ margin: 0, color: 'var(--text-muted)' }}>{t('handpickedHotels') || 'Handpicked accommodations for your vibe'}</p>
                    </div>
                </header>

                {hotels.length < 10 && (
                    <div className="card" style={{ marginBottom: '2rem', background: '#FEF3C7', border: '1px solid #F59E0B', color: '#92400E' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>
                            💡 Tip: You're seeing an older plan. Generate a new trip to see the 30+ new hotels we just added!
                        </p>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                    {hotels.map((hotel, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="card hotel-card"
                            style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease' }}
                            onClick={() => setSelectedHotel(hotel)}
                        >
                            <div style={{ position: 'relative', height: '220px' }}>
                                <img
                                    src={hotel.imageUrl || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'}
                                    alt={hotel.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.9)', padding: '0.25rem 0.75rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 'bold', fontSize: '0.85rem', color: '#F59E0B' }}>
                                    <Star size={14} fill="#F59E0B" /> {hotel.rating}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>{hotel.name}</h3>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>${hotel.pricePerNight}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('perNight') || 'per night'}</span>
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <MapPin size={14} /> {hotel.location}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {hotel.amenities.slice(0, 3).map(am => (
                                        <span key={am} style={{ fontSize: '0.75rem', background: '#F1F5F9', padding: '0.25rem 0.6rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                            {amenityIcons[am] || <Info size={12} />} {am}
                                        </span>
                                    ))}
                                    {hotel.amenities.length > 3 && (
                                        <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>+{hotel.amenities.length - 3} {t('more')}</span>
                                    )}
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%', marginTop: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                    {t('viewDetails') || 'View Details'} <ChevronRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detailed Modal */}
            <AnimatePresence>
                {selectedHotel && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="modal-overlay"
                        onClick={handleCloseModal}
                        style={{ zIndex: 2000 }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 30 }}
                            className="modal-content"
                            style={{ maxWidth: '850px', padding: 0, overflow: 'hidden', position: 'relative' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={handleCloseModal}
                                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
                            >
                                <X size={20} />
                            </button>

                            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.2fr', minHeight: '550px' }}>
                                <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                                    <img
                                        src={selectedHotel.imageUrl}
                                        alt={selectedHotel.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80';
                                        }}
                                    />
                                </div>
                                <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', background: 'white', position: 'relative' }}>

                                    <AnimatePresence mode="wait">
                                        {!showContactCard ? (
                                            <motion.div
                                                key="details"
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: -20, opacity: 0 }}
                                                style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                            >
                                                <div className="flex justify-between items-center mb-1">
                                                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase' }}>{selectedHotel.location}</span>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#F59E0B', fontWeight: 'bold' }}>
                                                        <Star size={14} fill="#F59E0B" /> {selectedHotel.rating}
                                                    </div>
                                                </div>
                                                <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>{selectedHotel.name}</h2>
                                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{selectedHotel.description}</p>

                                                <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>{t('availableRooms') || 'Available Rooms'}</h4>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {selectedHotel.roomTypes.map(rt => (
                                                        <span key={rt} style={{ padding: '0.5rem 1rem', border: '1px solid #E2E8F0', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600', background: '#F8FAFC' }}>{rt}</span>
                                                    ))}
                                                </div>

                                                <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-main)', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.5rem' }}>{t('amenities') || 'Amenities'}</h4>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2rem' }}>
                                                    {selectedHotel.amenities.map(am => (
                                                        <div key={am} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                                                            <div style={{ color: 'var(--primary)', background: 'var(--primary-light)', padding: '4px', borderRadius: '6px' }}>{amenityIcons[am] || <Info size={14} />}</div>
                                                            {am}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px dashed #F1F5F9', paddingTop: '1.5rem' }}>
                                                    <div>
                                                        <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>${selectedHotel.pricePerNight}</span>
                                                        <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}> / night</span>
                                                    </div>
                                                    <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }} onClick={() => setShowContactCard(true)}>
                                                        {t('contactNow') || 'Contact Now'}
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="contact"
                                                initial={{ x: 20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                exit={{ x: -20, opacity: 0 }}
                                                style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                                            >
                                                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('contactDetails') || 'Contact Information'}</h2>

                                                <div style={{ background: '#F1F5F9', padding: '2rem', borderRadius: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ background: 'white', padding: '0.8rem', borderRadius: '12px', color: 'var(--primary)' }}><Phone size={24} /></div>
                                                        <div>
                                                            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('phone') || 'Phone Number'}</span>
                                                            <strong style={{ fontSize: '1.1rem' }}>{selectedHotel.phone}</strong>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ background: 'white', padding: '0.8rem', borderRadius: '12px', color: 'var(--secondary)' }}><MapPin size={24} /></div>
                                                        <div>
                                                            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{t('address') || 'Physical Address'}</span>
                                                            <strong style={{ fontSize: '1.1rem' }}>{selectedHotel.address}</strong>
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ background: 'white', padding: '0.8rem', borderRadius: '12px', color: '#845EC2' }}><Mail size={24} /></div>
                                                        <div>
                                                            <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email</span>
                                                            <strong style={{ fontSize: '1.1rem' }}>contact@{selectedHotel.name.toLowerCase().replace(/\s/g, '')}.com</strong>
                                                        </div>
                                                    </div>
                                                </div>

                                                <button
                                                    className="btn btn-secondary"
                                                    style={{ marginTop: '2.5rem', width: '100%' }}
                                                    onClick={() => setShowContactCard(false)}
                                                >
                                                    {t('backToDetails') || 'Back to Details'}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HotelSuggestionsPage;
