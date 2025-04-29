import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesCache$: Observable<any> | null = null;

  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<any> {
    if (!this.categoriesCache$) {
      this.categoriesCache$ = this.httpClient.get(
        'https://ecommerce.routemisr.com/api/v1/categories'
      ).pipe(
        shareReplay(1)
      );
    }
    return this.categoriesCache$;
  }

  getSpecificCategories(id: string): Observable<any> {
    return this.httpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
  }

  // Method to clear cache if needed (e.g., after category updates)
  clearCache(): void {
    this.categoriesCache$ = null;
  }
}
