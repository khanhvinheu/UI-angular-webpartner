import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from 'app/shared/services/web-partner/partnet.service';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-partner-add',
  templateUrl: './partner-add.component.html',
  styleUrls: ['./partner-add.component.scss']
})
export class PartnerAddComponent implements OnInit {

  formData = {};
  console = console;
  basicForm: FormGroup;

  constructor(private partnerService:PartnerService) {}

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
      tenCongty: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(200)
      ]),
      diaChi: new FormControl("", [Validators.required]),       
    });
  }
  onSubmitForm(){
    this.partnerService.createNew(this.basicForm.value);
  }

}
