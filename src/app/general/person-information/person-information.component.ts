import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PersonInfoCheckComponent } from './person-info-check/person-info-check.component';
import { PersonAssignApplicantComponent } from './person-assign-applicant/person-assign-applicant.component';

const swal = Swal;
@Component({
  selector: 'app-person-information',
  templateUrl: './person-information.component.html',
  styleUrls: ['./person-information.component.scss']
})
export class PersonInformationComponent implements OnInit {
	value = '';
  options: FormGroup;
idseries= null;
fname=''
mname=''
lname=''
suffix=''
checkupdate
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
      telno: '',
    });

    var dt = new Date();
    this.idseries = dt.getFullYear().toString().substring(2,4);
    if (this.global.idseries != null) {
     this.idseries = this.global.idseries;
    }
  }
clear(){
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
  this.checkapplicant = false
 this.fname=''
 this.mname=''
 this.lname=''
 this.suffix=''
}

seridseries(){
  swal.fire({
  title: 'ID Series',
  input: 'number',
  inputAttributes: {
    autocapitalize: 'off',
    max: '99',
    value: this.idseries,
    min: "0",
    maxlength:"2"
  },
  showCancelButton: true,
  confirmButtonText: 'Save',
  showLoaderOnConfirm: true,
  preConfirm: (login) => {
    if (login!="") {
      this.idseries = login;
      this.global.setidseries(login)
    }
  },
  allowOutsideClick: () => !Swal.isLoading()
}).then((result) => {
})
}

openDialog(): void {
  var error ="";
  if (this.options.value.lname=='') {
   error=error+"*Last name must not be empty.<br>"
  }
      if (error=='') {
          const dialogRef = this.dialog.open(PersonInfoCheckComponent, {
              width: '700px', disableClose: false, data:{lname:this.options.value.lname}
            });

            dialogRef.afterClosed().subscribe(result => {
              //console.log(result)
              if (result!=undefined) {

              }
            });
      }
      else{
        this.global.swalAlert("Field Required!",error,"warning")
      }    
    }
result
checkapplicant = false
openDialog2(): void {
          const dialogRef = this.dialog.open(PersonAssignApplicantComponent, {
              width: '900px', disableClose: false, data:{lname:this.options.value.lname}
            });
            dialogRef.afterClosed().subscribe(result => {
              //console.log(result)
   console.log(result)
              if (result!=undefined) {
                if (result.result=='cancel') {
                  // code...
                }else{
                  this.options.value.cstatus = 'S';
                  this.options.value.fname = result.result.firstName;
                  this.options.value.mname = result.result.middleName;
                  this.options.value.lname = result.result.lastName;
                  this.options.value.suffix = result.result.suffixName;
                  this.options.value.bdate = result.result.dateOfBirth;
                  this.options.value.gender = result.result.gender;
                  this.options.value.cpno = result.result.contactNumber.substring(1);
                  this.options.value.telno = '';
                  this.checkapplicant = true  
                  this.result = result.result   
                   this.fname=result.result.firstName
                   this.mname=result.result.middleName
                   this.lname=result.result.lastName
                   this.suffix=result.result.suffixName
                }
              }
            });   
    }
onSubmit(){
  var error = '';
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
  if (this.idseries.replace(" ", "").length==1) {
    error = error + '*Invalid ID series<br>';
  }

  if (error == '') {

    if (this.checkapplicant) {
      if (this.options.value.suffix == undefined||this.options.value.suffix == null) {
        this.options.value.suffix=''
      }
      if (this.fname==this.options.value.fname&&this.mname==this.options.value.mname&&this.lname==this.options.value.lname&&this.suffix==this.options.value.suffix) {
          this.updateit()
      }else{
        this.updaterec()
      }
    }else{
      this.updateit()
    }
    
  }else
  {
    this.global.swalAlert('The Following error has Occured',error,'warning');
  }

}
  ngOnInit() {
  }


  updaterec(){
    this.swalConfirm("Warning","Applican Information has been updated!",'warning','Proceed','','','sy');
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove)
  {
    swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='sy') {
              this.updateit()
          }
        }
      })
  }

updateit(){
  let date = new Date(this.options.value.bdate).toLocaleString();
    this.global.swalLoading('Registering Person');
    this.http.post(this.global.api+'Person?idseries='+this.idseries ,{
      'lrNumber':this.options.value.lrno,
      'firstName':this.options.value.fname,
      'middleName':this.options.value.mname,
      'lastName':this.options.value.lname,
      'suffixName':this.options.value.suffix,
      'gender':this.options.value.gender,
      'civilStatus':this.options.value.cstatus,
      'dateOfBirth':date,
      'mobileNo': "0" + this.options.value.cpno,
      'telNo':this.options.value.telno,
      'idNumber':'',
      'idNo':'',
    },this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            if (res.data[0]==undefined) {
              if (res.message=='The person you are trying to add already exists.')
              this.global.swalAlert(res.message,"ID Number: "+res.data.idnumber+"<br>",'warning');
              else
              this.global.swalAlert(res.message,"ID Number: "+res.data.idnumber+"<br>",'success');
            }else{
              if (this.checkapplicant) {
                this.updateapplicantandmanager(res.data)
              }
            this.global.swalAlert(res.message,"ID Number: "+res.data+"",'success');
            }
          },Error=>{
            //console.log(Error);
            this.global.swalAlertError();
            console.log(Error)
          });
}
    updateapplicantandmanager(id){
      this.http.put(this.global.api+'OnlineRegistration/Applicant/IDNumber/'+this.result.applicantNo ,{
              "IDNumber": id.toString()
            },this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                      console.log(res)
                    this.http.put(this.global.api+'Placement/'+id ,{
                              "ExamDate": "",
                              "PreferredCourse": this.result.preferreCourse,
                              "AlternativeCourse": this.result.alternativeCourse1,
                              "Level": 0,
                              "VIT": 0,
                              "NVIT": 0,
                              "PreferredCourseId": this.result.preferredCourseID,
                              "AlternativeCourseId1": this.result.alternativeCourseID1,
                              "AlternativeCourseId2": this.result.alternativeCourseID2,
                              "ExemptionType": 0,
                              "Strand": this.result.strandId,
                              "Result": "",
                              "GResult": "",
                              "TestSchedule": 0,
                              "ExamRoom": 0,
                              "ExamForSchoolYear": "",
                              "Elem_ExamResult": "",
                              "Elem_CourseId": "",
                              "Elem_Course": "",
                              "JHS_ExamResult": "",
                              "JHS_CourseId": "",
                              "JHS_Course": "",
                              "SHS_ExamResult": "",
                              "SHS_PriorityStrandId1": this.result.shS_PriorityStrandID1,
                              "SHS_PriorityStrand1": this.result.shS_PriorityStrand1,
                              "SHS_PriorityStrandId2": this.result.shS_PriorityStrandID2,
                              "SHS_PriorityStrand2": this.result.shS_PriorityStrand2
                          },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                              },Error=>{
                                this.global.swalAlertError();
                                console.log(Error)
                        });
                    },Error=>{
                      this.global.swalAlertError();
                      console.log(Error)
              });
    }
}
