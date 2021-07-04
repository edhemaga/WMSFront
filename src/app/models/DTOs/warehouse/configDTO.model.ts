import { gridFieldDTO } from "./gridFieldDTO.model";

export interface configDTO {
    id: string,
    section: string;
    fields: gridFieldDTO[];
}