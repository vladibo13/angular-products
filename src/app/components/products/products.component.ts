import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../model/product';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.css' ]
})
export class ProductsComponent implements OnInit {
	products: Product[];
	error: any;
	myForm;
	constructor(private fb: FormBuilder, private productService: ProductService) {
		this.myForm = this.fb.group({
			name: '',
			amount: '',
			inventoryCode: ''
		});
	}

	getProducts() {
		this.productService
			.getAllProducts()
			.subscribe((products) => (this.products = products), (e) => (this.error = e));
	}

	addProduct(formValues: Product) {
		console.log(formValues);
		this.productService.save(formValues).subscribe((saved) => {
			console.log(saved);
			this.getProducts();
			this.myForm.reset();
		}, (e) => (this.error = e));
	}
	delete(id: number) {
		this.productService.delete(id).subscribe(() => this.getProducts(), (e) => (this.error = e));
	}
	ngOnInit() {
		this.getProducts();
		console.log(this.products);
	}
}
