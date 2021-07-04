import { addSeriesDTO } from '../item/addSeriesDTO.model';
export interface outflowDTO {
    client: string;
    type: string;
    items: addSeriesDTO[];
}