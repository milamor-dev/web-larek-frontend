import { Api, ApiListResponse } from './base/api';
import {IOrderResult, IProduct, IFullOrder} from "../types";

export interface IProductAPI {
    getProductList: () => Promise<IProduct[]>;
    getProductItem: (id: string) => Promise<IProduct>;
    orderProducts: (order: IFullOrder) => Promise<IOrderResult>;
}

export class ProductAPI extends Api implements IProductAPI {
    readonly cdn: string; // Переменная для хранения базового URL CDN

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);  // Вызов конструктора базового класса Api
        this.cdn = cdn;  // Инициализация переменной cdn
    }

    getProductList(): Promise<IProduct[]> {
        // Метод для получения списка товаров
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image, // Добавление полного пути к изображению
            }))
        );
    }

    getProductItem(id: string): Promise<IProduct> {
        // Метод для получения информации о товаре по ID
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image, 
            })
        );
    }

    orderProducts(order: IFullOrder): Promise<IOrderResult> {
        // Метод для оформления заказа товаров
        return this.post('/order', order).then(
            (data: IOrderResult) => data // Возвращение результата операции
        );
    }
}