
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
        formErrors: FormErrors = {};

    toggleOrderedLot(id: string, isIncluded: boolean) {
        if (isIncluded) {
            this.order.items = _.uniq([...this.order.items, id]);
        } else {
            this.order.items = _.without(this.order.items, id);
        }
    }

    clearBasket() 

    getTotal() 

    setCatalog(items: IProduct[]) 

    setOrderField(field: keyof IFullOrder, value: string) 

    validateOrder()
}
