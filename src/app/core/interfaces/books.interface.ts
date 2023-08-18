export interface IBook {
    id?: number,
    inStock?: number,
    title: string,
    description: string,
    price: number,
    genres: number[],
    author: number[],
    releaseDate: string,
    writingDate: string,
}
