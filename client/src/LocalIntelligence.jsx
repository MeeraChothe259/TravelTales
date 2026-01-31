import React, { useState } from 'react';
<<<<<<< HEAD
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Bus, User, Star, Phone, Car } from 'lucide-react';
=======
import { motion } from 'framer-motion';
import { Utensils, Bus, User, Star, Phone, Car, Bike } from 'lucide-react';
>>>>>>> c5b1cc2b697ead4b5688616b6e60a98d2ac69e4e
import { useLanguage } from './LanguageContext';
import './LocalIntelligence.css';

const LocalIntelligence = ({ data }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('food');
    const [selectedContact, setSelectedContact] = useState(null);

    if (!data) return null;

    const handleContactClick = (name, type, manualContact = null) => {
        const phone = manualContact || `+1 555-${name.length.toString().padStart(3, '0')}-${Math.floor(Math.random() * 9000 + 1000)}`;
        setSelectedContact({ name, type, phone });
    };

    const renderFood = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="intel-content">
            <h4 style={{ marginBottom: '1rem' }}>🍛 {t('localSpecialties')}</h4>
            <div className="flex flex-wrap gap-2 mb-4">
                {data.food.specialties.map(item => (
                    <span key={item} className="chip badge-primary">{item}</span>
                ))}
            </div>

            <h4 style={{ marginBottom: '1rem' }}>🍽️ {t('recommendedSpots')}</h4>
            <div className="intel-grid">
                {data.food.restaurants.map((rest, i) => (
                    <div key={i} className="intel-card">
                        <div className="flex justify-between items-start">
                            <strong>{rest.name}</strong>
                            <div className="flex gap-2">
                                <button onClick={() => handleContactClick(rest.name, t('food'))} className="icon-btn-small" title={t('keyContacts')}>
                                    <Phone size={14} />
                                </button>
                                <span className="text-sm text-green-600 font-bold">{rest.price}</span>
                            </div>
                        </div>
                        <p className="text-grey text-sm">{rest.type}</p>
                        <div className="flex gap-1 mt-2">
                            {rest.tags.map(t => <span key={t} className="tag tag-xs">{t}</span>)}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderTransport = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="intel-content">
            <div className="intel-grid">
                <div className="intel-card">
                    <h4>🚌 {t('routes')}</h4>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                        {data.transport.routes.map(r => <li key={r}>{r}</li>)}
                    </ul>
                </div>
                <div className="intel-card">
                    <h4>🎫 {t('passes')}</h4>
                    <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem' }}>
                        {data.transport.passes.map(p => <li key={p}>{p}</li>)}
                    </ul>
                </div>
            </div>
            <h4 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>📞 {t('keyContacts')}</h4>
            <div className="flex flex-wrap gap-2">
                {data.transport.contacts.map(c => (
                    <div key={c.name} className="contact-pill" onClick={() => handleContactClick(c.name, c.type, c.contact)} style={{ cursor: 'pointer' }}>
                        <Phone size={14} /> <strong>{c.type}:</strong> {c.name}
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderGuides = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="intel-content">
            <div className="intel-grid">
                {data.guides.map((guide, i) => (
                    <div key={i} className="intel-card flex items-center gap-3">
                        <div className="avatar-placeholder"><User size={20} /></div>
                        <div>
                            <div className="flex items-center gap-2">
                                <strong>{guide.name}</strong>
                                <span className="flex items-center text-xs text-yellow-500 font-bold">
                                    <Star size={12} fill="currentColor" /> {guide.rating}
                                </span>
                            </div>
                            <p className="text-sm text-grey">{t('specialtyLabel')}: {guide.specialty}</p>
                            <p className="text-xs text-grey mt-1">🗣️ {t('languagesLabel')}: {guide.languages.join(', ')}</p>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <button onClick={() => handleContactClick(guide.name, t('guides'))} className="icon-btn-small" title={t('keyContacts')}>
                                <Phone size={16} className="text-blue-500" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );

    const renderRental = () => (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="intel-content">
            <h4 style={{ marginBottom: '1rem' }}>🚗 {t('rentedVehicles')}</h4>
            <div className="intel-grid">
                {data.rental && data.rental.contacts && data.rental.contacts.map((contact, i) => (
                    <div key={i} className="intel-card">
                        <div className="flex justify-between items-start">
                            <strong>{contact.name}</strong>
                            <span className="text-secondary text-xs font-bold" style={{ color: 'var(--primary)' }}>{contact.type}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <Phone size={14} className="text-blue-500" />
                            <span className="text-sm font-mono">{contact.contact || `+1 555-${contact.name.length}${Math.floor(Math.random() * 1000)}`}</span>
                            <button onClick={() => handleContactClick(contact.name, contact.type, contact.contact)} className="icon-btn-small ml-auto" title={t('keyContacts')}>
                                <Phone size={12} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {data.rental && data.rental.options && (
                <>
                    <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>📋 {t('options')}</h4>
                    <div className="flex flex-wrap gap-2">
                        {data.rental.options.map(opt => (
                            <span key={opt} className="chip badge-primary" style={{ opacity: 0.8 }}>{opt}</span>
                        ))}
                    </div>
                </>
            )}
        </motion.div>
    );

    return (
        <div className="card local-intel-container" style={{ padding: '0' }}>
            <div className="intel-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
                <h3 style={{ margin: 0 }}>🧠 {t('localIntelTitle')}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t('insiderTipsFor')} {data.destination || 'your trip'}</p>
            </div>

            <div className="intel-tabs">
                <button className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`} onClick={() => setActiveTab('food')}>
                    <Utensils size={16} /> {t('food')}
                </button>
                <button className={`tab-btn ${activeTab === 'transport' ? 'active' : ''}`} onClick={() => setActiveTab('transport')}>
                    <Bus size={16} /> {t('transport')}
                </button>
                <button className={`tab-btn ${activeTab === 'rental' ? 'active' : ''}`} onClick={() => setActiveTab('rental')}>
                    <Car size={16} /> {t('rental')}
                </button>
                <button className={`tab-btn ${activeTab === 'guides' ? 'active' : ''}`} onClick={() => setActiveTab('guides')}>
                    <User size={16} /> {t('guides')}
                </button>
            </div>

            <div className="intel-body" style={{ padding: '1.5rem', position: 'relative' }}>
                {activeTab === 'food' && renderFood()}
                {activeTab === 'transport' && renderTransport()}
                {activeTab === 'rental' && renderRental()}
                {activeTab === 'guides' && renderGuides()}

                <AnimatePresence>
                    {selectedContact && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="contact-card-overlay"
                        >
                            <div className="contact-card-content">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="badge-primary tag-xs">{selectedContact.type}</span>
                                    <button onClick={() => setSelectedContact(null)} className="close-btn">&times;</button>
                                </div>
                                <h4 style={{ margin: '0 0 0.5rem 0' }}>{selectedContact.name}</h4>
                                <div className="flex items-center gap-2 text-primary font-bold text-lg mb-4">
                                    <Phone size={18} />
                                    <a href={`tel:${selectedContact.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                                        {selectedContact.phone}
                                    </a>
                                </div>
                                <div className="flex gap-2">
                                    <button className="btn btn-primary btn-sm flex-1" onClick={() => alert(`${t('calling')} ${selectedContact.name}...`)}>
                                        {t('contactNow')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LocalIntelligence;
