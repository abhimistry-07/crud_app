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

  allProducts: any = []

  ngOnInit() {
    this.url = environment.apiUrl;
  }

  addProductForm = new FormGroup({
    productName: new FormControl('Product 1'),
    discription: new FormControl('Discription 1'),
    price: new FormControl(0),
  });

  onSubmitForm() {
    this.addNewProduct();
    // console.log(this.addProductForm.value);
  }

  addNewProduct() {
    let product = this.addProductForm.value;

    this.http.post<any>(`${this.url}/evaluation.json`, product).subscribe((response) => {
      alert('Product added successfully!');
      this.addProductForm.reset();
    }, (error) => {
      console.log(error);
      alert('Something went wrong!')
    })
  }
}
