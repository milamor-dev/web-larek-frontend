
import {FormErrors, IAppState, IProduct, IFullOrder, IBasket } from "../types";

export type CatalogChangeEvent = {
    catalog: IProduct[];
};

export class AppState implements IAppState 
{
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

    toggleOrderedProduct(id: string, isIncluded: boolean)

    clearBasket() 

    getTotal() 

    setCatalog(items: IProduct[]) 

    setPreview(item: IProduct) 

    setOrderField(field: keyof IFullOrder, value: string) 

    validateOrder()
}
