import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Legal = () => {
    const [view, setView] = useState('privacy');
    const navigate = useNavigate();

    return (
        <div className="legal-container">
            <nav className="legal-nav">
                <button className={view === 'privacy' ? 'active' : ''} onClick={() => setView('privacy')}>Privacy Policy</button>
                <button className={view === 'terms' ? 'active' : ''} onClick={() => setView('terms')}>Terms of Service</button>
                <button onClick={() => navigate('/')}>Exit</button>
            </nav>

            <div className="legal-box">
                {view === 'privacy' ? (
                    <section>
                        <h1>Privacy Policy</h1>
                        <p>We use Google AdSense to serve ads. Third-party vendors, including Google, use cookies to serve ads based on your previous visits to this or other websites.</p>
                        <h3>Opt-Out</h3>
                        <p>You may opt out of personalized advertising by visiting Google's Ad Settings.</p>
                    </section>
                ) : (
                    <section>
                        <h1>Terms of Service</h1>
                        <p>By using Booply, you agree to use our educational games for entertainment only.</p>
                        <ul>
                            <li>No deceptive clicks on advertisements.</li>
                            <li>Respect all intellectual property of the Booply platform.</li>
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Legal;