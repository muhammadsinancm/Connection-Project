import { useNavigate } from 'react-router-dom';
import './FirstLoadPages.css'
import { useEffect } from 'react';
import { Home } from 'lucide-react';

function FirstLoadingPages() {
    const navigation = useNavigate()
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    }
                });
            },
            { threshold: 0.2 }
        );

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const ToHomePage = ()=> {
        navigation('/loginorSing')
    }

    return (
        <div className="about-page">
            <section className="about-hero">

                <div className="about-logo fade-in-down">YourApp</div>
                <h1 className="about-title fade-in-up">Connection</h1>
                <p className="about-tagline fade-in-up delay-1">
                    Purpose of this app,
                   real time communication webapp, for whole devices.
                </p>
            </section>

            <section className="about-features">
                <div className="feature-card animate-on-scroll">
                    <div className="feature-icon">⚡</div>
                    <h3>Feature one</h3>
                    <p>Short description of this feature and why it matters.</p>
                </div>
                <div className="feature-card animate-on-scroll delay-1">
                    <div className="feature-icon">🔒</div>
                    <h3>Feature two</h3>
                    <p>Short description of this feature and why it matters.</p>
                </div>
                <div className="feature-card animate-on-scroll delay-2">
                    <div className="feature-icon">📈</div>
                    <h3>Feature three</h3>
                    <p>Short description of this feature and why it matters.</p>
                </div>

            </section>
            <section className="about-story animate-on-scroll">
                <h2>About this project</h2>
                <p>
                    Write a paragraph here about what the app does, who it's for, and
                    why you built it. Keep it to 3-4 sentences for readability.
                </p>
            </section>

            <footer className="about-footer">
                <p>&copy; {new Date().getFullYear()} YourApp. All rights reserved.</p>
            </footer>
            <div className="corner-buttons">
                <button className="corner-btn corner-btn-primary" onClick={()=> ToHomePage()}>Get started</button>
                <button className="corner-btn corner-btn-secondary">Learn more</button>
            </div>
        </div>
    );

}
export default FirstLoadingPages
