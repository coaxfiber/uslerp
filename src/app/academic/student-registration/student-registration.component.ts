import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import { ShowGradeComponent } from './../lookup/show-grade/show-grade.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';
import { GradeLastSyComponent } from './grade-last-sy/grade-last-sy.component';
import { EnrollmentHistoryComponent } from './enrollment-history/enrollment-history.component';
import Swal from 'sweetalert2';
const swal = Swal;

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {


  dataSource; 
  tableArr;

      displayedColumns = ['subjectID', 'subjectDescription', 'grade', 'units'];
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
  gender='';
  cstatus='';
  bdate='';
  nationality='';
  religion='';
  placeob='';
  tno='';
  cno='';
  email='';
  es='';
  sem='';
  courseCode=  ''
  admit=true;
  sy;
  sysettingadmit
  check=''
  yeardrop
  programid
  yearlevel
  course
  type

  tableArr2
  g=0;

  warndisplay1
  warndisplay2
  warndisplay3

  coursetitle='Course'
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
  temparray=[];
  arraycourses=[];

  getcourses(){
  this.temparray=this.global.viewdomain
  this.arraycourses=[]
  if (this.yearlevel!=undefined) {
    for (var i = 0; i < this.temparray.length; ++i) {
      this.http.get(this.global.api+'Admission/Courses/'+this.global.domain+'/'+this.temparray[i]+'/'+this.yearlevel,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                   if (res.data==null) {
                    res.data = [];
                  }                      
                  this.arraycourses = this.arraycourses.concat(res.data)
                },Error=>{
                  this.global.swalAlertError(Error);
                });
      }
  }
      
    }
getcourses2(x){
  this.temparray=this.global.viewdomain
  this.arraycourses=[]
      for (var i = 0; i < this.temparray.length; ++i) {
      this.http.get(this.global.api+'Admission/Courses/'+this.global.domain+'/'+this.temparray[i]+'/'+x,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  if (this.arraycourses.length==0) {
                    this.arraycourses=res.data
                  }else
                  this.arraycourses = this.arraycourses.concat(res.data)
                },Error=>{
                  this.global.swalAlertError(Error);
                });
    }
}
showgrade(){
  if (this.id != '') {
   const dialogRef = this.dialog.open(ShowGradeComponent, {
          width: '60%',data:{ id: this.checkId,name: this.lname +", "+this.fname+" "+this.mname+" "+this.suffix}, disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result==undefined) {
            // code...
          }else
          if (result.result!='cancel') {

          }
        });
    }else{
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }
}
  loadyears(){
    if (this.global.domain=="GRADUATE SCHOOL") {
      this.yeardrop = [{year: 1,name: 1},{year: 2,name: 2}];
    }else if (this.global.domain=="COLLEGE") {
      this.yeardrop = [{year: 1,name: 1},{year: 2,name: 2},{year: 3,name: 3},{year: 4,name: 4},{year: 5,name: 5}];
    }else if (this.global.domain=="HIGHSCHOOL") {
      this.yeardrop = [{year: '1',name: 'Grade 7'},{year: '2',name: 'Grade 8'},{year: '3',name: 'Grade 9'},{year: '4',name: 'Grade 10'},{year: '5',name: 'Grade 11'},{year: '6',name: 'Grade 12'}];
    }else if (this.global.domain=="ELEMENTARY") {
      this.yeardrop = [{year: 'P',name:'Pre-School'},{year: '0',name:'K'},{year: '1',name:'1'},{year: '2',name:'2'},{year: '3',name:'3'},{year: '4',name:'4'},{year: '5',name:'5'},{year: '6',name:'6'}];
    }
  }
admitconfirm(){
  var course=''
  var arrcourse=[]
  for (var i = 0; i < this.arraycourses.length; ++i) {
    if(this.arraycourses[i].programID==this.programid)
    {
      course = this.arraycourses[i].course
      arrcourse=this.arraycourses[i]
      break;
    }
  }

  this.swalConfirm("Are you sure you want to register "+this.checkId+" to year "+this.yearlevel+" with "+course+"?","",'warning');
}
swalConfirm(title,text,type){
    swal.fire({
        title: title,
        html: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.value) {
          this.admitstudentfiltered()
        }
      })
  }

  admitstudent(){
    var x=''
    if (this.blacklistedViolation==1) {
        this.global.swalAlert("Unable to register!","To see OSAS(Blacklisted with violation)","warning")
    }else 
      if (this.programid==this.student.data.programID.toString()) {
        if (!this.global.checkdomain(this.student.data.departmentID)) {
            this.global.swalAlert("Registration Failed!",'You\'re not allowed to admit this student<br>',"warning")
        }else{
          //console.log(this.warndisplay1)
          if (this.warndisplay1!=null&&this.warndisplay1.evaluated==true) {
              if (this.warndisplay1.percentFailed>50) {
                x=x+"*Percent Failed is higher than 50%<br>"
              }

              if (this.warndisplay1.retentionPolicyAverage.toLowerCase()!='passed'&&this.warndisplay1.retentionPolicyAverage!='N/A') {
                x=x+"*Retention policy average failed<br>"
              }
              if (this.warndisplay1.retentionPolicyAverage.toLowerCase()!='passed'&&this.warndisplay1.retentionPolicyAverage!='N/A') {
                x=x+"*Retention policy average failed<br>"
              }
              if (this.warndisplay1.retentionPolicyNoGradeLowerThan_Count!=0) {
                x = x + '*Retention Policy No Grade Lower Than Count('+this.warndisplay1.retentionPolicyNoGradeLowerThan_Count+')<br>'
              }
              if (this.blacklistedViolation==1) {
                this.global.swalAlert("Student ",x,"warning")
              }
              if (this.global.checkrole('Dean')) {
                x=''
              }

              if (x=='') {
                this.admitconfirm()
              }else{
                x="Please notify your respective dean to resolve the ff.<br><br>"+x
                this.global.swalAlert("Registration Failed!",x,"warning")
              }
          }else{
            if (this.warndisplay1==null) {
              this.admitconfirm()
            }else
            if (this.enrollmentStatus=="For Admission"&&this.global.domain=="COLLEGE") {
              this.global.swalAlert("Registration Failed!","Student is not yet evaluated!","warning")
            }else{
             this.admitconfirm()
            }
          }
        }
      }else{
        this.admitconfirm()
      }
  }

  admitstudentfiltered(){
    this.global.swalLoading('Registering Student...');
        var syear=this.global.syear
        if (this.global.domain=="HIGHSCHOOL"||this.global.domain=="ELEMENTARY") {
                if (this.global.syear.length == 7) {
                  syear = this.global.syear.slice(0, -1)
                }
              }
        this.http.post(this.global.api+'Admission/RegisterStudent' ,{
                  "idNumber": this.id,
                  "schoolYear": syear,
                  "programID": this.programid,
                  "year": this.yearlevel,
                  "type": this.type
              },this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  this.global.swalSuccess(res.message);
                  let myVar = setInterval(() => {
                        this.keyDownFunction('onoutfocus')
                        clearInterval(myVar);
                      },1000)
                },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError(Error);
                  console.log(Error);
                });
  }
  enrollmentStatus=''
blacklistedViolation=0
   keyDownFunction(event){
  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
  	if (this.id != '') {
    this.global.activeid=this.id
    this.http.get(this.global.api+'Admission/SYSettings/'+this.global.syear,this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        this.sysettingadmit = res;
        if (res.data!=null) {
         if (this.global.domain == "ELEMENTARY") {
          if (res.data.elemAdmission==false) {
            this.check = 'Admission is already disabled for this school year!<br>';
          }
        }

        if (this.global.domain == "HIGHSCHOOL") {
          if (res.data.hsAdmission==false) {
            this.check = 'Admission is already disabled for this school year!<br>';
          }
        }

        if (this.global.domain == "COLLEGE") {
          if (res.data.requireAdmission==-1) {
            this.check = 'Admission is already disabled for this school year!<br>';
          }
        }

        if (this.global.domain == "GRADUATE SCHOOL") {
          if (res.data.gsAdmission==false) {
            this.check = 'Admission is already disabled for this school year!<br>';
          }
        }
          // code...
        }else this.check="Invalid School Year"
        

      },Error=>{
        //console.log(Error);
        console.log(Error)
      });
    this.global.swalLoading('Loading Student Information');
    this.http.get(this.global.api+'Student/'+this.id+'/'+this.global.syear+'/'+this.global.domain,this.global.option)
            .map(response => response.json())
            .subscribe(res => {
              if (res.message=="Student found.") {
                var x='';  
                if (res.data.accessAdmit == false) {
                  this.admit = true
                  x=x+'You\'re not allowed to admit this student<br>';
                  //this.global.swalAlert("Acadims alert",x,"warning")
                }else if (this.global.domain=="ELEMENTARY"&&res.data.departmentCode!='ELEM') {
                  this.admit = true
                  x=x+'You\'re not allowed to admit this student<br>';
                }else if (this.global.domain=="HIGHSCHOOL"&&res.data.departmentCode!='HS') {
                  this.admit = true
                  x=x+'You\'re not allowed to admit this student<br>';
                }else if (this.global.domain=="GRADUATE SCHOOL"&&res.data.departmentCode!='GS') {
                  this.admit = true
                  x=x+'You\'re not allowed to admit this student<br>';
                }else if (this.global.domain=="COLLEGE"&&(res.data.departmentCode=='ELEM'||res.data.departmentCode=='HS')) {
                  this.admit = true
                  x=x+'You\'re not allowed to admit this student<br>';
                }
                else{ 
                  this.admit=true;
                  this.student = res;
                  this.coursetitle =res.data.course
                  this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
                  this.checkId=res.data.idNumber;
                  this.lrno=res.data.lrNumber;
                  this.fname=res.data.firstName;
                  this.mname=res.data.middleName;
                  this.lname=res.data.lastName;
                  this.suffix=res.data.suffixName;
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
                  if (this.global.domain=="GRADUATE SCHOOL") {
                    if (this.yearlevel>2) {
                      this.yearlevel=1
                    }
                  }
                  this.getcourses()
                  this.type = res.data.enrollmentType.toString()
                  this.course = res.data.courseCode.toString();
                  this.courseCode = res.data.courseCode.toString();
                  this.programid = res.data.programID.toString();
                  this.blacklistedViolation=res.data.blacklistedViolation
                  this.enrollmentStatus=res.data.enrollmentStatus
                  if (res.data.enrollmentStatus=='For Admission') {
                    var blacklist = ''
                    if (res.data.blacklistedStopped==1) {
                      blacklist=blacklist+'Stopped'
                    }

                    if (res.data.blacklistedViolation==1) {
                      if (res.data.blacklistedStopped==1) {
                        blacklist=blacklist+'/'
                      }
                      blacklist=blacklist+'With Violation'
                    }

                   if (res.data.blackListed == true) {
                      this.es = "TO SEE OSAS("+blacklist+")";
                    }else
                      this.es = "For Admission";
                    }else {
                        this.admit=true;
                        this.es = res.data.enrollmentStatus;
                    }

                    if (res.data.enrollmentStatus=='Admitted') {
                        this.admit=false;
                        this.es = res.data.enrollmentStatus;
                    }
                    if (res.data.enrollmentStatus=='Paid') {
                         this.es = res.data.enrollmentStatus;
                         this.admit=false;
                       }
                   this.sem = res.data.lastSY
                   this.sem = res.data.lastSY
                   if (res.data.lastSY!=null) {
                   var xy='';
                   if (this.sem.substring(6)=='1')
                     xy="1st Semester SY ";
                   else if (this.sem.substring(6)=='2')
                     xy="2nd Semester SY ";
                   else
                     xy="Summer SY ";
                   var y = parseInt(this.sem.substring(0,4)) + 1;
                   this.sem = xy + this.sem.substring(0,4) + "-" + y
                    this.g=1;
                    this.tableArr=[]
                }
              }
                        this.http.get(this.global.api+'Student/AcademicHistory/'+this.id+'/'+res.data.lastSY,this.global.option)
                          .map(response => response.json())
                          .subscribe(res => {
                            this.tableArr=res.data;
                            this.dataSource = new MatTableDataSource(this.tableArr);
                            this.dataSource.sort = this.sort;
                              this.http.get(this.global.api+'Student/EnrollmentHistory/'+this.id,this.global.option)
                                  .map(response => response.json())
                                  .subscribe(res => {
                                    this.tableArr2=res.data;this.g=0
                                      this.http.get(this.global.api+'Admission/RetentionPolicyLastSY/'+this.id,this.global.option)
                                        .map(response => response.json())
                                        .subscribe(res => {
                                          this.warndisplay1 = res.data
                                          if (res.data!=null) {
                                            if (res.data.blacklistedViolation == 1) {
                                              x=x+this.es+'<br>';
                                            }
                                          }
                                               this.http.get(this.global.api+'Student/Demography/'+this.id+'/'+this.global.syear,this.global.option)
                                                 .map(response => response.json())
                                                  .subscribe(res => {
                                                      this.global.swalClose();   
                                                      if (this.check != '') {
                                                          this.admit=true;
                                                          x=x+this.check;
                                                      }

                                                      var demog=''
                                                      if (this.global.domain=="COLLEGE") {
                                                        if (res.data.cForm138==false&&this.type.toString()!='2')
                                                         demog = demog + 'Form 138 is not yet submitted!<br>'
                                                        if (res.data.cnso==false) 
                                                         demog = demog + '*NSO Birth Certificate is not yet submitted!<br>'
                                                      }
                                                      
                                                      if (x!='') {
                                                         this.global.swalAlert("Acadims alert",x,"warning")
                                                      }else{
                                                        if (demog!='') {
                                                         this.global.swalAlert("Acadims alert",demog,"warning")
                                                        }
                                                        this.admit=false;
                                                      }
                                                  },Error=>{
                                                    this.global.swalAlertError(Error);
                                                  });
                                            this.http.get(this.global.api+'Admission/RetentionPolicySpecificSubjectType/'+this.id,this.global.option)
                                              .map(response => response.json())
                                              .subscribe(res => {   
                                                this.warndisplay3 =  []
                                                for (var i1 = 0; i1 < res.data.length; ++i1) {
                                                  if (res.data[i1+1]!=undefined) {
                                                    if (res.data[i1+1].subjectId==res.data[i1].subjectId) {
                                                      res.data[i1].retake_GradeNotLowerThan=''
                                                      this.warndisplay3.push(res.data[i1+1])
                                                      ++i1;
                                                    }else{
                                                      res.data[i1].retake_GradeNotLowerThan=''
                                                      this.warndisplay3.push(res.data[i1])
                                                    }
                                                  }else{
                                                    res.data[i1].retake_GradeNotLowerThan=''
                                                    this.warndisplay3.push(res.data[i1])
                                                  }
                                                }
                                              },Error=>{
                                                this.global.swalAlertError(Error);
                                              }); 
                                            this.http.get(this.global.api+'Admission/RetentionPolicyWholeSY/'+this.id,this.global.option)
                                            .map(response => response.json())
                                            .subscribe(res => { 
                                              this.warndisplay2 = res.data                                  
                                            },Error=>{
                                              console.log(Error)
                                              this.global.swalAlertError(Error);
                                            });                                         
                                        },Error=>{
                                          console.log(Error)
                                          this.global.swalAlertError(Error);
                                        });
                                    },Error=>{this.g=0
                                    //console.log(Error);
                                    console.log(Error)
                                    this.global.swalAlertError(Error);
                                  });
                          },Error=>{
                            //console.log(Error);
                            console.log(Error);this.g=0
                            this.global.swalAlertError(Error);
                          });
              }else{
              this.global.swalAlert(res.message,'','warning')
              }
            },Error=>{
                this.global.swalAlert("Please Check the ID number of the Student","",'warning');
            });
    }
  }
  }
  ngOnInit() {
    this.loadyears();
    this.getcourses();
    if (this.global.activeid!='') {
                        this.id=this.global.activeid
                        this.keyDownFunction('onoutfocus')
                      }
  }


  lastsy(){
    if (this.id != '') {
     const dialogRef = this.dialog.open(GradeLastSyComponent, {
            width: '750px',data:{sem:this.sem,tableArr:this.tableArr}, disableClose: false
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result==undefined) {
              // code...
            }else
            if (result.result!='cancel') {

            }
          });
      }else{
        this.global.swalAlert("Please Check the ID number of the Student","",'warning');
      }
  }
  enrollmenthistory(){
    if (this.id != '') {
     const dialogRef = this.dialog.open(EnrollmentHistoryComponent, {
            width: '750px',data:{tableArr:this.tableArr2}, disableClose: false
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result==undefined) {
              // code...
            }else
            if (result.result!='cancel') {

            }
          });
      }else{
        this.global.swalAlert("Please Check the ID number of the Student","",'warning');
      }
  }

  x=''
  yearfunc(x){
    if (x==0) {
      return true
    }

    if (this.warndisplay3[x].year==this.warndisplay3[x-1].year) {
      return false
    }else
    {
      return true
    }
  }
  y=''
  semfunc(y){
    if (y==0) {
      return true
    }

    if (this.warndisplay3[y].term==this.warndisplay3[y-1].term) {
      return false
    }else
    {
      return true
    }

  }

  redcount(x,type){
    if (type==0) {
      if (x=='false') {
        return '#ffd1d1'
      }
      return 'white'
    }else if (type==1) {
      if (x=='Failed') {
        return '#ffd1d1'
      }
      return 'white'
    }else
    if (x>0) {
      return '#ffd1d1'
    }
    return 'white'
  }
}
