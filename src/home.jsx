import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            // Pushes the ad to the 'ins' tag when the component loads
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className="lobby-container">
            {/* 🏦 MONETIZATION: TOP LEADERBOARD AD */}
            <div className="ad-container-leaderboard">
                <p className="ad-label">ADVERTISEMENT</p>
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client={import.meta.env.VITE_ADSENSE_ID}
                    data-ad-slot="YOUR_LEADERBOARD_SLOT_ID"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>

            <header className="lobby-header">
                <h1>Booply</h1>
                <p>Elite Math Arcade</p>
            </header>

            <main className="game-grid">
                <div className="game-card" onClick={() => navigate('/playing-cards')}>
                    <h3>Playing Cards</h3>
                    <p>Logic & Strategy</p>
                </div>
                {/* Add more game cards here */}
            </main>

            <footer className="lobby-footer">
                <button onClick={() => navigate('/legal')}>Privacy & Terms</button>
                <p>© 2025 Booply | Elite Math Arcade</p>
            </footer>
        </div>
    );
};

export default Home;