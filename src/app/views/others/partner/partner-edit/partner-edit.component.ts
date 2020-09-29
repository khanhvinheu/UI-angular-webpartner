import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Partner } from 'app/shared/models/partner';
import { PartnerService } from 'app/shared/services/web-partner/partnet.service';
import { ResultValidatorService } from 'app/shared/services/web-partner/result-validator.service';
import { Subscription } from 'rxjs';
import { PartnerComponent } from '../partner.component';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.scss']
})
export class PartnerEditComponent implements OnInit {

  is_loading = false;
  datePipe = new DatePipe('en');
  subscriptions: Subscription[] = [];
  partner: Partner = null;
  basicForm: FormGroup;
  constructor(
      private partnerService: PartnerService,
      private resultValidatorService: ResultValidatorService,
      private _formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<PartnerComponent>,
      @Inject(MAT_DIALOG_DATA) public dataDialog: Partner
  ) {}
  ngOnInit() {
      this.partner = this.dataDialog;   
      this.loadData();
      this.createForm();
      
  }
  loadData() {
      this.subscriptions.push(
          this.partnerService.isLoadingObs.subscribe(data => {
              this.is_loading = data;             
              
          })
      );      
  }
  createForm() {
      this.basicForm = this._formBuilder.group({
          id: [this.partner.id],
          tenCongty: [
              this.partner.tenCongty,
              [
                  Validators.required,
                  Validators.minLength(2),
                  Validators.maxLength(50)                    
              ]
          ],
          diaChi:[
            this.partner.diaChi,
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
    this.partnerService.update(formData);
  }
  onReset() {
      this.basicForm.controls['tenCongty'].setValue(this.partner.tenCongty);
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
