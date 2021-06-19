import { OrderDetails } from '../models/orderdetails.model';

export interface Item {
    id?: string;
    barcode: number;
    label: string;
    minimalquantity: number;
    currentquantity: number;
    fragilityindex: number;
    addedon: Date;
    category: string;
}

