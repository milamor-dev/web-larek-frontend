import {Form} from "./common/Form";
import {IFullOrder} from "../types";
import {EventEmitter, IEvents} from "./base/events";


export class Order extends Form<IFullOrder> {
    constructor(container: HTMLFormElement, events: IEvents) 

    set paymentType(value: string) 

    set address(value: string) 

    set phone(value: string) 

    set email(value: string) 
}