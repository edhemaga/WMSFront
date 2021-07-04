export interface orderDTO {
    barcode: number,
    label: string,
    dateOfProduction: Date,
    dateOfExpiration: Date,
    quantity: number,
    createdOn: Date,
    type: string,
    client: string
}