import { IProduct } from "../types";
import {Component} from "./base/Component";
import {ensureElement} from "../utils/utils";

interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export class Card extends Component<IProduct> {
    protected _category?: HTMLElement; 
    protected _title: HTMLElement; 
    protected _image?: HTMLImageElement;
    protected _description?: HTMLElement;
    protected _button?: HTMLButtonElement;
    protected _price: HTMLElement; 

    constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions) {
        super(container);

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = container.querySelector(`.${blockName}__image`);
        this._button = container.querySelector(`.${blockName}__button`);
        this._description = container.querySelector(`.${this.blockName}__text`);
        this._category = container.querySelector(`.${blockName}__category`);
        this._price = container.querySelector(`.${blockName}__price`);

        if (actions?.onClick) {
            if (this._button) {
                this._button.addEventListener('click', actions.onClick);
            } else {
                container.addEventListener('click', actions.onClick);
            }
        }
    }
    
    set id(value: string) {
        this.container.dataset.id = value;
    }

    get id(): string {
        return this.container.dataset.id || '';
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    get title(): string {
        return this._title.textContent || '';
    }

    set category(value: string) {
        this.setText(this._category, value);
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set description(value: string ) {
        {
            if (Array.isArray(value)) {
                this._description.replaceWith(...value.map(str => {
                    const descTemplate = this._description.cloneNode() as HTMLElement;
                    this.setText(descTemplate, str);
                    return descTemplate;
                }));
            } else {
                this.setText(this._description, value);
            }
        }
    }

    set price(value: number | null) {
        if(value !== null) { 
            this.setText(this._price, value + ' синапсов')
        } else {
            this.setText(this._price, 'Бесценно')}

        // блокировка кнопки для бесценного товара
            if (this._button && value === null) {
            this._button.disabled = true;
        }
    }

    // switchButtonText(item: ProductItem) {
    //     if (item.inBasket) {
    //         this.setText(this._button, 'Убрать из корзины');
    //     } else {
    //         this.setText(this._button, 'В корзину');
    //     }
    // }
}

export class CatalogItem extends Card {

    constructor(container: HTMLElement, actions?: ICardActions) {
        super('card', container, actions);
    }
} 

// это заменила на export class ProductItem extends CatalogItem {}
// export class ProductItem extends Card {

//     constructor(container: HTMLElement, actions?: ICardActions) {
//         super('card', container, actions);
//     }
// } 

export class ProductItem extends CatalogItem {}






