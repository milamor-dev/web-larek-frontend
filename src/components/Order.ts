import {Form} from "./common/Form";
import {IFullOrder} from "../types";
import {EventEmitter, IEvents} from "./base/events";
import {ensureElement} from "../utils/utils";

export class Order extends Form<IFullOrder> {
    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
    }

    set paymentType(value: string) {

    }

    set address(value: string) {
        
    }

    set phone(value: string) {
        (this.container.elements.namedItem('phone') as HTMLInputElement).value = value;
    }

    set email(value: string) {
        (this.container.elements.namedItem('email') as HTMLInputElement).value = value;
    }
}