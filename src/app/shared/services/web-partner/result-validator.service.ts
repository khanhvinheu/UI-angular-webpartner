import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ResultValidatorService {
    constructor() {}
    getResult(controlName: string, frm: FormGroup, status?: boolean) {
        if (frm) {
            if (frm.controls[controlName].status === 'INVALID') {
                if (
                    frm.controls[controlName].errors.required &&
                    frm.controls[controlName].dirty
                ) {
                    return '* Nội dung không được để trống';
                }
                if (
                    frm.controls[controlName].errors.minlength &&
                    frm.controls[controlName].dirty
                ) {
                    return '* Nội dung phải chứa ít nhất 6 ký tự';
                }
                if (
                    frm.controls[controlName].errors.maxlength &&
                    frm.controls[controlName].dirty
                ) {
                    return '* Nội dung chứa tối đa 50 kí tự';
                }
                if (
                    frm.controls[controlName].errors.pattern &&
                    frm.controls[controlName].dirty
                ) {
                    return '* Kí tự không hợp lệ';
                }
                if(
                    frm.controls[controlName].errors.email &&
                    frm.controls[controlName].dirty
                ){
                    return '* Vui lòng nhập đúng định dạng email'
                }
                if (
                    frm.controls[controlName].errors.maxSize &&
                    typeof frm.controls[controlName].value !== 'string'
                ) {
                    return '* Kích thước file quá lớn';
                }
                if (
                    frm.controls[controlName].errors.extension &&
                    typeof frm.controls[controlName].value !== 'string'
                ) {
                    return '* File không đúng đinh dạng';
                }
                if (frm.controls[controlName].errors.passwordnotmatch) {
                    return '* Mật khẩu chưa khớp';
                }
            } else {
                if (frm.controls[controlName].dirty || status) {
                    return '<i class=\'fas fa-check-circle\'></i>';
                }
            }
        }
        return null;
    }
    getIcon(controlName: string, frm: FormGroup, status?: boolean) {
        if (frm) {
            if (frm.controls[controlName].status === 'INVALID') {
                return '<i class=\'fas fa-exclamation-triangle\'></i>';
            } else {
                if (frm.controls[controlName].dirty || status) {
                    return '<i class=\'fas fa-check-circle\'></i>';
                }
            }
        }
        return null;
    }
    getBorderColor(controlName: string, frm: FormGroup) {
        if (frm) {
            if (frm.controls[controlName].dirty) {
                if (frm.controls[controlName].status === 'INVALID') {
                    return 'border-danger';
                } else {
                    return 'border-success';
                }
            }
        }
        return null;
    }
    getTextColor(controlName: string, frm: FormGroup) {
        return frm
            ? frm.controls[controlName].status === 'INVALID'
                ? 'text-danger'
                : 'text-success'
            : null;
    }
}
