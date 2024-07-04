import './scss/styles.scss';

import {ProductAPI} from "./components/ProductAPI";
import {API_URL, CDN_URL} from "./utils/constants";
import {EventEmitter} from "./components/base/events";
import {AppState, CatalogChangeEvent, } from "./components/AppData";
import {Page} from "./components/Page";
import {CatalogItem, ProductItem} from "./components/Card";
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import {Modal} from "./components/common/Modal";
import {Basket} from "./components/Basket";
import {IFullOrder} from "./types";
import {Order} from "./components/Order";
import {Success} from "./components/Success";

const events = new EventEmitter();
const api = new ProductAPI(CDN_URL, API_URL);



// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview') as HTMLTemplateElement;
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket') as HTMLTemplateElement;
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket') as HTMLTemplateElement;
const orderTemplate = ensureElement<HTMLTemplateElement>('#order') as HTMLTemplateElement;
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts') as HTMLTemplateElement;
const successTemplate = ensureElement<HTMLTemplateElement>('#success') as HTMLTemplateElement;

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);

// Дальше идет бизнес-логика
// Поймали событие, сделали что нужно

// Изменились элементы каталога
events.on<CatalogChangeEvent>('items:changed', () => {
    page.catalog = appData.catalog.map(item => {
        const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('card:select', item)
        });
        return card.render({
            category: item.category,
            title: item.title,
            image: item.image,
            price: item.price,
        });
    });

    // page.counter = appData.getBasketItems().length;
});

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<IFullOrder>) => {
    const { email, phone } = errors;
    order.valid = !email && !phone;
    order.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
});

// // Изменилось одно из полей
// events.on(/^order\..*:change/, (data: { field: keyof IFullOrder, value: string }) => {
//     appData.setOrderField(data.field, data.value);
// });

// Открыть форму заказа
// events.on('order:open', () => {
//     modal.render({
//         content: order.render({
//             phone: '',
//             email: '',
//             valid: false,
//             errors: []
//         })
//     });
// });

// Открыть закрытые лоты
// events.on('basket:open', () => {
//     modal.render({
//         content: createElement<HTMLElement>('div', {}, [
//             tabs.render({
//                 selected: 'closed'
//             }),
//             basket.render()
//         ])
//     });
// });

// Открыть товар
events.on('card:select', (item: ProductItem) => {
    appData.setPreview(item);
});

// Изменен открытый выбранный товар
events.on('preview:changed', (item: ProductItem) => {
    const showItem = (item: ProductItem) => {
        const card = new ProductItem(cloneTemplate(cardPreviewTemplate));

        modal.render({
            content: card.render({
                category: item.category,
                title: item.title,
                image: item.image,
                price: item.price,
                description: item.description,
            })
        });       
    };

    if (item) {
        api.getProductItem(item.id)
            .then((result) => {
                item.description = result.description;
                showItem(item);
            })
            .catch((err) => {
                console.error(err);
            })
    } else {
        modal.close();
    }
});




// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
    page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
    page.locked = false;
});

// Получаем товары с сервера
api.getProductList()
    .then(appData.setCatalog.bind(appData))
    .catch(err => {
        console.log(err); // или console.error(err)
    });