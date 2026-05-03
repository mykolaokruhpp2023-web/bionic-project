import React, { useState } from 'react';
import { products } from './data/products';
import './App.css';

function App() {
  // Стани для керування тим, що зараз бачить користувач
  const [activeTab, setActiveTab] = useState('products'); // 'products' або 'about'
  const [selectedProduct, setSelectedProduct] = useState(null); // null або об'єкт товару

  // Функція для скидання вибраного товару при зміні вкладки
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedProduct(null);
  };

  return (
    <div className="app-container">
      {/* Навігаційна панель */}
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

      {/* Основний контент */}
      <main className="main-content">
        
        {/* ВКЛАДКА: ПРО КОМПАНІЮ */}
        {activeTab === 'about' && !selectedProduct && (
          <div className="about-section fade-in">
            <h1>Розширюємо межі можливого</h1>
            <p className="mission-text">
              Ми розробляємо апаратні та програмні рішення, що допомагають людям з вадами слуху 
              вільно та безпечно почуватися в сучасному світі. Наша мета — інтеграція кібернетичних 
              технологій у повсякденне життя для подолання фізичних бар'єрів.
            </p>
            
            <h2>Наша команда</h2>
            <div className="team-grid">
              <div className="team-card">
                <h3>Микола Округ</h3>
                <p className="role">Hardware Developer & Project Manager</p>
                <p>Проєктування систем, управління розробкою та архітектура пристроїв.</p>
              </div>
              <div className="team-card">
                <h3>Данило Юнак</h3>
                <p className="role">Full-Stack Developer & UI/UX</p>
                <p>Програмна реалізація, створення інтерфейсів та користувацького досвіду.</p>
              </div>
              <div className="team-card">
                <h3>Ігор Пашко</h3>
                <p className="role">QA Testing & Marketing</p>
                <p>Тестування надійності, просування продукту та стратегія виходу на ринок.</p>
              </div>
            </div>
          </div>
        )}

        {/* ВКЛАДКА: КАТАЛОГ ТОВАРІВ */}
        {activeTab === 'products' && !selectedProduct && (
          <div className="products-section fade-in">
            <h1 className="page-title">Наші розробки</h1>
            <div className="product-grid">
              {products.map(product => (
                <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
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

        {/* СТОРІНКА: ДЕТАЛІ ТОВАРУ */}
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
                <button className="buy-btn-large">Оформити передзамовлення</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;