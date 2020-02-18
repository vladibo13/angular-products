import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/model/product';
import { FormControl } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: [ './product-detail.component.css' ]
})
export class ProductDetailComponent implements OnInit {
	product: Product;
	withdrawalVal = new FormControl('');
	depositVal = new FormControl('');

	constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe((params) => {
			let id = params.get('id');
			this.productService.getProduct(id).subscribe((product) => (this.product = product));
		});
	}
	withdrawal(id: number, amount: number) {
		this.productService.toWithdrawal(id, amount).subscribe((product) => (this.product = product));
		this.withdrawalVal.reset();
		this.depositVal.reset();
	}
	deposit(id: number, amount: number) {
		this.productService.toDeposit(id, amount).subscribe((product) => (this.product = product));
		this.withdrawalVal.reset();
		this.depositVal.reset();
	}
}
