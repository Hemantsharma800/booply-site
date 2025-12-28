import React from 'react';
import './copyrights.css';

const copyrights = ({ onBack }) => {
    return (
        <div className="legal-container fade-in">
            <header className="legal-header">
                <button className="btn-back" onClick={onBack}>← back to arcade</button>
                <h1 className="logo-legal">booply</h1>
            </header>

            <main className="legal-content">
                <section className="legal-section">
                    <h2>© 2025 booply. all rights reserved.</h2>
                    <p>
                        all content included on this platform, such as text, graphics, logos, button icons,
                        images, audio clips, digital downloads, data compilations, and software, is the
                        property of <strong>booply</strong> or its content suppliers and protected by
                        international copyright laws.
                    </p>
                </section>

                <section className="legal-section">
                    <h3>1. intellectual property</h3>
                    <p>
                        the "elite math arcade" brand, the booply modular game engine, and all 11 integrated
                        titles (including but not limited to <em>booply blast</em>, <em>nitro dash</em>, and
                        <em>playing cards</em>) are proprietary assets.
                        unauthorized reproduction or redistribution is strictly prohibited.
                    </p>
                </section>

                <section className="legal-section">
                    <h3>2. trademark notice</h3>
                    <p>
                        the booply logo, name, and "new layers" visual identity are trademarks of booply.
                        these trademarks may not be used in connection with any product or service that is
                        not booply's in any manner that is likely to cause confusion among users.
                    </p>
                </section>

                <section className="legal-section">
                    <h3>3. user license</h3>
                    <p>
                        booply grants you a limited, non-exclusive license to access and make personal use
                        of this site. this license does not include any resale or commercial use of this
                        site or its contents.
                    </p>
                </section>
            </main>

            <footer className="legal-footer">
                <p>last updated: december 28, 2025</p>
            </footer>
        </div>
    );
};

export default copyrights;