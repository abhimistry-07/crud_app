import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  addProductForm = new FormGroup({
    productName: new FormControl(''),
    discription: new FormControl(''),
    price: new FormControl(''),
  });


  onSubmitForm() {
    console.log(this.addProductForm.value);
  }

  ngOnInit() {
  }

}
