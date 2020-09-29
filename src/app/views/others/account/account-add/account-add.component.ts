import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Partner } from 'app/shared/models/partner';
import { TaikhoanService } from 'app/shared/services/web-partner/account.service';
import { PartnerService } from 'app/shared/services/web-partner/partnet.service';
import { CustomValidators } from 'ngx-custom-validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {
  //is_loading = false;
  partner: Partner[] = [];  
  formData = {};
  console = console;
  basicForm: FormGroup;
  customerServicec: any;
  subscriptions: Subscription[] = [];
  constructor(private accountServicec:TaikhoanService, private partnerService: PartnerService) {}

  ngOnInit() {
    this.loadData();
    this.createForm();
  }
  loadData(){
    this.subscriptions.push(
      this.partnerService.itemsObs.subscribe(data => {
          this.partner = data;            
      })
  );      
  }
  createForm(){
    let password = new FormControl("", Validators.required);
    let confirmPassword = new FormControl(
      "",
      CustomValidators.equalTo(password)
    );

    this.basicForm = new FormGroup({
      partnerID: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)
      ]),
      tenNhanvien: new FormControl("", [Validators.required]),
      chucVu: new FormControl("", [ Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]) ,
      name: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])     
    });
  }
  onSubmitForm(){       
    this.accountServicec.createNew(this.basicForm.value);
  }


}
