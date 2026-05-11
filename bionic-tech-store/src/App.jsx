import { useState } from 'react';
import { products } from './data/products';
import './App.css';
import posthog from 'posthog-js'; // 1. Імпортуємо PostHog

function App() {
    const [activeTab, setActiveTab] = useState('products');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedProduct(null);
    };

    // 2. Функція для перегляду деталей (Крок 2)
    const handleOpenProduct = (product) => {
        posthog.capture('view_product_details', {
            product_name: product.name,
            category: 'Bionics'
        });
        setSelectedProduct(product);
    };

    const simulateHardwareError = () => {
        throw new Error("Bionic Hardware Sync Failure: Connection to Sound-to-Light Hub lost");
    };

    // 3. Функція для передзамовлення (Крок 2 - те, що ти питав)
    const handlePreorder = (product) => {
        posthog.capture('preorder_initiated', {
            product_name: product.name,
            price: product.price
        });
        alert(`Запит на передзамовлення ${product.name} надіслано!`);
    };
    
    posthog.onFeatureFlags(() => {
        
        console.log("Прапорці завантажено!");
    });

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="logo">M-Bionica</div>
                <div className="nav-links">
                    <button
                        className={activeTab === 'about' ? 'nav-btn active' : 'nav-btn'}
                        onClick={() => handleTabChange('about')}
                    >
                        Про компанію
                    </button>
                    <button
                        className={activeTab === 'products' ? 'nav-btn active' : 'nav-btn'}
                        onClick={() => handleTabChange('products')}
                    >
                        Каталог товарів
                    </button>
                </div>
            </nav>

            <main className="main-content">
                {activeTab === 'about' && !selectedProduct && (
                    <div className="about-section fade-in">
                        <h1>Розширюємо межі можливого</h1>
                        <p className="mission-text">
                            Ми розробляємо апаратні та програмні рішення...
                        </p>
                        <p>Статус системи: {import.meta.env.VITE_APP_STATUS}</p>

                        <h2>Наша команда</h2>
                        <div className="team-grid">
                            <div className="team-card">
                                <h3>Микола Округ</h3>
                                <p className="role">Hardware Developer & Project Manager</p>
                                <button onClick={simulateHardwareError}>Тест збою пристрою</button>
                            </div>
                            <div className="team-card">
                                <h3>Данило Юнак</h3>
                                <p className="role">Full-Stack Developer & UI/UX</p>
                            </div>
                            <div className="team-card">
                                <h3>Ігор Пашко</h3>
                                <p className="role">QA Testing & Marketing</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && !selectedProduct && (
                    <div className="products-section fade-in">
                        <h1 className="page-title">Наші розробки</h1>
                        <div className="product-grid">
                            {products.map(product => (
                                <div key={product.id} className="product-card" onClick={() => handleOpenProduct(product)}>

                                    {/* КРОК 3: Feature Flag для акції */}
                                    {product.id === 1 && posthog.isFeatureEnabled('special-offer-bionic') && (
                                        <div className="promo-badge" style={{ background: 'red', color: 'white', padding: '5px', position: 'absolute' }}>
                                            АКЦІЯ -10%
                                        </div>
                                    )}

                                    <img src={product.image} alt={product.name} className="product-img" />
                                    <div className="product-info">
                                        <h2>{product.name}</h2>
                                        <p className="short-desc">{product.shortDesc}</p>
                                        <div className="price-tag">{product.price} грн</div>
                                        <button className="details-btn">Детальніше</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedProduct && (
                    <div className="product-details fade-in">
                        <button className="back-btn" onClick={() => setSelectedProduct(null)}>
                            ← Повернутися до каталогу
                        </button>
                        <div className="details-layout">
                            <img src={selectedProduct.image} alt={selectedProduct.name} className="details-img" />
                            <div className="details-info">
                                <h1>{selectedProduct.name}</h1>
                                <p className="price-large">{selectedProduct.price} грн</p>
                                <div className="divider"></div>
                                <p className="full-desc">{selectedProduct.fullDesc}</p>

                                {/* КНОПКА ПЕРЕДЗАМОВЛЕННЯ З ПОДІЄЮ */}
                                <button
                                    className="buy-btn-large"
                                    onClick={() => handlePreorder(selectedProduct)}
                                >
                                    Оформити передзамовлення
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