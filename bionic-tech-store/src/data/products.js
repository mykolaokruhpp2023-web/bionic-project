import glassesImg from '../assets/glasses.png';
import bracerImg from '../assets/bracer.png';

// Обов'язково додаємо export
export const products = [
    {
        id: 1,
        name: "Bionic Glass v1.0",
        shortDesc: "Інформаційні окуляри для розпізнавання небезпечних звуків.",
        fullDesc: "Наша флагманська розробка для людей з вадами слуху...",
        price: 12500,
        image: glassesImg,
        posthogEvent: 'view_bionic_glass',
        hasPromo: 'special-offer-bionic'
    },
    {
        id: 2,
        name: "Tactile Wristband",
        shortDesc: "Тактильний браслет для дублювання сповіщень.",
        fullDesc: "Браслет, який синхронізується з окулярами Bionic Glass...",
        price: 4500,
        image: bracerImg,
        posthogEvent: 'view_tactile_wristband'
    },
    {
        id: 3,
        name: "Sound-to-Light Hub",
        shortDesc: "Домашня станція візуалізації звуку.",
        fullDesc: "Перетворює звуки вашого дому на світлові спалахи...",
        price: 6800,
        image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=600&auto=format&fit=crop",
        posthogEvent: 'view_sound_hub'
    },
    {
        id: 999,
        name: "Акційна акція",
        shortDesc: "Спеціальна пропозиція через PostHog.",
        fullDesc: "Це тестова акційна картка для перевірки Feature Flags.",
        price: 10000,
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop",
        isPromoOnly: true // Мітка, що це акційний товар
    }
]; // Перевірте наявність цієї крапки з комою