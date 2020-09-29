import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Partner } from 'app/shared/models/partner';
import { SanPham } from 'app/shared/models/sanpham.model';
import { ResultValidatorService } from 'app/shared/services/web-partner/result-validator.service';
import { SanPhamService } from 'app/shared/services/web-partner/sanpham.service';
import { Subscription } from 'rxjs';
import { ProductComponent } from '../product.component';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  is_loading = false;
  datePipe = new DatePipe('en');
  subscriptions: Subscription[] = [];
  sanpham;
  basicForm: FormGroup;
  constructor(
      private sanphamService: SanPhamService,
      private resultValidatorService: ResultValidatorService,
      private _formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<ProductComponent>,
      @Inject(MAT_DIALOG_DATA) public dataDialog: Partner
  ) {}
  ngOnInit() {
      this.sanpham = this.dataDialog;   
      this.loadData();
      this.createForm();
      
  }
  loadData() {
      this.subscriptions.push(
          this.sanphamService.isLoadingObs.subscribe(data => {
              this.is_loading = data;             
              
          })
      );      
  }
  createForm() {
      this.basicForm = this._formBuilder.group({
          id: [this.sanpham.id],
          tenSanpham: [
              this.sanpham.tenSanpham,
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(50)                    
              ]
          ]           
      });
  }
  onSubmitForm() {
    this.is_loading = true;      
    const formData = new FormData();
    for (const key in this.basicForm.value) {
        if (key === 'ngayMuahang') {
            this.basicForm.value[key] = this.datePipe.transform(
                this.basicForm.controls[key].value,
                'yyyy-MM-dd h:mm:ss'
            );
        }
        formData.append(key, this.basicForm.value[key]);
    }      
    this.sanphamService.update(formData);
  }
  onReset() {
      this.basicForm.controls['tenCongty'].setValue(this.sanpham.tenSanpham);
  }
  onValidator(controlName: string, status?: boolean) {
      return this.resultValidatorService.getResult(
          controlName,
          this.basicForm,
          status
      );
  }
  onValidatorBorderColor(controlName: string) {
      return this.resultValidatorService.getBorderColor(
          controlName,
          this.basicForm
      );
  }
  onValidatorTextColor(controlName: string) {
      return this.resultValidatorService.getTextColor(controlName, this.basicForm);
  }
  ngOnDestroy() {
      if (this.subscriptions) {
          this.subscriptions.forEach(e => {
              e.unsubscribe();
          });
      }
  }

}
