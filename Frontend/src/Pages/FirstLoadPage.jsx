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
                    <h3>Real-Time Messaging</h3>
                    <p>Send and receive messages instantly using Socket.IO. Stay connected with zero delays and live message updates.</p>
                </div>
                <div className="feature-card animate-on-scroll delay-1">
                    <div className="feature-icon">🔒</div>
                    <h3>Secure Authentication</h3>
                    <p>Your account is protected with JWT authentication, encrypted passwords, and secure user sessions.</p>
                </div>
                <div className="feature-card animate-on-scroll delay-2">
                    <div className="feature-icon">📈</div>
                    <h3>Performance</h3>
                    <p>Enjoy a fast and responsive chatting experience with optimized message delivery, efficient data handling, and smooth navigation.</p>
                </div>

            </section>
            <section className="about-story animate-on-scroll">
                <h2>About this project</h2>
                <p>
                    Connection is a real-time communication platform developed using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). It enables users to communicate instantly through live messaging while ensuring secure authentication and a smooth user experience. The project demonstrates modern web development practices, including Socket.IO, REST APIs, JWT authentication, MongoDB, and responsive UI design.
                </p>
            </section>

            <footer className="about-footer">
                <p>&copy; {new Date().getFullYear()}Connection. All Rights Reserved.</p>
            </footer>
            <div className="corner-buttons">
                <button className="corner-btn corner-btn-primary" onClick={()=> ToHomePage()}>Get started</button>
                <button className="corner-btn corner-btn-secondary">Learn more</button>
            </div>
        </div>
    );

}
export default FirstLoadingPages
