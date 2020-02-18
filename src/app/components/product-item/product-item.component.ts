import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
	selector: 'app-product-item',
	templateUrl: './product-item.component.html',
	styleUrls: [ './product-item.component.css' ]
})
export class ProductItemComponent implements OnInit {
	@Input() product: Product;
	@Output() deleted = new EventEmitter();
	error: any;
	constructor(private productService: ProductService) {}

	ngOnInit() {}

	delete(id: number) {
		this.deleted.emit(id);
	}
}
