import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ProductService {
	products = [];
	private productsUrl = 'http://localhost:8080/api/products';

	constructor(private http: HttpClient) {}

	getAllProducts(): Observable<Product[]> {
		return this.http.get<Product[]>(this.productsUrl).pipe(map((data) => data), catchError(this.handleError));
	}

	getProduct(id: string): Observable<Product> {
		return this.http.get<Product>(this.productsUrl + '/' + id);
	}

	save(product: Product) {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post<Product>(this.productsUrl, product).pipe(catchError(this.handleError));
	}

	delete(id: number) {
		return this.http.delete<Product>(this.productsUrl + '/' + id).pipe(catchError(this.handleError));
	}

	toDeposit(id: number, amountToDeposit: number) {
		return this.http
			.put<Product>(`${this.productsUrl}/${id}/d/${amountToDeposit}`, null)
			.pipe(catchError(this.handleError));
	}

	toWithdrawal(id: number, amountToDeposit: number) {
		return this.http
			.put<Product>(`${this.productsUrl}/${id}/w/${amountToDeposit}`, null)
			.pipe(catchError(this.handleError));
	}

	private handleError(res: HttpErrorResponse | any) {
		console.error(res.error || res.body.error);
		return observableThrowError(res.error || 'Server error');
	}
}
