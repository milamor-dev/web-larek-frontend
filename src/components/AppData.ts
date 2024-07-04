
import {FormErrors, IAppState, IProduct, IFullOrder, IBasket } from "../types";
import {Model} from "./base/Model";
import _ from "lodash";

export type CatalogChangeEvent = {
    catalog: ProductItem[];
};

export class ProductItem extends Model<IProduct> {
    description: string;
    id: string;
    image: string;
    title: string;    
    category: string;
    price: number | null;
}

export class AppState extends Model<IAppState> {
    basket: IBasket;
    catalog: IProduct[];
    order: IFullOrder = {
        paymentType: '',
        address: '',
        email: '',
        phone: '',
        items: [],
        total: 0,
        };
    preview: string;
    formErrors: FormErrors = {};

    toggleOrderedProduct(id: string, isIncluded: boolean) {
        if (isIncluded) {
        // Если товар должен быть включен в заказ, добавляем его id в массив,
        // используя оператор расширения (...) для создания нового массива,
        // и функцию _.uniq из библиотеки lodash для удаления дубликатов.
            this.order.items = _.uniq([...this.order.items, id]);
        } else {
        // Если товар должен быть исключен из заказа, удаляем его id из массива,
        // используя функцию _.without из библиотеки lodash.
            this.order.items = _.without(this.order.items, id);
        }
    }

    clearBasket() {
        this.order.items.forEach(id => {
            this.toggleOrderedProduct(id, false);
        });
    }

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new ProductItem(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setPreview(item: IProduct) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    // getBasketItems(): ProductItem[] {
    //     return this.catalog
    //         .filter(item => item.status === 'closed' && item.isMyBid)
    // }

    // setOrderField(field: keyof IFullOrder, value: string) {
    //     // Используем тип 'any' для value, чтобы можно было присваивать различные типы значений.
    //     // В реальном приложении следует использовать более строгую типизацию.
    //     this.order[field] = value;
    
    //     if (this.validateOrder()) {
    //         this.events.emit('order:ready', this.order);
    //     }
    // }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес доставки';
        }
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}