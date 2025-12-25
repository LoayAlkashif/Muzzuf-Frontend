export interface PagedResult<T> {
    data: T[];
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
}