  import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import {Http, Headers, RequestOptions} from '@angular/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ManageSyComponent } from './manage-sy/manage-sy.component';
import { UpdateComponent } from './manage-sy/update/update.component';

import Swal from 'sweetalert2';
const swal = Swal;

@Component({
  selector: 'app-school-year-setting',
  templateUrl: './school-year-setting.component.html',
  styleUrls: ['./school-year-setting.component.scss']
})
export class SchoolYearSettingComponent implements OnInit {
	  sylist
    selectedsy

    elemAdmission
    enrollment
    facultyGradeEntry
    gradeEntry
    gsAdmission
    hsAdmission
    hsEnrollment
    lockCodes
    requireAdmission
    onlineEnrollment

    elemAdmissionarray=[]
    enrollmentarray=[]
    facultyGradeEntryarray=[]
    gradeEntryarray=[]
    gsAdmissionarray=[]
    hsAdmissionarray=[]
    hsEnrollmentarray=[]
    lockCodesarray=[]
    requireAdmissionarray=[]
    onlineEnrollmentarray=[]

    jhsGrade7Enrollmentarray=[]
    jhsEnrollmentarray=[]
    shsEnrollmentarray=[]
    shsGrade11Enrollmentarray=[]

    raoption

    eoption
    selectedsem = '';
    admissioncheck= false
    enrollmentcheck= false
    
    jhsGrade7Enrollment=0
    shsEnrollment=0
    shsGrade11Enrollment=0
    constructor(public dialog: MatDialog,private http: Http,public global: GlobalService,private router: Router,private cookieService: CookieService) {
     }
     checkcoladmission=''
      checkelemadmission=''
      checkhsadmission=''
      checkonge=''
     freshmen
     run(){
       this.global.swalLoading("")
       this.checkonfy=''
       this.checkong7=''
       this.checkong11=''
       this.checkcoladmission=''
       this.checkelemadmission=''
       this.checkhsadmission=''
       this.checkonge=''
       this.http.get(this.global.api+'Maintenance/SYOptionsList',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.sylist=res.data
            this.loadactive(res.data.length-1)
          },Error=>{
             this.global.swalAlertError();
          });

     }

  checkonfy=''
  checkong7=''
  checkong11=''
  loadactive(i){
    this.http.get(this.global.api+'Admission/SYSettings/'+this.sylist[i].syWithSem,this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        if (res.data.onlineEnrollment==1) {
          if (this.checkonfy!='') {
           this.checkonfy='too many open'
          }else
           this.checkonfy=this.sylist[i].syWithSem
        }
        if (res.data.jhsGrade7Enrollment==1) {
          if (this.checkong7!='') {
           this.checkong7='too many open'
          }else
           this.checkong7=this.sylist[i].syWithSem
        }

        if (res.data.shsGrade11Enrollment==1) {
          if (this.checkong11!='') {
           this.checkong11='too many open'
          }else
           this.checkong11=this.sylist[i].syWithSem
        }
         

        if (res.data.elemAdmission==1) {
          if (this.checkelemadmission!='') {
           this.checkelemadmission='too many open'
          }else
           this.checkelemadmission=this.sylist[i].syWithSem
        }


        if (res.data.requireAdmission==1||res.data.requireAdmission==0) {
          if (this.checkcoladmission!='') {
           this.checkcoladmission='too many open'
          }else
           this.checkcoladmission=this.sylist[i].syWithSem
        }


        if (res.data.hsAdmission==1) {
          if (this.checkhsadmission!='') {
           this.checkhsadmission='too many open'
          }else
           this.checkhsadmission=this.sylist[i].syWithSem
        }


        if (res.data.gradeEntry==1) {
          if (this.checkonge!='') {
           this.checkonge='too many open'
          }else
           this.checkonge=this.sylist[i].syWithSem
        }



       if (i==0) {
        this.global.swalClose()
       }else{
         this.loadactive(i-1)
       }
      },Error=>{
             this.global.swalAlertError();
          });
  }   

  ngOnInit() {
    this.run()

    this.selectedsem = this.global.syear;
    this.activate(this.selectedsem)
  }
  sem=2;
  display(x){
    var y = x.substring(0,4)
    var z = parseInt(y) + 1
    var a = y.toString() + " - " + z.toString();
    var b = x.substring(6,7)
    var c
    if (b==1)
      c="First Semester"
    else if (b==2)
      c="Second Semester"
    else
      c="Summer"
    return "School Year "+a + " " + c
  }
  x=true
  activate(x){
  this.selectedsy=x
  if (this.x==true) {
    this.x=false
    this.sem=x.substring(6,7);
    this.http.get(this.global.api+'Admission/SYSettings/'+x,this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        if (res.data==null) {
          this.global.swalAlert('Invalid School Year!','','warning');
          this.selectedsy = undefined;
        }else{
          this.elemAdmission = res.data.elemAdmission
          this.facultyGradeEntry = res.data.facultyGradeEntry
          this.gradeEntry = res.data.gradeEntry
          this.gsAdmission = res.data.gsAdmission
          this.hsAdmission = res.data.hsAdmission
          this.hsEnrollment = res.data.hsEnrollment
          this.lockCodes = res.data.lockCodes
          this.requireAdmission = res.data.requireAdmission
          this.onlineEnrollment = res.data.onlineEnrollment
          this.jhsGrade7Enrollment=res.data.jhsGrade7Enrollment
          this.shsEnrollment=res.data.shsEnrollment
          this.shsGrade11Enrollment=res.data.shsGrade11Enrollment

          if (this.requireAdmission==-1) {this.admissioncheck= false
          }else if (this.requireAdmission==0) {
            this.raoption = '0';
            this.admissioncheck= true}
            else {this.raoption = '1';this.admissioncheck= true}


          this.enrollment = res.data.enrollment
          if (this.enrollment==-1) {
            this.enrollmentcheck= false
          }else if (this.enrollment==0) {
            this.eoption = '0';
            this.enrollmentcheck= true
          }else {
            this.eoption = '1';
            this.enrollmentcheck= true}
          var a
          for (var i = 0; i < 14; ++i) {  
            if (i==0) {a='elemAdmission'}else
            if (i==1) {a='enrollment'}else
            if (i==2) {a='facultyGradeEntry'}else
            if (i==3) {a='gradeEntry'}else
            if (i==4) {a='gsAdmission'}else
            if (i==5) {a='hsAdmission'}else
            if (i==6) {a='nein'}else
            if (i==7) {a='lockCodes'}else
            if (i==8) {a='requireAdmission'}else
            if (i==9) {a='onlineEnrollment'}else
            if (i==10) {a='JHSGrade7Enrollment'}else
            if (i==11) {a='HSEnrollment'}else
            if (i==12) {a='SHSGrade11Enrollment'}else
            if (i==13) {a='SHSEnrollment'}

            this.http.get(this.global.api+'Enrollment/EnrollmentSettingValueMapper/'+a,this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              if (res.data.length!=0) {
                if (res.data[0].headerName=='ElemAdmission') {this.elemAdmissionarray=res.data}else
                if (res.data[0].headerName=='Enrollment') {this.enrollmentarray=res.data}else
                if (res.data[0].headerName=='FacultyGradeEntry') {this.facultyGradeEntryarray=res.data}else
                if (res.data[0].headerName=='GradeEntry') {this.gradeEntryarray=res.data}else
                if (res.data[0].headerName=='GSAdmission') {this.gsAdmissionarray=res.data}else
                if (res.data[0].headerName=="HSAdmission") {this.hsAdmissionarray=res.data}else
                if (res.data[0].headerName=="HSEnrollment") {this.hsEnrollmentarray=res.data}else
                if (res.data[0].headerName=='LockCodes') {this.lockCodesarray=res.data}else
                if (res.data[0].headerName=='RequireAdmission') {this.requireAdmissionarray=res.data}else
                if (res.data[0].headerName=='OnlineEnrollment') {
                  this.onlineEnrollmentarray=res.data}
                if (res.data[0].headerName=='JHSGrade7Enrollment') {
                  this.jhsGrade7Enrollmentarray=res.data
                }
                if (res.data[0].headerName=='HSEnrollment') {
                  this.jhsEnrollmentarray=res.data
                }
                if (res.data[0].headerName=='SHSGrade11Enrollment') {
                  this.shsGrade11Enrollmentarray=res.data
                }
                if (res.data[0].headerName=='SHSEnrollment') {
                  this.shsEnrollmentarray=res.data
                }
              }
            });
          }
        }
        this.x=true
      },Error=>{
        this.global.swalAlertError();
        this.x=true
      });
    }

    

  }

  checked(x) {
    if (x=='elemAdmission') {
      if (this.elemAdmission==0) this.elemAdmission=1;
      else this.elemAdmission=0;
    }else 
    if (x=='facultyGradeEntry') {
      if (this.facultyGradeEntry==0) this.facultyGradeEntry=1
      else this.facultyGradeEntry=0
    }else 
    if (x=='onlineEnrollment') {
      if (this.onlineEnrollment==0) this.onlineEnrollment=1
      else this.onlineEnrollment=0
    }else 
    if (x=='gradeEntry') {
      if (this.gradeEntry==0) this.gradeEntry=1
      else this.gradeEntry=0
    }else 
    if (x=='gsAdmission') {
      if (this.gsAdmission==0) this.gsAdmission=1
      else this.gsAdmission=0
    }else 
    if (x=='hsAdmission') {
      if (this.hsAdmission==0) this.hsAdmission=1
      else this.hsAdmission=0
    }else
    if (x=='hsEnrollment') {
      if (this.hsEnrollment==0) this.hsEnrollment=1
      else this.hsEnrollment=0
    }else
    if (x=='lockCodes') {
      if (this.lockCodes==0) this.lockCodes=1
      else this.lockCodes=0
    }else
    if (x=='requireAdmission') {
      if (this.requireAdmission==-1) {this.requireAdmission=0;this.raoption='0';this.admissioncheck=true;}
      else {this.requireAdmission=-1; this.admissioncheck=false;}
    }
    if (x=='enrollment') {
      if (this.enrollment==-1) {this.enrollment=0;this.eoption='0';this.enrollmentcheck=true;}
      else {this.enrollment=-1;this.enrollmentcheck=false;}
    }
  }

  changed(x){
    if (this.raoption==0) {
      this.requireAdmission=0
    }
    if (this.raoption==1) {
      this.requireAdmission=1
    }
  }

  changed2(x){
    if (this.eoption==0) {
      this.enrollment=0
    }
    if (this.eoption==1) {
      this.enrollment=1
    }
  }

  savechanges(){
      this.global.swalLoading('');
      if (this.hsEnrollment) {
       this.hsEnrollment = 1
      }else
       this.hsEnrollment = 0
      if (this.jhsGrade7Enrollment) {
       this.jhsGrade7Enrollment = 1
      }else
       this.jhsGrade7Enrollment = 0
      if (this.shsEnrollment) {
       this.shsEnrollment = 1
      }else
       this.shsEnrollment = 0
      if (this.shsGrade11Enrollment) {
       this.shsGrade11Enrollment = 1
      }else
       this.shsGrade11Enrollment = 0
    this.http.put(this.global.api+'Maintenance/SYSettings/'+this.selectedsy ,{
          'RequireAdmission':this.requireAdmission,
          'LockCodes':this.lockCodes,
          'GradeEntry':this.gradeEntry,
          'Enrollment':this.enrollment,
          'ElemAdmission':this.elemAdmission,
          'HSAdmission':this.hsAdmission,
          'GSAdmission':this.gsAdmission,
          'FacultyGradeEntry':this.facultyGradeEntry,
          'HSEnrollment':this.hsEnrollment,
          'OnlineEnrollment':this.onlineEnrollment,

          'JHSGrade7Enrollment':this.jhsGrade7Enrollment,
          'SHSEnrollment':this.shsEnrollment,
          'SHSGrade11Enrollment':this.shsGrade11Enrollment

        },this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.global.swalAlert(res.message,"",'success');
              this.run()
            },Error=>{
              this.global.swalAlertError();
              console.log(Error)
            });
            
      this.http.get(this.global.api+'Admission/SYSettings/'+this.global.syear,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.global.schoolyearsettings=res.data;
          });
  }


    
      openDialog(x): void {
        const dialogRef = this.dialog.open(UpdateComponent, {
          width: '540px', disableClose: false, data: {x:x,data:this.sylist}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            if (result.result=='success') {
              this.run()
            }
          }
        });
      }

      removesy(sy){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove School year','School year has been Removed','','sy',sy);
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove,sy)
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
            this.http.delete(this.global.api+'Maintenance/SYSettings/'+sy,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.run()
                this.selectedsy = undefined;
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }

}
