import { describe, it, expect } from 'vitest';

// --- Функції, які ми тестуємо (можна уявити, що вони в App.jsx) ---
const filterProducts = (products, category) => products.filter(p => p.category === category);
const calculateTotal = (price, tax) => price + (price * tax);
const validateName = (name) => name.length > 0;
const applyDiscount = (price, discount) => price - (price * discount);

// --- Самі тести ---
describe('M-Bionica Expanded Tests', () => {
    const mockProducts = [
        { id: 1, name: 'Bionic Eye', category: 'Vision', price: 1000 },
        { id: 2, name: 'Bionic Arm', category: 'Limb', price: 5000 }
    ];

    // 1. Тест фільтрації (Успішний)
    it('повинен правильно фільтрувати товари за категорією Vision', () => {
        const result = filterProducts(mockProducts, 'Vision');
        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Bionic Eye');
    });

    // 2. Тест розрахунку ціни з податком (Успішний)
    it('повинен правильно рахувати ціну з ПДВ 20%', () => {
        const total = calculateTotal(100, 0.2);
        expect(total).toBe(120);
    });

    // 3. Тест валідації назви (Успішний)
    it('повинен підтверджувати, що назва не порожня', () => {
        expect(validateName('Bionic Leg')).toBe(true);
    });

    // 4. Тест знижки (Успішний)
    it('повинен правильно застосовувати знижку 10%', () => {
        const discounted = applyDiscount(1000, 0.1);
        expect(discounted).toBe(900);
    });

    // 5. Тест наявності бренду (Успішний)
    it('повинен містити назву проєкту M-Bionica', () => {
        const brand = "M-Bionica Store";
        expect(brand).toContain("M-Bionica");
    });

    // --- ПРОВАЛЬНІ ТЕСТИ (ДЛЯ ЗВІТУ) ---

    // 6. Провальний тест логіки (FAIL)
    it('ПЕРЕВІРКА ПОМИЛКИ: чи правильно працює фільтр (спеціальна помилка)', () => {
        const result = filterProducts(mockProducts, 'Vision');
        // Очікуємо 5 товарів, хоча в масиві лише 1. Тест впаде.
        expect(result.length).toBe(5);
    });

    // 7. Провальний тест назви (FAIL)
    it('ПЕРЕВІРКА ПОМИЛКИ: назва бренду має бути коректною', () => {
        const brandName = "M-Bionica";
        // Очікуємо "Bionica-Error", отримаємо "M-Bionica". Тест впаде.
        expect(brandName).toBe("Bionica-Error");
    });
});