import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sun, Download, Share2, DollarSign } from 'lucide-react';

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
                background: `linear-gradient(to top, rgba(0,0,0,0.7), transparent), url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80) center/cover`,
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
                            Your personalized {plan.travelers} adventure. Est. Budget: <span style={{ color: '#86EFAC', fontWeight: 'bold' }}>${plan.budgetSummary.total}</span>
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
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

                    {/* Itinerary Column */}
                    <div className="itinerary-list" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {plan.itinerary.map((day, index) => (
                            <motion.div
                                key={day.day}
                                className="card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ padding: 0, overflow: 'hidden' }}
                            >
                                <div style={{ padding: '1.5rem', background: '#F8FAFC', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ margin: 0 }}>Day {day.day}</h3>
                                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{day.date}</p>
                                    </div>
                                    <div className="chip" style={{ background: 'white', fontSize: '0.85rem' }}>
                                        <Sun size={16} style={{ color: '#F59E0B' }} /> {day.weather}
                                    </div>
                                </div>
                                <div style={{ padding: '1.5rem' }}>
                                    <div style={{ paddingLeft: '2rem', borderLeft: '2px solid var(--primary-light)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                        {day.activities.map((activity, i) => (
                                            <div key={i} style={{ position: 'relative' }}>
                                                <div style={{ position: 'absolute', left: '-2.7rem', top: '0', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary)', border: '4px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}></div>
                                                <div className="flex items-center gap-4" style={{ marginBottom: '0.5rem' }}>
                                                    <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-light)' }}>{activity.time}</span>
                                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{activity.title}</h4>
                                                </div>
                                                <p style={{ fontSize: '0.9rem' }}>Recommended activity based on your interests.</p>
                                            </div>
                                        ))}
                                    </div>
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

export default TripPlan;
