import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) { }

  url: string = '';

  allProducts: any = [];

  showUpdateBtn: boolean = false;

  idOfProductToUpdate: number = 0;

  ngOnInit() {
    this.url = environment.apiUrl;
    this.fetchProducts();
  }

  addProductForm = new FormGroup({
    productName: new FormControl('Product 1'),
    discription: new FormControl('Discription 1'),
    price: new FormControl(0),
  });

  onSubmitForm() {
    if (this.showUpdateBtn) {
      this.updateProduct();
    } else {
      this.addNewProduct();
    }
  }

  addNewProduct() {
    let product = this.addProductForm.value;

    this.http.post<any>(`${this.url}/evaluation.json`, product).subscribe((response) => {
      alert('Product added successfully!');
      this.fetchProducts();
      this.addProductForm.reset();
    }, (error) => {
      console.log(error);
      alert('Something went wrong!')
    })
  }

  fetchProducts() {
    this.http.get<any>(`${this.url}/evaluation.json`).subscribe((response) => {
      let products = Object.keys(response).map((key) => ({
        _id: key.slice(0),
        ...response[key]
      }));
      this.allProducts = products;
      // console.log(this.allProducts);
    })
  }

  handleDelete(id: any) {
    this.http.delete<any>(`${this.url}/evaluation/${id}.json`).subscribe(() => {
      alert('Product deleted successfully.')
      this.fetchProducts();
    }, (error) => {
      console.log(error);
      alert('Something went wrong!')
    })
  }

  handleUpdateForm(product: any) {
    this.addProductForm.setValue({
      productName: product.productName,
      discription: product.discription,
      price: product.price
    });
    this.showUpdateBtn = true;
    this.idOfProductToUpdate = product._id
  }

  updateProduct() {
    let updatedProductData = this.addProductForm.value;

    this.http.patch<any>(`${this.url}/evaluation/${this.idOfProductToUpdate}.json`, updatedProductData)
      .subscribe(() => {
        alert('Product updated successfully.')
        this.fetchProducts();
        this.addProductForm.reset();
        this.showUpdateBtn = false;
      }, (error) => {
        console.log(error);
        alert('Something went wrong!')
      })
  }
}
