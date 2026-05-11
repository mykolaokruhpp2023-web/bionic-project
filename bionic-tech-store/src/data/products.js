import glassesImg from '../assets/glasses.png';
import bracerImg from '../assets/bracer.png';

export const products = [
    {
        id: 1,
        name: "Bionic Glass v1.0",
        shortDesc: "Інформаційні окуляри для розпізнавання небезпечних звуків.",
        fullDesc: "Наша флагманська розробка для людей з вадами слуху. Вбудовані високоточні мікрофони аналізують середовище. При виявленні різких звуків (автомобільний гудок, сирена) на лінзу миттєво виводиться візуальне попередження через систему інтегрованих діодів.",
        price: 12500,
        image: glassesImg,
        // Додаємо ідентифікатор для аналітики та прапорця
        posthogEvent: 'view_bionic_glass',
        hasPromo: 'special-offer-bionic' // Ключ для Feature Flag
    },
    {
        id: 2,
        name: "Tactile Wristband",
        shortDesc: "Тактильний браслет для дублювання сповіщень.",
        fullDesc: "Браслет, який синхронізується з окулярами Bionic Glass. Передає звукові сигнали через різні патерни вібрації. Ідеально підходить для ситуацій, коли візуальний контакт з екраном окулярів неможливий або обмежений.",
        price: 4500,
        image: bracerImg,
        posthogEvent: 'view_tactile_wristband'
    },
    {
        id: 3,
        name: "Sound-to-Light Hub",
        shortDesc: "Домашня станція візуалізації звуку.",
        fullDesc: "Перетворює звуки вашого дому (дзвінок у двері, таймер на кухні) на світлові спалахи. Допомагає орієнтуватися в побутових звуках без необхідності постійного носіння окулярів.",
        price: 6800,
        image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=600&auto=format&fit=crop",
        posthogEvent: 'view_sound_hub'
    },
{
        id: 999,
        name: "Акційна акція",
        shortDesc: "Спеціальна пропозиція, доступна лише через систему аналітики.",
        fullDesc: "Це тестова акційна картка для перевірки роботи Feature Flags. Якщо ви її бачите — значить прапорець у PostHog активовано успішно.",
        price: 10000,
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=600&auto=format&fit=crop",
        isPromoOnly: true 
    }
];