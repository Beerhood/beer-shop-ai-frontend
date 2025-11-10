import {inject} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * List parameters (filter, sort, limit, skip)
 * @param filter - Filter object (field, value)
 * @param sort - Sort object (field, direction 1 or -1)
 * @param limit - Limit number of items to return
 * @param skip - Skip number of items
 */
export interface IListParams {
  filter?: Record<string, unknown>;
  sort?: Record<string, 1 | -1>;
  limit?: number;
  skip?: number;
  search?: Record<string, unknown>;
}

export interface IListApiResponse<T> {
  items: T[];
  totalCount: number;
}

export interface ISingleApiResponse<T> {
  item: T;
}

/**
 * Utility function to transform string dates to Date objects in api response
 * @template T - Type of the object to transform
 * @param obj - Object to transform
 * @returns Transformed object
 */
export function transformDates<T>(obj: any): T {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => transformDates(item)) as T;
  }

  const transformed = {...obj};

  const dateFields = ['createdAt', 'updatedAt', 'expiresAt', 'birthDate'];

  for (const field of dateFields) {
    if (transformed[field] && typeof transformed[field] === 'string') {
      transformed[field] = new Date(transformed[field]);
    }
  }

  for (const key in transformed) {
    if (
      transformed[key] &&
      typeof transformed[key] === 'object' &&
      !(transformed[key] instanceof Date)
    ) {
      transformed[key] = transformDates(transformed[key]);
    }
  }

  return transformed as T;
}

/**
 * Base service with generic CRUD operations
 * @template T - Entity type 
 * @template ListResponse - List API response type 
 * @template SingleResponse - Single item API response type 
 */
export abstract class BaseService<T, ListResponse, SingleResponse> {
  protected readonly http = inject(HttpClient);
  protected abstract readonly apiUrl: string;

  /**
   * Get list of entities
   * @param params - List parameters (filter, sort, limit, skip)
   * @returns List of entities
   */
  getList(params?: IListParams): Observable<ListResponse> {
    const httpParams = this.getHttpParams(params || {});

    return this.http
      .get<any>(this.apiUrl, {params: httpParams})
      .pipe(map(response => transformDates<ListResponse>(response)));
  }

  /**
   * Get entity by id
   * @param id - Entity id
   * @returns Entity
   */
  getById(id: string): Observable<SingleResponse> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(map(response => transformDates<SingleResponse>(response)));
  }

  /**
   * Create entity
   * @param entity - Entity to create
   * @returns Created entity
   */
  create(entity: Partial<T>): Observable<SingleResponse> {
    return this.http
      .post<any>(this.apiUrl, entity)
      .pipe(map(response => transformDates<SingleResponse>(response)));
  }

  /**
   * Update entity
   * @param id - Entity id
   * @param entity - Entity to update
   * @returns Updated entity
   */
  update(id: string, entity: Partial<T>): Observable<SingleResponse> {
    return this.http
      .patch<any>(`${this.apiUrl}/${id}`, entity)
      .pipe(map(response => transformDates<SingleResponse>(response)));
  }

  /**
   * Rewrite entity
   * @param id - Entity id
   * @param entity - Entity to rewrite
   * @returns Rewritten entity
   */
  rewrite(id: string, entity: T): Observable<SingleResponse> {
    return this.http
      .put<any>(`${this.apiUrl}/${id}`, entity)
      .pipe(map(response => transformDates<SingleResponse>(response)));
  }

  /**
   * Delete entity
   * @param id - Entity id
   * @returns Deleted entity
   */
  delete(id: string): Observable<SingleResponse> {
    return this.http
      .delete<any>(`${this.apiUrl}/${id}`)
      .pipe(map(response => transformDates<SingleResponse>(response)));
  }

  protected getHttpParams(params: IListParams): HttpParams {
    let httpParams = new HttpParams();

    if (params?.filter) {
      httpParams = httpParams.set('filter', JSON.stringify(params.filter));
    }

    if (params?.sort) {
      httpParams = httpParams.set('sort', JSON.stringify(params.sort));
    }

    if (params?.limit) {
      httpParams = httpParams.set('limit', params.limit.toString());
    }

    if (params?.skip) {
      httpParams = httpParams.set('skip', params.skip.toString());
    }

    if (params?.search) {
      httpParams = httpParams.set('search', JSON.stringify(params.search));
    }

    return httpParams;
  }
}
