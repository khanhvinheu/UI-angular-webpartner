import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SanPhamService } from 'app/shared/services/web-partner/sanpham.service';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  formData = {};
  console = console;
  basicForm: FormGroup;

  constructor(private sanphamService:SanPhamService) {}

  ngOnInit() {
    this.createForm();
  }
  createForm(){
    let password = new FormControl("", Validators.required);
    let confirmPassword = new FormControl(
      "",
      CustomValidators.equalTo(password)
    );

    this.basicForm = new FormGroup({
      tenSanpham: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)
      ])      
    });
  }
  onSubmitForm(){
    this.sanphamService.createNew(this.basicForm.value);
  }


}
