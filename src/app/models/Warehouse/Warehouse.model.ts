import { StorageBin } from "./StorageBin/StorageBin.model";

export interface Warehouse {
    id: String;
    address: String;
    contactEmail: String;
    contactPhoneNumber: String;
    storageBins: StorageBin[];
}