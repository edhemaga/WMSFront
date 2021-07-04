import { addSeriesDTO } from '../item/addSeriesDTO.model';
export interface inflowDTO {
    client: string;
    type: string;
    series: addSeriesDTO[];
}