export interface IMetaDataset {
    page: number,
    page_size: number,
    title?: string
    author?: string,
    genre?: string,
    price_gte?: string,
    price_lte?: string
}

export interface IFilter {
    title?: string,
    author?: string,
    genre?: string,
    price_gte?: string,
    price_lte?: string,
    writing_date_lte?: string,
    writing_date_gte?: string,
}
