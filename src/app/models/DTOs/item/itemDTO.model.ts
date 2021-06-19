import { seriesDTO } from './seriesDTO.model'

export interface ItemDTO {
    id?: string;
    barcode: number;
    label: string;
    currentQuantity?: number;
    category: string;
    minimalQuantity: number;
    series?: seriesDTO[];
}
