export interface IPaginatedData<T> {
    links: {
        next: string,
        previous: string | null,
    },
    totalItems: number,
    totalPages: number,
    page: number,
    pageSize: number,
    result: T[],
}
