import { ItemDTO } from "./item.model";

export interface FieldDTO {
    x_Cord: number;
    y_Cord: number;
    walkable?: boolean;
    item?: ItemDTO;
}

