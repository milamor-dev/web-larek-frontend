export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export type IBasketProdact = Pick<IProduct, 'id' | 'title' | 'price'>;

export interface IBasket {
	items: IBasketProdact[];
	total: number;
}

export interface IFullOrder {
	paymentType?: string;
    address?: string;
	email?: string;
	phone?: string;
    total: number;
    items: string[];
}

export type IPaymentForm = Pick<IFullOrder, 'paymentType' | 'address'>;

export type IContactsForm = Pick<IFullOrder, 'email' | 'phone'>;

export type FormErrors = Partial<Record<keyof IFullOrder, string>>;

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IAppState {
	catalog: IProduct[]; 
	order: IFullOrder;
	basket: IBasket;	
	}
