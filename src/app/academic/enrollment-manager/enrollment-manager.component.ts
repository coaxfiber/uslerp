import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LookupCodeComponent } from './lookup-code/lookup-code.component';
import Swal from 'sweetalert2';import { map } from 'rxjs/operators';
const swal = Swal;
import { ShowGradeComponent } from './../lookup/show-grade/show-grade.component';
import { PrintComponent } from './print/print.component';
import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';
import { AlternativeCodeComponent } from './alternative-code/alternative-code.component';
import { SelectSetOptionsComponent } from './select-set-options/select-set-options.component';

@Component({
  selector: 'app-enrollment-manager',
  templateUrl: './enrollment-manager.component.html',
  styleUrls: ['./enrollment-manager.component.scss']
})
export class EnrollmentManagerComponent implements OnInit {

  sets = false;
  dataSource; 
  tableArr:Array<any>;

      displayedColumns = ['codeno', 'subjectid', 'descriptivetitle', 'day', 'time', 'room', 'units','action'];
      @ViewChild(MatSort) sort: MatSort;

	student:any;
	image:any = 'assets/noimage.jpg';
  id='';
  checkId='';
  lrno='';
  fname='';
  mname='';
  lname='';
  suffix='';
  //basic
  gender='';
  cstatus='';
  bdate='';
  nationality='';
  religion='';
  placeob='';
  //contact
  tno='';
  cno='';
  email='';
  es='';
  sem='';
  courseCode=  ''
  admit=true;
  sy;
  enrollmentType
  sysettingadmit
  check=''

  yeardrop

  programid
  yearlevel
  course
  type

  codeenable = true;
  codeno=''
  g=0;
  departmentCode
  selectedsets=''
  selectedsetstemp=false
  codes=[]
  setuse=false
  proceed=0
  errorset=0
  temparray=[];
  arraysubjects=[];
  tempconflict
  enrollcheckvariable=0
  concheck=true
  limit=false
  totalunits=0.1
  successcode=[]
  scodewarn=''

  resetvars(){
    this.codeenable = true;
    this.codeno=''
    this.g=0;
    this.selectedsets=''
    this.selectedsetstemp=false
    this.codes=[]
    this.setuse=false
    this.proceed=0
    this.errorset=0
    this.temparray=[];
    this.arraysubjects=[];
    this.tempconflict=[]
    this.enrollcheckvariable=0
    this.limit=false
    this.totalunits=0.1
    this.successcode=[]
    this.scodewarn=''
  }
  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http) { 
  }

  studentlookup(): void {
        const dialogRef = this.dialog.open(StudentLookupComponent, {
          width: '600px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            this.id = result.result;
            this.keyDownFunction('onoutfocus')
          }
        });
      }

  selectSets(){
    var x=this.selectedsets;
    if (!this.selectedsetstemp) {
    if (this.selectedsets!='') {
      if (this.id.replace(/\s/g, '') != '' && this.checkId==this.id.replace(/\s/g, '')){
        if (this.arraysubjects.length==0) {
          this.selectedsetstemp=true
          this.global.swalLoading('')
          this.http.get(this.global.api+'Enrollment/SetDetails/'+x,this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                      this.global.swalClose()
                      this.openDialogselectsets(res.data)
                      //this.checkset(res.data,res.data.length-1)
                      this.selectedsetstemp=false
                  },Error=>{
                    this.selectedsetstemp=false
                    this.global.swalAlertError()
                  });
        }else 
          this.global.swalAlert("You must drop all codes currently enrolled by the student to use SETS!","",'warning');
      }else 
          this.global.swalAlert("Please Check the ID number of the Student","",'warning');
     }else 
        this.global.swalAlert("No set selected!","",'warning');
      // code...
    }
  }

   openDialogselectsets(data): void {
      const dialogRef = this.dialog.open(SelectSetOptionsComponent, {
          width: '95%', disableClose: false,data:data
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result==undefined) {
            // code...
          }else
          if (result.result=='success') {
            this.global.swalLoading('')
              this.checkset(result.data,result.data.length-1)
          }
        });
       
      }

  checkset(code,repeatset){
    if (repeatset>=0) { 
        if (code[repeatset].codeNo!='') {
        var codeno=code[repeatset].codeNo
        this.http.get(this.global.api+'Enrollment/EnrolledSubjects/Code No/'+codeno+'/'+this.global.syear+'/true',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
              this.tempconflict=[];
              this.enrollcheck2(res,codeno,res.data.length-1,code,repeatset);
          },Error=>{
              this.tempconflict=[];
              this.global.swalAlertError()
          });
      }else{
        this.checkset(code,repeatset)
      }
    }else{

        this.successcode=[]
        this.scodewarn=''
        this.enrollcode2(this.codes,this.codes.length-1)
    }

   
  }
  enrollcheck2(res,codeNo,repeat,codeset,repeatset){
          this.http.get(this.global.api+'Enrollment/ConflictSchedules/'+this.checkId+'/'+res.data[repeat].codeNo+'/'+res.data[repeat].day+'/'+res.data[repeat].time+'/'+this.global.syear,this.global.option)
            .map(response => response.json())
            .subscribe(res2 => {
              this.tempconflict=this.tempconflict.concat(res2.data)
               if ((repeat-1)>=0) {
                  this.enrollcheck2(res,codeNo,repeat-1,codeset,repeatset);
                }else{
                  this.enrollwarning2(res,codeset,repeatset)
               }

            },Error=>{
             this.global.swalAlertError();
            });
          
}
enrollwarning2(res,codeset,repeatset){
          this.proceed = 0
            if (this.tempconflict.length>0&&this.concheck==true) {
              this.proceed = 2
            }
          for (var i = 0; i < res.data.length; ++i) {
            if ((res.data[i].oe+res.data[i].res)>=res.data[i].classSize) {
               this.proceed = 1;
            }
          }
          if(this.global.schoolyearsettings.lockCodes==1){
            if(!res.data[0].departmentCode.includes(this.departmentCode)){
              this.proceed = 3;
            }
          }
            for (var i3 = 0; i3 < this.arraysubjects.length; ++i3) {
              if (res.data[0].subjectTitle==this.arraysubjects[i3].subjectTitle||res.data[0].subjectID==this.arraysubjects[i3].subjectID) {
               this.proceed = 4
              }
            }

          if (this.proceed == 1) {
            this.global.swalAlert("Unable to Apply Set!","Maximum student has been reached.",'warning');
          }else
          if (this.proceed == 3) {
            this.global.swalAlert("Locked Code!","Set is offered exclusively for "+ res.data[0].departmentCode+" students only.","warning")
          }else
          if (this.proceed == 2) {
            this.tempconflict=[]
            this.global.swalAlert("Set has conflict of schedule!","","warning")   
          }else
          if (this.proceed == 4) {
            this.global.swalAlert(res.data[0].subjectTitle,"Already exist!","warning")
          }else
          if (this.proceed == 0) {
            if (this.codes.includes(codeset[repeatset].codeNo)) {
              // code...
            }else
              this.codes.push(codeset[repeatset].codeNo)
            this.checkset(codeset,repeatset-1)
          }
}
enrollcode2(codes,length){
  if (length>=0) {
      this.http.post(this.global.api+'Enrollment/EnrolledSubjects/'+this.checkId+'/'+ codes[length] +'/'+this.global.syear,{},this.global.option)
        .map(response => response.json())
        .subscribe(res => {
              if (res.message == 'Success') {
                this.successcode.push(codes[length])
                this.enrollcode2(codes,length-1)
              }
              else{
                this.scodewarn=this.scodewarn+"*"+res.message+"<br>"
                this.enrollcode2(codes,length-1)
              }
          },Error=>{
          this.global.swalAlertError()
        });
  }else{ 

     if (this.scodewarn=='') {
          this.global.swalClose()
          this.getsubjects(this.checkId,0)
      }else{
        this.deletecodeloop(this.successcode.length-1)
      }
  }
  
}
 deletecodeloop(repeat){
     if (repeat>=0) {
      this.http.delete(this.global.api+'Enrollment/EnrolledSubjects/'+this.checkId+"/"+this.successcode[repeat]+"/"+this.global.syear,this.global.option)
        .map(response => response.text())
        .subscribe(res => {
           this.deletecodeloop(repeat-1)
        },Error=>{
          this.global.swalAlertError()
        });
      }else{
       this.global.swalAlert("Enrolment failed due to the ff.",this.scodewarn,'warning')
       this.getsubjects(this.checkId,0)
      }
    }


	getsubjects(id,x){
        this.g=1;

	      this.http.get(this.global.api+'Enrollment/EnrolledSubjects/'+id+'/'+this.global.syear,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  var temp = this.arraysubjects.length;
                  console.log(res)
                  if(res.data==null)
                  {
                    this.arraysubjects = []
                      this.g=0;
                  }
                  else{
                    this.arraysubjects = res.data
                  }

                  this.seedouble(this.arraysubjects)
                    if (x!=0) {
                      if (temp == this.arraysubjects.length) {
                        this.global.swalAlert("Code not found","Code "+this.codeno+" does not exist",'warning');
                      }
                    }
                  this.codeno='';
                  this.selectedsetstemp=false
                },Error=>{
                  //console.log(Error);
                  console.log(Error)
                  this.global.swalAlertError()
                });
	}
seedouble(x){
  this.totalunits=0;
  var checkno = 0
    for (var i = 0; i < this.arraysubjects.length; ++i) {
      if (i>0) {
       // console.log(this.arraysubjects[i-1].codeNo.toLowerCase()+' - '+this.arraysubjects[i].codeNo.toLowerCase())
         if (this.arraysubjects[i-1].codeNo.toLowerCase() == this.arraysubjects[i].codeNo.toLowerCase()) {
           if (this.arraysubjects[i-1].day==this.arraysubjects[i].day&&this.arraysubjects[i].time==this.arraysubjects[i-1].time) {
             // code...
           }else{
            this.arraysubjects[i].codeNo='';
            this.arraysubjects[i].subjectID='';
            this.arraysubjects[i].subjectTitle='';
            this.arraysubjects[i].units='';
           }
          } if (i>1) {
            if (this.arraysubjects[i-2].codeNo.toLowerCase() == this.arraysubjects[i].codeNo.toLowerCase()) {
              if (this.arraysubjects[i-2].day==this.arraysubjects[i].day&&this.arraysubjects[i].time==this.arraysubjects[i-2].time) {
               // code...
             }else{
              this.arraysubjects[i].codeNo='';
              this.arraysubjects[i].subjectID='';
              this.arraysubjects[i].subjectTitle='';
              this.arraysubjects[i].units='';
             }
            }
          } if (i>2) {
            if (this.arraysubjects[i-3].codeNo.toLowerCase() == this.arraysubjects[i].codeNo.toLowerCase()) {
            if (this.arraysubjects[i-3].day==this.arraysubjects[i].day&&this.arraysubjects[i].time==this.arraysubjects[i-3].time) {
               // code...
             }else{
              this.arraysubjects[i].codeNo='';
              this.arraysubjects[i].subjectID='';
              this.arraysubjects[i].subjectTitle='';
              this.arraysubjects[i].units='';
             }
            }
          } if (i>3) {
            if (this.arraysubjects[i-4].codeNo.toLowerCase() == this.arraysubjects[i].codeNo.toLowerCase()) {
            if (this.arraysubjects[i-4].day==this.arraysubjects[i].day&&this.arraysubjects[i].time==this.arraysubjects[i-4].time) {
               // code...
             }else{
              this.arraysubjects[i].codeNo='';
              this.arraysubjects[i].subjectID='';
              this.arraysubjects[i].subjectTitle='';
              this.arraysubjects[i].units='';
             }
            }
          } if (i>4) {
            if (this.arraysubjects[i-5].codeNo.toLowerCase() == this.arraysubjects[i].codeNo.toLowerCase()) {
            if (this.arraysubjects[i-5].day==this.arraysubjects[i].day&&this.arraysubjects[i].time==this.arraysubjects[i-5].time) {
               // code...
             }else{
              this.arraysubjects[i].codeNo='';
              this.arraysubjects[i].subjectID='';
              this.arraysubjects[i].subjectTitle='';
              this.arraysubjects[i].units='';
             }
            }
          } if (i>5) {
            if (this.arraysubjects[i-6].codeNo.toLowerCase() == this.arraysubjects[i].codeNo.toLowerCase()) {
            if (this.arraysubjects[i-6].day==this.arraysubjects[i].day&&this.arraysubjects[i].time==this.arraysubjects[i-6].time) {
               // code...
             }else{
              this.arraysubjects[i].codeNo='';
              this.arraysubjects[i].subjectID='';
              this.arraysubjects[i].subjectTitle='';
              this.arraysubjects[i].units='';
             }
            }
          }
      }
      if (this.arraysubjects[i].units=='')
       checkno = 0;
      else
       checkno = parseFloat(this.arraysubjects[i].units);
      this.totalunits=this.totalunits + checkno;
    }
    this.dataSource = new MatTableDataSource(this.arraysubjects);
    this.dataSource.sort = this.sort;
}

enrollwarning(res){
            var proceed = 0;
            if (this.tempconflict.length>0&&this.concheck==true) {
              proceed = 2
            }
            for (var i = 0; i < res.data.length; ++i) {
              //console.log(res.data[i].classSize);
              if ((res.data[i].oe+res.data[i].res)>=res.data[i].classSize) {
                 proceed = 1;
              }
            }
            if(this.global.schoolyearsettings.lockCodes==1){
              if(!res.data[0].departmentCode.includes(this.departmentCode)){
                proceed = 3;
              }
            }

            for (var i3 = 0; i3 < this.arraysubjects.length; ++i3) {
              if (res.data[0].subjectTitle==this.arraysubjects[i3].subjectTitle||res.data[0].subjectID==this.arraysubjects[i3].subjectID) {
               proceed = 4
              }
            }
            

          if (proceed == 1) {
            this.global.swalAlert("Unable to add Code!","Maximum student has been reached.",'warning');
          }else
          if (proceed == 3) {
            this.global.swalAlert("Locked Code!","Code "+res.data[0].codeNo+" is offered exclusively for "+ res.data[0].departmentCode+" students only.","warning")
          }else
          if (proceed == 2) {
            var conflict = ''
            for (var l = 0; l < this.tempconflict.length; ++l) {
             conflict = conflict + "* "+this.tempconflict[l].codeNo+"<br>"
            }
            this.tempconflict=[]
            this.swalConfirm("Conflict Schedule!","Code "+this.codeno+" is in conflict with the following codes:<br><br>"+conflict+"<br>Do you want to choose a code alternative?","warning",'OK',"Code added",'force',res.data[0])   
          }else
          if (proceed == 4) {
            this.global.swalAlert(res.data[0].subjectID+" - "+res.data[0].subjectTitle,"Already exist!","warning")
          }else
          if (proceed == 0) {
            this.enrollcode();
          }
}
enrollcheck(res,codeNo,repeat){
          this.http.get(this.global.api+'Enrollment/ConflictSchedules/'+this.checkId+'/'+res.data[this.enrollcheckvariable].codeNo+'/'+res.data[this.enrollcheckvariable].day+'/'+res.data[this.enrollcheckvariable].time+'/'+this.global.syear,this.global.option)
            .map(response => response.json())
            .subscribe(res2 => {
              this.tempconflict=this.tempconflict.concat(res2.data)
              if (repeat>1) {
                this.enrollcheckvariable++;
                this.enrollcheck(res,codeNo,repeat-1);
              }else{
                this.enrollwarning(res)
              }
            },Error=>{
             this.global.swalAlertError();
            });
}

keyDownFunctionCODE(event){
   if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {

      this.global.swalLoading('');
      var element = <HTMLInputElement> document.getElementById("codeinput");
      if (this.id != '' && this.checkId==this.id) {
        if ( (this.global.schoolyearsettings.enrollment!=-1) || (this.global.domain == "GRADUATE SCHOOL" && this.global.schoolyearsettings.gsAdmission == 1 && this.departmentCode == "GS") ) {

        if (this.limit==false) {
          if (this.codeno=='') {
            this.global.swalAlert("Code does not exist","",'warning');
                  element.focus();
          }else{

          this.limit=true
            let x = 1;
            for (var i = 0; i < this.arraysubjects.length; ++i) {
              if (this.arraysubjects[i].codeNo.toLowerCase()==this.codeno.toLowerCase()) {
                x=0;
              }
            }
        if (x==1) {
              this.limit=false
              element.disabled = true;
              this.http.get(this.global.api+'Enrollment/EnrolledSubjects/Code No/'+this.codeno+'/'+this.global.syear+'/true',this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  if (res.data.length==0) {
                    this.global.swalAlert("Code does not exist","",'warning');
                  }else{
                    this.tempconflict=[];
                    this.enrollcheckvariable=0
                    this.enrollcheck(res,this.codeno,res.data.length);
                  }

                  element.disabled = false;
                  element.focus();
                });

              }else{
                this.limit=false;
                this.global.swalAlert('Code: '+this.codeno,"Already exist!",'warning');
                element.focus();
              }
          }
        }
      }else {

        this.global.swalAlert("Enrollment is already disabled for this school year!","",'warning');
      }

      }else 
        this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }
}

enrollcode(){
        if (this.concheck) {
          this.http.post(this.global.api+'Enrollment/EnrolledSubjects/'+this.checkId+'/'+ this.codeno +'/'+this.global.syear,{},this.global.option)
          .map(response => response.text())
          .subscribe(res => {
            console.log(res)

            this.getsubjects(this.checkId,1);
            this.limit=false
            this.global.swalClose();
          },Error=>{
            //console.log(Error);
            console.log(Error)
            this.limit=false
            this.global.swalAlertError()
          });
        }else{ 
          this.http.post(this.global.api+'Enrollment/EnrolledSubjects/BypassConflict/'+this.checkId+'/'+ this.codeno +'/'+this.global.syear,{},this.global.option)
          .map(response => response.text())
          .subscribe(res => {
            this.getsubjects(this.checkId,1);
            this.limit=false
            this.global.swalClose();
          },Error=>{
            //console.log(Error);
            console.log(Error)
            this.limit=false
            this.global.swalAlertError()
          });
        }
}

enrollcodebypassconflict(){
  this.http.post(this.global.api+'Enrollment/EnrolledSubjects/BypassConflict/'+this.checkId+'/'+ this.codeno +'/'+this.global.syear,{},this.global.option)
        .map(response => response.text())
        .subscribe(res => {
          this.getsubjects(this.checkId,1);
          this.limit=false
        },Error=>{
          //console.log(Error);
          console.log(Error)
          this.limit=false
          this.global.swalAlertError()
        });
}
 
deleteCode(codeno,text){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }else
      if (this.global.schoolyearsettings.enrollment==0) {
        this.swalConfirm("Confirm Drop","You are about to drop the code "+codeno+" - "+text,'warning','Drop code','Code has been dropped','code',codeno);    
      }else{ 
        this.global.swalAlert('Dropping is disabled for this school year.',"",'warning')  
      }
    }
  swalConfirm(title,text,type,button,successm,remove,codeno){
    swal.fire({
        title: title,
        html: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='code') {
            this.global.swalLoading('Dropping Code...')
             this.http.delete(this.global.api+'Enrollment/EnrolledSubjects/'+this.checkId+'/'+ codeno +'/'+this.global.syear,this.global.option)
                .map(response => response.text())
                .subscribe(res => {
                  this.global.swalClose()
                  this.getsubjects(this.checkId,0);

                },Error=>{
                  this.global.swalAlertError()
                });
          }
          if (remove=='force') {
              this.openDialogalternativecode(codeno);
          }
        }
      })
  }
  major=''
   keyDownFunction(event){

  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
  	if (this.id != '') {
    this.resetvars()
    this.global.activeid=this.id
    this.global.swalLoading('Loading Student Information');
    this.http.get(this.global.api+'Student/'+this.id+'/'+this.global.syear+'/'+this.global.domain,this.global.option)
                              .map(response => response.json())
                              .subscribe(res => {
                                if (res.message=="Student found.") {
                                  if (res.data.enrollmentStatus=='Admitted'||res.data.enrollmentStatus=='Paid') {
                                    //console.log(res)
                                       if (res.data.level=='denied') {
                                            this.global.swalAlert('ID Number: '+this.id+' is not a '+this.global.domain+' student','','warning')
                                          // code...
                                        }else{
                                          //console.log(this.global.viewdomainname);
                                          if (this.global.viewdomainname.includes(res.data.departmentCode)) {
                                             	  this.student = res;
                                                 this.departmentCode= res.data.departmentCode
                                                this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
                                                this.checkId=res.data.idNumber;
                              								  this.lrno=res.data.lrNumber;
                              								  this.fname=res.data.firstName;
                              								  this.mname=res.data.middleName;
                              								  this.lname=res.data.lastName;
                              								  this.suffix=res.data.suffixName;
                                                this.major=res.data.major
                              								  //basic
                              								  this.gender=res.data.gender;
                              								  this.cstatus=res.data.civilStatus;
                              								  this.bdate=res.data.dateOfBirth;
                              								  this.nationality=res.data.nationality;
                              								  this.religion=res.data.religion;
                              								  this.placeob=res.data.placeOfBirth;
                              								  //contact
                              								  this.tno=res.data.telNo;
                              								  this.cno=res.data.mobileNo;
                              								  this.email=res.data.emailAddress;
                                                this.yearlevel = res.data.yearOrGradeLevel.toString();
                                                this.course = res.data.course.toString();
                                                this.courseCode = res.data.courseCode.toString();

                                                if (res.data.enrollmentType==1) {
                                                this.type = 'Regular';
                                                }else if (res.data.enrollmentType==2) {
                                                this.type = 'Transferee';
                                                }else this.type = 'Cross Enrollee';

                                                this.enrollmentType=res.data.enrollmentType;

                                                if (res.data.enrollmentStatus=='For Admission') {
                                                 if (res.data.blackListed == true) {
                                                    this.admit=true;
                                                    if (res.data.gender == 'M') {
                                                      this.es = "TO SEE THE PREFECT OF MEN";
                                                    }else
                                                      this.es = "TO SEE THE PREFECT OF WOMEN";
                                                  }else
                                                     this.es = "For Admission";
                                                }else
                                                    this.es = res.data.enrollmentStatus;
                                                this.codeenable = false;
                                                this.programid = res.data.programID.toString();
                                                this.global.swalClose();
                                                if (this.global.schoolyearsettings.enrollment==-1) {
                                                    this.global.swalAlert("Enrollment is already disabled for this school year!","",'warning');
                                                }
                                                this.loadheaders();

                                                this.getsubjects(this.checkId,0);
                                                }else
                                                  {
                                                     this.global.swalAlert('No access!',"Student is not in your domain.",'warning')
                                              
                                                  }
                                        }
                                      }else
                                       {
                                         this.global.swalAlert('Admission Required',"Student is not yet Admitted!",'warning')
                                       }
                                    }else{
                                    this.global.swalAlert(res.message,'','warning')

                                    }
                                    

                                // if (res.message!=undefined&&res.message=='Person found.') {
                                //   this.isDisabled = true;
                                //   this.options.value.lrno = res.data.lrNumber;
                                //   this.options.value.fname = res.data.firstName;
                                //   this.options.value.mname = res.data.middleName;
                                //   this.options.value.lname = res.data.lastName;
                                //   this.options.value.suffix = res.data.suffixName;
                                //   this.options.value.gender = res.data.gender;
                                //   this.options.value.cstatus = res.data.civilStatus;
                                //   this.options.value.bdate = res.data.dateOfBirth;
                                // }else 
                                // {
                                //   this.global.swalAlert(res.message,'','warning');
                                // }



                              },Error=>{
                                  this.global.swalAlert("Please Check the ID number of the Student","",'warning');
                              });
    // rest of your code
    }
    // code...
  }
  }
  setsheaders=[]
  ngOnInit() {
         this.http.get(this.global.api+'Admission/SYSettings/'+this.global.syear,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            console.log(res)
            if (this.global.activeid!='') {
              this.id=this.global.activeid
              this.keyDownFunction('onoutfocus')
            }
            
            if (res.data!=null) { 
              this.global.schoolyearsettings=res.data;
            }
          },Error=>{
            console.log(Error)
          });
   
  }
  checkdetails=[]

  getdetails(x){
    if (x<this.setsheaders.length) {
       this.http.get(this.global.api+'Enrollment/SetDetails/'+this.setsheaders[x].headerId,this.global.option)
       .map(response => response.json())
       .subscribe(res => {
        // var countfull=0
        // for (var i = 0; i < res.data.length; ++i) {
        //     if (res.data[i].availableSlot<=0) {
        //       countfull++
        //     }
        //   }




        // if (countfull>0) {
        //   this.checkdetails.push(res.data);
        //   //this.setsheaders.splice(index,1)
        // }else{

        //   for (var i = 0; i < this.checkdetails.length; ++i) {
        //     if (this.checkdetails[i]) {
        //       // code...
        //     }
        //   }
        //   this.checkdetails.push(res.data);
        //   console.log(this.checkdetails)
        // }
        this.checkdetails[x] = res.data;
        this.getdetails(x+1)
     });
    }
    else{
      var setsheader = this.setsheaders
      for (var i = (setsheader.length-1); i > 0; --i) {
        if (this.getstatus(i-1)=='Full') {
          
        }else{
          this.setsheaders.pop()
          this.checkdetails.pop()
        }
      }
    }
    
  }
  getstatus(j){
    if (this.checkdetails[j]!=undefined) {
    var countfull=0
    var countavail=0
    for (var i = 0; i < this.checkdetails[j].length; ++i) {
      if (this.checkdetails[j][i].availableSlot<=0) {
        countfull++
      }else{
        countavail++
      }
    }
    if (countfull>0) {
      return 'Full'
    }
    if (countfull==0) {
      return ''
    }
        return 'No subjects'
      // code...
    }
    return ''
  }
  trimheaders(x){
    this.setsheaders=[]
    this.checkdetails=[]
    for (var i = 0; i < x.length; ++i) {
      if (this.course.replace(/\s/g, "")+this.major.replace(/\s/g, "")==x[i].course.replace(/\s/g, "")&&x[i].yearLevel.toString()==this.yearlevel) {
         this.setsheaders.push(x[i])
      }

   // //remove for prob lang
   //    if (this.global.requestid()=='32698'||this.global.requestid()=="9700005") {
   //    this.http.get(this.global.api+'Enrollment/SetHeaders/'+this.global.syear+'/0',this.global.option)
   //        .map(response => response.json())
   //        .subscribe(res => {
   //          for (var i2 = 0; i2 < res.data.length; ++i2) {
   //            if(this.course.toLowerCase().replace(/\s/g, "")=='bsac'){
   //              if ('bsac'==res.data[i2].course.toLowerCase().replace(/\s/g, "")&&res.data[i2].yearLevel.toString()=='1') {
   //                this.setsheaders.push(res.data[i2])
   //              }
   //            }else if (this.course.toLowerCase().replace(/\s/g, "")=='bsba') {
   //              if ('bsbafinancialmanagement'==res.data[i2].course.toLowerCase().replace(/\s/g, "")&&res.data[i2].yearLevel.toString()=='1') {
   //                this.setsheaders.push(res.data[i2])
   //              }
   //            }
   //          }
   //          //console.log(this.setsheaders)
   //        });
   //    }

    }

     this.getdetails(0)
  }

  loadheaders(){
    this.http.get(this.global.api+'Enrollment/SetHeaders/'+this.global.syear+'/1',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.trimheaders(res.data)
            //console.log(this.setsheaders)
          });
  }
  withdraw(){
     this.http.put(this.global.api+'Enrollment/Withdraw/'+this.checkId+'/'+this.global.syear+'/1',{none:'none'},this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.global.swalSuccess("Success!")
              //console.log(this.setsheaders)
            });
  }
  retract(){
     this.http.put(this.global.api+'Enrollment/RetractWithdrawal/'+this.checkId+'/'+this.global.syear+'/1',{none:'none'},this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              this.global.swalSuccess("Success!")
              //console.log(this.setsheaders)
            });
  }

   openDialog(): void {
      const dialogRef = this.dialog.open(LookupCodeComponent, {
          width: '95%', disableClose: false,data:this.arraysubjects
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result==undefined) {
            // code...
          }else
          if (result.see=='success') {
            this.codeno = result.result;
            this.keyDownFunctionCODE('onoutfocus')
          }
        });
       
      }

   openDialogalternativecode(x): void {
     if (this.checkId!='') {
            const dialogRef = this.dialog.open(AlternativeCodeComponent, {
              width: '75%', data:{data:x,subj:this.arraysubjects}, disableClose: false
            });

             dialogRef.afterClosed().subscribe(result => {
                if (result==undefined) {
                  // code...
                }else
                if (result.see=='success') {
                  this.codeno = result.result;
                  this.keyDownFunctionCODE('onoutfocus')
                }else
                if (result.see=='bypass') {
                  this.codeno = result.result;
                  this.enrollcodebypassconflict()
                }
        });
         }else
       this.global.swalAlert("Please Check the ID number of the Student","",'warning');
      }



   openDialogshowgrade(): void {
     if (this.checkId!='') {
            const dialogRef = this.dialog.open(ShowGradeComponent, {
              width: '75%', data:{id:this.checkId,name: this.lname +", "+this.fname+" "+this.mname+" "+this.suffix}, disableClose: false
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result==undefined) {
                // code...
              }
            });
         }else
       this.global.swalAlert("Please Check the ID number of the Student","",'warning');
      }

   ViewPrint(): void {
     if (this.checkId!='') {
            const dialogRef = this.dialog.open(PrintComponent, {
              width: '75%', data:{gender:this.gender,id:this.checkId,major:this.major,name: this.lname +", "+this.fname+" "+this.mname+" "+this.suffix,course:this.course,year:this.yearlevel,subjects:this.arraysubjects}, disableClose: false
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result==undefined) {
                // code...
              }else
              if (result.result!='cancel') {
              }
            });
         }else
       this.global.swalAlert("Please Check the ID number of the Student","",'warning');
      }

      useSets(){
        if(this.sets==true){
          this.sets=false
        }else
          this.sets=true

      }
}


