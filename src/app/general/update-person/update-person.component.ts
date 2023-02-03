import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';
import { PersonLookupComponent } from './../../academic/lookup/person-lookup/person-lookup.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-update-person',
  templateUrl: './update-person.component.html',
  styleUrls: ['./update-person.component.scss']
})
export class UpdatePersonComponent implements OnInit {
  isDisabled = false;
  value = '';
  options: FormGroup;

@ViewChild('idno2') idno2: any;
  constructor(public dialog: MatDialog,fb: FormBuilder,public global: GlobalService,private http: Http) {
  	 this.options = fb.group({
      idno: '',
      lrno: '',
      fname: '',
      mname: '',
      lname: '',
      suffix: '',
      gender: '',
      cstatus: '',
      bdate: '',
      cpno: '',
      telno:'',
    });
  }
  x=true
keyDownFunction(event) {
  if((event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus')&&this.x==true) {
    if (this.options.value.idno != '') {
      this.x=false;
    this.global.swalLoading('Loading Person Information');
    this.http.get(this.global.api+'Person/'+this.options.value.idno,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          
          this.global.swalClose();
          if (res.message!=undefined&&res.message=='Person found.') {
            this.isDisabled = true;
            this.options.value.lrno = res.data.lrNumber;
            this.options.value.fname = res.data.firstName;
            this.options.value.mname = res.data.middleName;
            this.options.value.lname = res.data.lastName;
            this.options.value.suffix = res.data.suffixName;
            this.options.value.gender = res.data.gender;
            this.options.value.cstatus = res.data.civilStatus;
            this.options.value.bdate = res.data.dateOfBirth;
            if (res.data.mobileNo=='(not defined)') {
              this.options.value.cpno = res.data.mobileNo;
            }else
              this.options.value.cpno = res.data.mobileNo.substr(1)
            this.options.value.telno = res.data.telNo;
          }else 
          {
            this.global.swalAlert(res.message,'','warning');
          }


          this.x=true;

        },Error=>{
          this.global.swalAlertError();
          this.x=true;
        });
    // rest of your code
    }
    // code...
  }
}


      studentlookup(): void {
        const dialogRef = this.dialog.open(PersonLookupComponent, {
          width: '600px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            this.options.value.idno = result.result;
            this.keyDownFunction('onoutfocus')
          }
        });
      }
clear(){
  this.isDisabled = false;
  this.options.value.idno = '';
  this.options.value.lrno = '';
  this.options.value.fname = '';
  this.options.value.mname = '';
  this.options.value.lname = '';
  this.options.value.suffix = '';
  this.options.value.gender = '';
  this.options.value.cstatus = '';
  this.options.value.bdate = '';
  this.options.value.cpno = '';
  this.options.value.telno = '';
}

onSubmitfunc(){
  var error = '';
  if (this.options.value.idno=='') {
    error = error + '*ID number must not be blank<br>';
  }
  if (this.options.value.fname=='') {
    error = error + '*First name must not be blank<br>';
  }
  if (this.options.value.lname=='') {
    error = error + '*Last name must not be blank<br>';
  }
  if (this.options.value.gender=='') {
    error = error + '*Gender must not be blank<br>';
  }
  if (this.options.value.cstatus=='') {
    error = error + '*Civil Status must not be blank<br>';
  }
  if (this.options.value.bdate=='') {
    error = error + '*Birth date must not be blank<br>';
  }
  if (this.isDisabled==false) {
    error = error + 'ID number must be valid';
  }

  if (error == '') {
    var x=''
    if (this.options.value.cpno=='(not defined)') {
        x='(not defined)';
      }else
      x="0"+this.options.value.cpno;
    this.global.swalLoading('Updating Person');

    let date = new Date(this.options.value.bdate).toLocaleString();

        this.http.put(this.global.api+'Person' ,{
          'lrNumber':this.options.value.lrno,
          'firstName':this.options.value.fname,
          'middleName':this.options.value.mname,
          'lastName':this.options.value.lname,
          'suffixName':this.options.value.suffix,
          'gender':this.options.value.gender,
          'civilStatus':this.options.value.cstatus,
          'dateOfBirth':date,
          'mobileNo':x,
          'telNo':this.options.value.telno,
          'idNumber':this.options.value.idno,
          'idNo': this.options.value.idno,
          "personType": 0,
          "nationality": '',
          "religion": '',
          "emailAddress": '',
        },this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              if (res.message=="0") {
                this.global.swalAlert("Update person failed!","USL record found!","warning");
              }else
                this.global.swalSuccess(res.message);
            },Error=>{
              this.global.swalAlertError();
              console.log(Error)
            });
  }else
  {
    this.global.swalAlert('The Following error has Occured',error,'error');
  }
}
  ngOnInit() {
  }

}
