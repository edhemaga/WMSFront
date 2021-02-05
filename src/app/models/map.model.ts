import { FieldCore } from "./fieldCore.model";

export interface Map {
    id: string;
    floor: number;
    name: string;
    width: number;
    height: number;
    fields: FieldCore[];
}
