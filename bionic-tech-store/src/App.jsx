import { useState, useEffect } from 'react'; // ОБОВ'ЯЗКОВО ОБИДВА
import { products } from './data/products';
import './App.css';
import posthog from 'posthog-js';
import * as Sentry from "@sentry/react";

function App() {
    const [showPromo, setShowPromo] = useState(false);
    const [activeTab, setActiveTab] = useState('products');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);

    // Стан для авторизації
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Чекаємо, поки PostHog завантажить прапорці
        posthog.onFeatureFlags(() => {
            if (posthog.isFeatureEnabled('promotion-flag')) {
                setShowPromo(true);
            }
        });
    }, []);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedProduct(null);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (email.length > 3 && password.length > 3) {
            const userData = {
                id: 'user_mykola_99',
                username: 'Okruh_Mykola',
                email: email
            };
            setUser(userData);
            setShowModal(false);

            posthog.identify(userData.id, { email: userData.email, name: userData.username });
            Sentry.setUser({ id: userData.id, email: userData.email, username: userData.username });
            posthog.capture('user_login_success');
        } else {
            alert("Введіть логін та пароль");
        }
    };
    useEffect(() => {
        // Новий спосіб для SDK v8
        return Sentry.startSpan({ name: "Load Products Tab" }, () => {
            // Тут імітація логіки завантаження
            console.log("Performance tracing active...");
        });
    }, [activeTab]); // Спрацьовує при зміні вкладок

    const handleLogout = () => {
        setUser(null);
        setEmail('');
        setPassword('');
        posthog.reset();
        Sentry.setUser(null);
    };

    const addToCart = (product) => {
        if (!user) return;
        setCart(prevCart => [...prevCart, product]);
        posthog.capture('added_to_cart', { product_name: product.name });
    };

    const simulateHardwareError = () => {
        throw new Error("Bionic Hardware Sync Failure: Connection to Sound-to-Light Hub lost");
    };

    return (
        <div className="app-container">
            {/* МОДАЛЬНЕ ВІКНО */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
                        <h2>Вхід у систему M-Bionica</h2>
                        <form onSubmit={handleLogin} className="modal-form">
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            <button type="submit" className="submit-login-btn">Увійти</button>
                        </form>
                    </div>
                </div>
            )}

            <nav className="navbar">
                <div className="logo">M-Bionica</div>
                <div className="nav-links">
                    <button onClick={() => handleTabChange('about')} className={activeTab === 'about' ? 'nav-btn active' : 'nav-btn'}>Про компанію</button>
                    <button onClick={() => handleTabChange('products')} className={activeTab === 'products' ? 'nav-btn active' : 'nav-btn'}>Каталог</button>
                    <div className="cart-counter">🛒 {cart.length}</div>
                    {user ? (
                        <div className="user-nav-block">
                            <span>{user.username}</span>
                            <button onClick={handleLogout} className="auth-trigger-btn logout">Вийти</button>
                        </div>
                    ) : (
                        <button onClick={() => setShowModal(true)} className="auth-trigger-btn login">Увійти</button>
                    )}
                </div>
            </nav>

            <main className="main-content">
                {/* ВКЛАДКА ПРО КОМПАНІЮ — ПОВЕРНУТО */}
                {activeTab === 'about' && (
                    <div className="about-section fade-in">
                        <h1>Розширюємо межі можливого</h1>
                        <p className="mission-text">Ми розробляємо апаратні та програмні рішення для кібернетичного покращення людського потенціалу.</p>

                        <h2>Наша команда</h2>
                        <div className="team-grid">
                            <div className="team-card">
                                <h3>Микола Округ</h3>
                                <p className="role">Hardware Developer & PM</p>
                                <button className="error-btn" onClick={simulateHardwareError}>Тест збою пристрою</button>
                            </div>
                            <div className="team-card">
                                <h3>Данило Юнак</h3>
                                <p className="role">Full-Stack Developer</p>
                            </div>
                            <div className="team-card">
                                <h3>Ігор Пашко</h3>
                                <p className="role">QA & Marketing</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* КАТАЛОГ ТОВАРІВ */}
                {activeTab === 'products' && !selectedProduct && (
                    <div className="products-container">

                        {/* КРОК 3: ВСТАВЛЯТИ СЮДИ */}
                        {showPromo && (
                            <div className="promo-banner fade-in" style={{
                                background: 'linear-gradient(90deg, #1e293b, #3b82f6)',
                                padding: '20px',
                                borderRadius: '12px',
                                marginBottom: '20px',
                                border: '1px solid #38bdf8',
                                color: 'white'
                            }}>
                                <h2 style={{ margin: 0 }}>🔥 Акційна пропозиція на Bionic Glass!</h2>
                                <p>Тільки для учасників тестування — знижка 15% на першу партію окулярів.</p>
                            </div>
                        )}

                        <div className="products-grid fade-in">
                            {products.map(product => (
                                <div key={product.id} className="product-card">
                                    {/* ... твій існуючий код карток ... */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ДЕТАЛІ ТОВАРУ */}
                {selectedProduct && (
                    <div className="details-view fade-in">
                        <button className="back-link" onClick={() => setSelectedProduct(null)}>← Назад</button>
                        <div className="details-layout">
                            <div className="details-img-wrapper">
                                <img src={selectedProduct.image} alt={selectedProduct.name} />
                            </div>
                            <div className="details-info">
                                <h1>{selectedProduct.name}</h1>
                                <p className="price-large">{selectedProduct.price} грн</p>
                                <p className="full-desc">{selectedProduct.fullDesc}</p>
                                <button
                                    className={`huge-order-btn ${!user ? 'is-locked' : 'is-active'}`}
                                    disabled={!user}
                                    onClick={() => alert('Замовлення прийнято!')}
                                >
                                    {user ? 'Оформити замовлення' : 'Функція заблокована'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;