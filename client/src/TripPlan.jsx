import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Download, Share2, DollarSign, Clock, MapPin, Ticket, Frown } from 'lucide-react';

import MapExploration from './MapExploration';

const TripPlan = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { plan } = location.state || {};

    if (!plan) {
        return (
            <div className="flex justify-center items-center" style={{ minHeight: '100vh', background: 'var(--bg-body)' }}>
                <div className="text-center">
                    <h2>No Plan Found</h2>
                    <button onClick={() => navigate('/plan')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        Start Planning
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '5rem', background: '#F8FAFC' }}>
            {/* Header Image */}
            <div className="trip-header" style={{
                height: '350px',
                background: `linear-gradient(to top, rgba(0,0,0,0.8), transparent), url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover`,
                position: 'relative',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                paddingBottom: '3rem'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <button
                        onClick={() => navigate('/plan')}
                        style={{
                            position: 'absolute', top: '-200px', left: '0',
                            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)',
                            border: 'none', borderRadius: '50%', width: '40px', height: '40px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', color: 'white'
                        }}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="flex gap-2" style={{ marginBottom: '1rem' }}>
                            <span style={{ background: 'var(--primary)', padding: '0.2rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                {plan.vibe} Trip
                            </span>
                            <span style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', padding: '0.2rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {plan.dates}
                            </span>
                        </div>
                        <h1 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '4rem' }}>{plan.destination}</h1>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                            Your personalized {plan.travelers} adventure. Est. Budget: <span style={{ color: '#86EFAC', fontWeight: 'bold' }}>${plan.budgetSummary.total} Total</span>
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
<<<<<<< HEAD
                {/* 5️⃣ Map-Based Exploration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ marginBottom: '2rem' }}
                >
                    <MapExploration plan={plan} />
                </motion.div>

                <div className="trip-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
=======
                <div className="trip-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2.5fr) minmax(0, 1fr)', gap: '2rem' }}>
>>>>>>> 7eecfb97e74a6da82c4ceddc52a6dffb542cc5c3

                    {/* Itinerary Column */}
                    <div className="itinerary-list">
                        {plan.itinerary.map((day, index) => (
                            <motion.div
                                key={day.day}
                                className="day-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {/* Day Header */}
                                <div className="day-header">
                                    <div>
                                        <h3 style={{ margin: 0 }}>Day {day.day}</h3>
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{day.date}</p>
                                    </div>
                                    <div className="chip" style={{ background: 'white', fontSize: '0.85rem' }}>
                                        <Sun size={16} style={{ color: '#F59E0B' }} /> {day.weather}
                                    </div>
                                </div>

                                {/* Timeline Grid */}
                                <div className="timeline-grid">
                                    <ActivitySlot label="Morning 🌅" data={day.morning} />
                                    <ActivitySlot label="Afternoon ☀️" data={day.afternoon} />
                                    <ActivitySlot label="Evening 🌙" data={day.evening} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Budget Card */}
                        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <DollarSign size={20} color="var(--success)" /> Budget
                            </h3>
                            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
                                    <span>Tier</span>
                                    <strong>{plan.budgetSummary.level}</strong>
                                </div>
                                <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
                                    <span>Per Person</span>
                                    <strong>${plan.budgetSummary.perPerson}</strong>
                                </div>
                                <hr style={{ border: 'none', borderTop: '1px solid var(--border-light)' }} />
                                <div className="flex justify-between" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    <span>Total</span>
                                    <span style={{ color: 'var(--success)' }}>${plan.budgetSummary.total}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Highlights */}
                        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                            <h3>Highlights</h3>
                            <div className="flex" style={{ flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
                                {plan.highlights.map(h => (
                                    <span key={h} style={{ padding: '0.3rem 0.8rem', background: '#F3E8FF', color: '#7E22CE', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                        {h}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button className="btn" style={{ flex: 1, background: 'var(--secondary)', color: 'white' }}>
                                <Download size={18} /> Save
                            </button>
                            <button className="btn btn-secondary" style={{ flex: 1 }}>
                                <Share2 size={18} /> Share
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

const ActivitySlot = ({ label, data }) => (
    <div className="time-slot">
        <span className="slot-label">{label}</span>
        <div className="activity-title">{data.title}</div>

        <div className="meta-row">
            <span className="meta-item"><Clock size={14} /> {data.duration}</span>
            <span className="meta-item"><Ticket size={14} /> {data.cost}</span>
        </div>
        <div className="meta-row" style={{ marginTop: '-0.5rem' }}>
            <span className="meta-item"><MapPin size={14} /> {data.travelTime} away</span>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {data.safeToSkip ? (
                <span className="tag tag-skip">Safe to Skip</span>
            ) : (
                <span className="tag tag-essential">Must Do</span>
            )}
        </div>

        {!data.safeToSkip && (
            <div className="regret-box">
                <span className="regret-label flex items-center gap-1">
                    <Frown size={12} /> FOMO LEVEL: {data.regretProb}
                </span>
                <div className="regret-bar">
                    <div
                        className="regret-fill"
                        style={{ width: data.regretProb }}
                    ></div>
                </div>
            </div>
        )}
    </div>
);

export default TripPlan;
