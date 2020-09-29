import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'app/shared/models/customer.model';
import { CustomerService } from 'app/shared/services/web-partner/customer.service';
import { CustomValidators } from 'ngx-custom-validators';
import { Subscription } from 'rxjs';
import { CustomerComponent } from '../customer.component';
import { DatePipe } from '@angular/common';
import { ResultValidatorService } from 'app/shared/services/web-partner/result-validator.service';
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  is_loading = false;
  datePipe = new DatePipe('en');
  subscriptions: Subscription[] = [];
  Customer: Customer = null;
  basicForm: FormGroup;
  constructor(
      private customerService: CustomerService,
      private resultValidatorService: ResultValidatorService,
      private _formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<CustomerComponent>,
      @Inject(MAT_DIALOG_DATA) public dataDialog: Customer
  ) {}
  ngOnInit() {
      this.Customer = this.dataDialog;   
      this.loadData();
      this.createForm();
      
  }
  loadData() {
      this.subscriptions.push(
          this.customerService.isLoadingObs.subscribe(data => {
              this.is_loading = data;             
              
          })
      );      
  }
  createForm() {
      this.basicForm = this._formBuilder.group({
          id: [this.Customer.id],
          tenCongty: [
              this.Customer.tenCongty,
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(50)                    
              ]
          ],
          diaChi:[
            this.Customer.diaChi,
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(50)                
              ]
          ],
          website:[
            this.Customer.website,
            [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(50)
            ]
          ],
          tinhTrang:[
            this.Customer.tinhTrang,
            []
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
    this.customerService.update(formData);
  }
  onReset() {
      this.basicForm.controls['tenCongty'].setValue(this.Customer.tenCongty);
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
