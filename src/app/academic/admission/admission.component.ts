import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import { ShowGradeComponent } from './../lookup/show-grade/show-grade.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss']
})
export class AdmissionComponent implements OnInit {

  dataSource; 
  tableArr:Array<any>=[];

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

  g=0;

  coursetitle='Course'

constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http) { 
  this.http.get(this.global.api+'Admission/SYSettings/'+this.global.syear,this.global.option)
  .map(response => response.json())
  .subscribe(res => {
    if (res.data!=null) { 
      this.global.schoolyearsettings=res.data;
    }
  },Error=>{
    console.log(Error)
  });
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
    for (var i = 0; i < this.temparray.length; ++i) {
    this.http.get(this.global.api+'Admission/Courses/'+this.global.domain+'/'+this.temparray[i]+'/'+this.yearlevel,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          if (this.arraycourses.length==0) {
            this.arraycourses =res.data
          }else
            this.arraycourses = this.arraycourses.concat(res.data)
        },Error=>{
          this.global.swalAlertError(Error);
        });
  }
}

getcourses2(x){
  this.arraycourses=[]
  this.temparray=this.global.viewdomain
  for (var i = 0; i < this.temparray.length; ++i) {
  this.http.get(this.global.api+'Admission/Courses/'+this.global.domain+'/'+this.temparray[i]+'/'+x,this.global.option)
    .map(response => response.json())
    .subscribe(res => {
      this.arraycourses = this.arraycourses.concat(res.data)
    },Error=>{
      this.global.swalAlertError(Error);
    });
  }
}
loadyears(){
  if (this.global.domain=="GRADUATE SCHOOL") {
    this.yeardrop = [{year: 1,name: 1}];
  }else if (this.global.domain=="COLLEGE") {
    this.yeardrop = [{year: 1,name: 1}];
  }else if (this.global.domain=="HIGHSCHOOL") {
    this.yeardrop = [{year: '1',name: 'Grade 7'},{year: '5',name: 'Grade 11'}];
  }else if (this.global.domain=="ELEMENTARY") {
    this.yeardrop = [{year: 'P',name:'Pre-School'},{year: '0',name:'K'},{year: '1',name:'1'}];
  }
}

showgrade(){
  if (this.id != '') {
   const dialogRef = this.dialog.open(ShowGradeComponent, {
          width: '60%',data:{ id: this.checkId,name: this.lname +", "+this.fname+" "+this.mname+" "+this.suffix }, disableClose: false
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

ehist
admitstudent(){
  this.global.swalLoading('Admitting Student...');
  this.http.get(this.global.api+'Student/EnrollmentHistory/'+this.id,this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        this.ehist=res.data;
        var x=''
        var syear =this.global.syear
        if (this.global.domain=="HIGHSCHOOL"||this.global.domain=="ELEMENTARY") {
          if (this.global.syear.length == 7) {
            syear = this.global.syear.slice(0, -1)
          }
        }
          if (this.ehist.length!=0) {
            
            var check = false
            if (this.es.toUpperCase()=='ADMITTED')
              check = true
            
            for (var i = 0; i < this.ehist.length; ++i) {
                if (check&&this.ehist[i].schoolYear==syear) {
                }else{
                  if (this.ehist[i].schoolYear!=this.global.syear) {
                      if (this.global.domain=="GRADUATE SCHOOL"&&(this.ehist[i].programLevel==80||this.ehist[i].programLevel==90)) {
                      x="*Student record on the same department exists!";
                      break
                    }else if (this.global.domain=="COLLEGE"&&(this.ehist[i].programLevel==30||this.ehist[i].programLevel==40||this.ehist[i].programLevel==50||this.ehist[i].programLevel==60||this.ehist[i].programLevel==70)) {
                      x="*Student record on the same department exists!";
                      break
                    }else if (this.global.domain=="HIGHSCHOOL"&&(this.ehist[i].programLevel==20)) {
                      x="*Student record on the same department exists!";
                      break
                    }else if (this.global.domain=="ELEMENTARY"&&(this.ehist[i].programLevel=='00'||this.ehist[i].programLevel==0||this.ehist[i].programLevel==10)) {
                      x="*Student record on the same department exists!";
                      break
                    }
                  }
              }
            }
          }else{
            x=''
          }
          if (x=='') {
            this.http.post(this.global.api+'Admission/AdmitStudent' ,{
                      "idNumber": this.id,
                      "schoolYear": this.global.syear,
                      "programID": this.programid,
                      "year": this.yearlevel,
                      "type": this.type
                  },this.global.option)
                    .map(response => response.json())
                    .subscribe(res => {
                      if (res.message=='Student admitted successfully.') {
                        this.global.swalSuccess(res.message);
                        let myVar = setInterval(() => {
                              this.keyDownFunction('onoutfocus')
                              clearInterval(myVar);
                            },1000)
                      }else{
                        this.global.swalAlert("Warning",res.message,'warning');
                      }
                      
                    },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError(Error);
                    });
          }else
            this.global.swalAlert("Admission Failed!",x,"warning")
        },Error=>{this.g=0
            this.global.swalAlertError(Error);
        });
  }

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
        }else {this.check="Invalid School Year<br>";}

      },Error=>{
        //console.log(Error);
        console.log(Error)
      });
    this.global.swalLoading('Loading Student Information');
    this.http.get(this.global.api+'Student/'+this.id+'/'+this.global.syear+'/'+this.global.domain,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          if (res.message=="Student found.") {
            this.admit=false;
            this.coursetitle =res.data.course
          	this.student = res;
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
            this.yearlevel=res.data.yearOrGradeLevel.toString();
            if (res.data.level!=this.global.domain&&res.data.level!='denied') {
              this.yearlevel=0
            }else if (res.data.level=='denied') {
              this.yearlevel=res.data.yearOrGradeLevel.toString();
            }
            this.type = res.data.enrollmentType.toString()
            if (res.data.enrollmentType==0) {
              this.type=1
            }
            this.course = res.data.courseCode.toString();
            this.courseCode = res.data.courseCode.toString();

            this.getcourses();

            this.programid = res.data.programID.toString();
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
                      this.admit=false;
                      this.es = "Blacklisted("+blacklist+")";
              }else
                 this.es = "For Admission";
                 
            }else{
                this.es = res.data.enrollmentStatus;
                this.admit=true;
            }
                if (res.data.enrollmentStatus=='Admitted') {
                    this.admit=false;
                    this.es = res.data.enrollmentStatus;
                  // code...
                }
              if (res.data.enrollmentStatus=='Paid') {
                   this.es = res.data.enrollmentStatus;
                   this.admit=false;
                 }
            var x='';    
            this.global.swalClose();    

            if ((x+this.check) != '') {
              x=x+this.check;
              this.admit=true;
            }

            if (x!='') {
              this.admit=true;
              this.global.swalAlert("Acadims alert",x,"warning")
              // code...
            }
             this.sem = res.data.lastSY
             if (res.data.lastSY!=null) {
               var x='';
               if (this.sem.substring(6)=='1')
                x="1st Semester SY ";
               else if (this.sem.substring(6)=='2')
                x="2nd Semester SY ";
               else
                x="Summer SY ";
                var y = parseInt(this.sem.substring(0,4)) + 1;
                this.sem = x + this.sem.substring(0,4) + "-" + y
                this.g=1;this.tableArr=[]
                this.http.get(this.global.api+'Student/AcademicHistory/'+this.id+'/'+res.data.lastSY,this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.g=0;
                    this.tableArr=res.data;
                    this.dataSource = new MatTableDataSource(this.tableArr);
                    this.dataSource.sort = this.sort;
                  },Error=>{
                    //console.log(Error);
                    console.log(Error)
                    this.g=0;
                  });
               // code...
             }else{
              this.tableArr=[];
              this.dataSource = new MatTableDataSource(this.tableArr);
              this.dataSource.sort = this.sort;
                        this.g=0;
             }
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
    if (this.global.activeid!='') {
      this.id=this.global.activeid
      this.keyDownFunction('onoutfocus')
    }
  }
}
