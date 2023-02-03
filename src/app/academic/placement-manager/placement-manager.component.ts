import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import { ShowGradeComponent } from './../lookup/show-grade/show-grade.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';
import Swal from 'sweetalert2';import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { PlacementReportcardComponent } from './placement-reportcard/placement-reportcard.component';

const swal = Swal;
@Component({
  selector: 'app-placement-manager',
  templateUrl: './placement-manager.component.html',
  styleUrls: ['./placement-manager.component.scss']
})
export class PlacementManagerComponent implements OnInit {
	lname=''
	mname=""
	fname=""
	suffix=''
	id=''
	tno=''
	cno=''
	g=0
	image:any='assets/noimage.jpg'

  examschedval=''
  examsched=[]
  resultval=''
  result=[]


  etypeval=''
  etype:any=[]
	
  myportalbutton=true
  myportalstatus=false

  
  constructor(public datepipe: DatePipe,public dialog: MatDialog,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http) { 
    
  }
  
  HSresult(){
     var x=''
     if (this.preference.jhS_CourseId!=''&&this.preference.jhS_CourseId!=null) {
       x="JHS"
     }
     if (this.preference.shS_PriorityStrandId1!=''&&this.preference.shS_PriorityStrandId1!=null) {
       x="SHS"
     }

     if (x=='JHS') {
       this.swalConfirmSHS("","You are about to send the Placement Result(PASSED Status) to the student(JHS)",'info','Send SMS',x);
     }else if (x='SHS'){
       this.swalConfirmSHS("","You are about to send the Placement Result(PASSED Status) to the student(SHS)",'info','Send SMS',x);
     }else{

     }
  }

  swalConfirmSHS(title,text,type,button,type2){
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

            this.global.swalLoading('')
              var option
              var header = new Headers();
              header.append("Content-Type", "application/json");
              option = new RequestOptions({ headers: header });
              this.http.get(this.global.acctgApi+'getphpfile/Placement-HIGHSCHOOL.php?'
                +"cpnumber="+this.cno
                +"&idnumber="+this.id
                +"&firstname="+this.fname
                +"&middlename="+this.mname
                +"&lastname="+this.lname
                +"&domain="+this.global.domain
                +"&type="+type2
                +"&strand="+this.preference.shS_PriorityStrandId1
                +"&curi="+this.preference.jhS_CourseId
                )
                .map(response => response.text())
                .subscribe(res => {
                  if (res=='Message Sent!') {
                    this.global.swalSuccess(res) 
                    this.http.put(this.global.api+'Placement/SMSTestResult/'+this.id,{},this.global.option)
                        .map(response => response.json())
                        .subscribe(res => {
                          this.preference.testResultSent=true
                        });
                  }else{
                    this.global.swalAlert(res,'','warning')
                  }
                },Error=>{
                  console.log(Error)
                  this.global.swalAlertError(Error)
                });
        }
      })
    }

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

    if (this.global.domain == 'ELEMENTARY'||this.global.domain == 'HIGHSCHOOL') {
      c=''
    }
    return "School Year "+a + " " + c
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

  room=[]
  smsleft='loading...'
  sy
  ngOnInit() {
     this.rooms = [
       {roomid:'0',roomname:'(not set)'},
       {roomid:'1',roomname:'Online'},
       {roomid:'2',roomname:'Room N-7'},
       {roomid:'3',roomname:'Room N-13'},
       {roomid:'6',roomname:'Room N-6'},
       {roomid:'7',roomname:'Room N-17'},
       {roomid:'8',roomname:'Room N-18'},
       {roomid:'9',roomname:'Room N-19'},
     ]
               this.http.get(this.global.acctgApi+'getphpfile/Placement-textmessage-left.php')
                .map(response => response.text())
                .subscribe(res => {
                    this.smsleft=res
                });

            if (this.global.activeid!='') {
              this.id=this.global.activeid
              this.keyDownFunction('onoutfocus')
            }
            this.sy = this.global.syear
            if (this.global.domain == 'ELEMENTARY'||this.global.domain == 'HIGHSCHOOL') {
              if (this.global.syear.length==7) {
                this.sy = this.global.syear.slice(0, -1)
              }
            }
  }



  programLevel=''
  resetfields(){
  	this.image='assets/noimage.jpg'
  	this.lname=''
  	this.mname=""
  	this.fname=""
  	this.suffix=''
  	this.tno=''
  	this.cno=''
    }
    strand=[]
    preference:any=[]
    strandfiltered=[]
    strandfilteredjhs=[]
    myportal=true

    savestatus=false
    selectedsem=''
    enrollmentstatus=''
    saved=false
    recosaved=false
    programID=''
    course=''
    courseCode=''
    selectrecommended='0'
    preferredCourseId=''
    gResult=''
    shS_PriorityStrandId1=''
    jhS_CourseId=''
    alternativeCourseId1=''
    checkdouble:any
    gResulttext=''
    testScheduleId=''
    onlinedata:any=undefined

   keyDownFunction(event,check=null){
      if((event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus')&&this.id!='') {
        this.global.swalLoading('Loading Student Information');
        this.savestatus=false
        this.global.activeid=this.id
        this.http.get(this.global.api+'Student/'+this.id+'/'+this.global.syear+'/'+this.global.domain,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
          if (res.message=="Student found.") {
            this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
            this.fname=res.data.firstName;
      		  this.mname=res.data.middleName;
      		  this.lname=res.data.lastName;
      		  this.suffix=res.data.suffixName;
      		  this.cno=res.data.contactNo;
            this.enrollmentstatus=res.data.enrollmentStatus
            this.programID=res.data.programID
            this.course= res.data.course
            this.courseCode= res.data.courseCode
            this.http.get(this.global.api+'Placement/'+this.id,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
            if (res.data.gResult==null) {
              res.data.gResult=''
            }
            this.preferredCourseIdtext=''
            this.alternativeCourseId1text=''
            this.alternativeCourseId2text=''
            this.gResulttext=''
            this.preferredCourseId=res.data.preferredCourseId
            this.alternativeCourseId1=res.data.alternativeCourseId1
            this.gResult=res.data.gResult
            this.shS_PriorityStrandId1=res.data.shS_PriorityStrandId1
            this.jhS_CourseId=res.data.jhS_CourseId
            this.preference=res.data
            this.preference.testScheduleId=res.data.testScheduleId.toString()
            this.testScheduleId = this.preference.testScheduleId
            this.preference.examRoom=res.data.examRoom.toString()
            if (res.data.result!=null) {
             this.preference.result=res.data.result.toString()
            }else
             this.preference.result='0'             
            if (this.preference.result=='P') {
              this.saved=true
            }else
              this.saved=false  

            if (this.preference.result=='R') {
              this.recosaved=true
            }else
              this.recosaved=false
            this.preference.exemptionType=res.data.exemptionType.toString()
            this.preference.result=res.data.result.toString()
            this.preference.strand=res.data.strand.toString()
            if (res.data.result == '') {
              this.preference.result='0'
            }
            if (res.data.result.toString()=='P') {
              this.myportalbutton=false
            }else
              this.myportalbutton=true
              
              this.preference.courr=''
              if (this.enrollmentstatus=="Admitted"&&(this.courseCode=='SHS')) {
                this.preference.courr='shs'
               this.preference.shS_PriorityStrandId1 = this.programID.toString()
             }if (this.enrollmentstatus=="Admitted"&&(this.course=='(Academic)'||this.course=='HSAdvSci'||this.course=='(Science)')) {
               this.preference.jhS_CourseId = this.programID.toString()
                this.preference.courr='jhs'
             }
             this.vit = this.preference.vit
             this.nvit = this.preference.nvit
             this.checkdouble=this.preference
              this.http.get(this.global.api+'Placement/CheckUserInfo/'+this.id,this.global.option)
               .map(response => response.json())
              .subscribe(res => {
                this.loaddata(this.id)
                if (res.data == null) {
                   this.myportalbutton = false;
                }else{
                  this.myportalbutton = true;
                  this.myportalstatus = true
                }

                this.http.get(this.global.api+'PublicAPI/Strands')
                 .map(response => response.json())
                 .subscribe(res => {
                   if (this.global.domain == 'HIGHSCHOOL') {
                       this.http.get(this.global.api+'Placement/Courses/'+this.global.domain+'/0009/4',this.global.option)
                         .map(response => response.json())
                         .subscribe(res => {
                           this.strandfilteredjhs=res.data
                     },Error=>{
                      this.global.swalAlertError(Error);
                     })
                   }
                   this.strand=res.data
                   this.strandfiltered=[]
                   this.strandfiltered.push({strandId:'900009',strandTitle:'Accountancy, Business and Management Strand',strandCode:"ABM"})
                   this.strandfiltered.push({strandId:'900011',strandTitle:'Humanities and Social Sciences Strand',strandCode:"HUMSS"})
                   this.strandfiltered.push({strandId:'900013',strandTitle:'Science, Technology, Engineering and Mathematics Health Strand',strandCode:"STEM(H)"})
                   this.strandfiltered.push({strandId:'900010',strandTitle:'Science, Technology, Engineering and Mathematics-Non-Health Strand',strandCode:"STEM(NH)"})

                 this.http.get(this.global.api+'OnlineRegistration/Applicants/'+this.sy+'?programLevel=01&eProgramLevel=07&idNumber='+this.id,this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.global.swalClose()
                    if (check == 1) {
                       this.global.swalSuccess("Placement data saved!")
                    }

                    if (res.data.length!=0) {

                    this.loaddata(this.id)
                    this.onlinedata=res.data[0]

                    this.cno = res.data[0].contactNumber
                    if (this.preference.examForSchoolYear==null||this.preference.examForSchoolYear==''){
                      this.preference.examForSchoolYear = res.data[0].schoolYear
                        this.programLevel = res.data[0].programLevel
                        if (this.global.domain == 'ELEMENTARY') {
                          if (res.data[0].programLevel=='01'||res.data[0].programLevel=='02'||res.data[0].programLevel=='03') {
                            this.savestatus = false
                          }else{
                            this.global.swalAlert("Applicant not in ELEMENTARY level",'','warning')
                             this.savestatus = true
                          }
                        }if (this.global.domain == 'HIGHSCHOOL') {
                          if (res.data[0].programLevel=='04'||res.data[0].programLevel=='05') {
                            this.savestatus = false
                          }else{
                            this.global.swalAlert("Applicant not in HIGHSCHOOL level",'','warning')
                             this.savestatus = true
                          }
                          if (res.data[0].programLevel=='05') {
                            if (this.shS_PriorityStrandId1==null) {
                              this.preference.shS_PriorityStrandId1=res.data[0].shS_PriorityStrandID1
                            }
                          }
                        }if (this.global.domain == 'COLLEGE') {
                          if (res.data[0].programLevel=='06') {
                            this.savestatus = false
                            this.preference.preferredCourseId = res.data[0].preferredCourseID
                            this.preference.alternativeCourseId1 = res.data[0].alternativeCourseID1
                            this.preference.strand = res.data[0].strandId.toString()
                            this.preference.alternativeCourseId2 = res.data[0].alternativeCourseID2
                            
                          }else{
                            this.global.swalAlert("Applicant not in COLLEGE level",'','warning')
                             this.savestatus = true
                          }
                        }if (this.global.domain == 'GRADUATE SCHOOL') {
                          if (res.data[0].programLevel=='07') {
                            this.savestatus = false
                          }else{
                            this.global.swalAlert("Applicant not in GRADUATE SCHOOL level",'','warning')
                             this.savestatus = true
                          }
                        }
                      }
                    }
                },Error=>{
                    this.global.swalAlertError(Error);
                  });
                 },Error=>{
                  this.global.swalAlertError(Error);
                 })
            },Error=>{
              this.global.swalAlertError(Error);
             })
          },Error=>{
            this.savestatus = true
          	this.global.swalAlertError(Error)
            console.log(Error)
          });
	  	}else{
	    	this.resetfields()
	  		this.global.swalAlert('Student not found!','','warning')
	  	}
          },Error=>{
          	this.global.swalAlertError(Error)
            console.log(Error)
          });
    	}
	}
  checkifexist(x){
    for (var i = 0; i < this.courses.length; ++i) {
       if (this.courses[i].programId==x) {
         return false
       }
    }
    return true
  }
	history=[]
  courses=[]
  rooms=[]
  roomval=''
  examdate=''
  sylist=[]
  vitnvit=[]
	loaddata(x,y=null){
		this.g=1
		 this.http.get(this.global.api+'Placement/EnrollementHistory/'+x,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
          	this.history=res.data
            if (y!=null) {
              this.cno = y;
            }
				 this.http.get(this.global.api+'Placement/Schedules/'+this.global.syear,this.global.option)
		          .map(response => response.json())
		          .subscribe(res => {
                this.examsched=res.data
					      this.g=0
                this.http.get(this.global.api+'Placement/CoursesWithStrand/',this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.courses=[]
                    if (this.global.domain=="COLLEGE") {
                      for (var i1 = 0; i1 < res.data.length; ++i1) {
                        if (res.data[i1].programLevel=='50') {
                        this.courses.push(res.data[i1])
                        }
                      }
                    }else if (this.global.domain=="GRADUATE SCHOOL"){
                      for (var i1 = 0; i1 < res.data.length; ++i1) {
                        if (res.data[i1].programLevel=='80'||res.data[i1].programLevel=='90') {
                        this.courses.push(res.data[i1])
                        }
                      }
                    }
                    this.g=0
                       this.http.get(this.global.api+'PublicAPI/SYOptionsList',this.global.option)
                          .map(response => response.json())
                          .subscribe(res => {
                            this.selectedsem = this.global.syear;
                            this.sylist=[]
                            if (this.global.domain == 'ELEMENTARY'||this.global.domain == 'HIGHSCHOOL') {
                              for (var i = 0; i < res.data.length; ++i) {
                                if (res.data[i].syWithSem.substr(res.data[i].syWithSem.length - 1)=='1') {
                                  this.sylist.push({syWithSem:res.data[i].syWithSem.slice(0, -1),schoolYear:res.data[i].schoolYear})
                                }
                              }
                            }else
                              this.sylist=res.data
                            this.http.get(this.global.api+'Placement/VitNVitNorm',this.global.option)
                            .map(response => response.json())
                            .subscribe(res => { 
                              this.vitnvit=res.data
                              this.checkchanges()
                            },Error=>{
                              console.log(Error)
                              this.global.swalAlertError(Error);
                            });
                          },Error=>{
                             this.global.swalAlertError(Error);
                          });
                        },Error=>{
                          this.global.swalAlertError(Error)
                          console.log(Error)
                    this.g=0
                        });
		          },Error=>{
		          	this.global.swalAlertError(Error)
		            console.log(Error)
					      this.g=0
		          });
          },Error=>{
          	this.global.swalAlertError(Error)
            console.log(Error)
			this.g=0
          });
	}
  createaccount(){
    this.global.swalLoading('')
    this.http.post(this.global.api+'Placement/StudentMyPortalAccount' ,{
                  'IdNumber':this.id
                },this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                      this.myportalbutton=true
                      this.global.swalSuccess("MyPortal account created!")
                  });
  }
  savebuttontemp=true
  savebutton(){
    if (this.savebuttontemp==true) { 
          this.savebuttontemp=false
          var x = ''
          if (this.global.domain == 'HIGHSCHOOL'||this.global.domain == 'ELEMENTARY') {
          }
          if (this.global.domain == 'GRADUATE SCHOOL'||this.global.domain == 'COLLEGE') {
             if (this.preference.preferredCourseId==null||this.preference.preferredCourseId=='') {
               x=x+"*Preffered course is required!<br>"
            }
          }


          if (x=='') {
               this.global.swalLoading('')
               if (this.preference.strand=='') {
                 this.preference.strand=null;
               }
               if (this.preference.preferredCourseId!=null) {
               for (var i1 = 0; i1 < this.courses.length; ++i1) {
                 if (this.courses[i1].programId==this.preference.preferredCourseId) {
                   this.preference.preferredCourse=this.courses[i1].courseCode
                 }
                 if (this.courses[i1].programId==this.preference.alternativeCourseId1) {
                   this.preference.alternativeCourse=this.courses[i1].courseCode
                 }
               }
             }

               if (this.preference.shS_PriorityStrandId1!=null) {
               for (var i2 = 0; i2 < this.strandfiltered.length; ++i2) {
                 if (this.strandfiltered[i2].strandId==this.preference.shS_PriorityStrandId1) {
                   this.preference.shS_PriorityStrand1=this.strandfiltered[i2].strandCode
                 }
                 if (this.strandfiltered[i2].strandId==this.preference.shS_PriorityStrandId2) {
                   this.preference.shS_PriorityStrand2=this.strandfiltered[i2].strandCode
                 }
               }
             }
               if (this.preference.jhS_CourseId!=null) {
               for (var i2 = 0; i2 < this.strandfilteredjhs.length; ++i2) {
                 if (this.strandfilteredjhs[i2].programID.toString()==this.preference.jhS_CourseId.toString()) {
                   var n = this.strandfilteredjhs[i2].course.split(" ")
                   this.preference.jhS_Course= n[0]
                   break
                 }
               }
                 // code...
               }
               this.http.put(this.global.api+'Placement/'+this.id ,{
                        "ExamDate": this.preference.examDate,
                        "PreferredCourse": this.preference.preferredCourse,
                        "AlternativeCourse": this.preference.alternativeCourse,
                        "Level": 0,
                        "VIT": this.preference.vit,
                        "NVIT": this.preference.nvit,
                        "PreferredCourseId": this.preference.preferredCourseId,
                        "AlternativeCourseId1": this.preference.alternativeCourseId1,
                        "AlternativeCourseId2": this.preference.alternativeCourseId2,
                        "ExemptionType":this.preference.exemptionType,
                        "Strand": this.preference.strand,
                        "Result": this.preference.result,
                        "GResult": this.preference.gResult,
                        "TestSchedule":this.preference.testScheduleId,
                        "ExamRoom":this.preference.examRoom,
                        "ExamForSchoolYear": this.preference.examForSchoolYear,
                        "Elem_ExamResult": this.preference.elem_ExamResult,
                        "Elem_CourseId": this.preference.elem_CourseId,
                        "Elem_Course": this.preference.elem_Course,
                        "JHS_ExamResult":this.preference.jhS_ExamResult,
                        "JHS_CourseId": this.preference.jhS_CourseId,
                        "JHS_Course": this.preference.jhS_Course,
                        "SHS_ExamResult":this.preference.shS_ExamResult,
                        "SHS_PriorityStrandId1": this.preference.shS_PriorityStrandId1,
                        "SHS_PriorityStrand1": this.preference.shS_PriorityStrand1,
                        "SHS_PriorityStrandId2": this.preference.shS_PriorityStrandId2,
                        "SHS_PriorityStrand2": this.preference.shS_PriorityStrand2
                      },this.global.option)
                        .map(response => response.json())
                        .subscribe(res => {
                          this.savebuttontemp=true
                          if (this.preference.result=='P'||this.preference.result=='R') {
                            this.myportalbutton=false
                          }else
                            this.myportalbutton=true
                            this.saved=true
                            this.recosaved=true
                            this.keyDownFunction('onoutfocus',1)
                        },Error=>{
                          console.log(Error)
                          this.global.swalAlertError(Error)
                        });
          }else
          {
            this.global.swalAlert("Field required!",x,'warning')
           this.savebuttontemp=true
          }
        }

  }
  updatereleasetemp=false
  updaterelease(){
    this.updatereleasetemp=true
    var x = ''
    if (this.preference.dateReleased==null) {
      this.preference.dateReleased = ''
    }
    if (this.preference.dateReleased==''||this.preference.dateReleased==null) {
      x=x+"*Released date is required!"
    }
    if (this.preference.releasedBy==null) {
      this.preference.releasedBy = ''
    }
    if (x=='') {
      this.http.put(this.global.api+'Placement/Release/'+this.id ,{
          "ReleaseDate": this.preference.dateReleased,
          "Released": this.preference.released,
          "ReleasedBy": this.global.requestid()
        },this.global.option)
          .map(response => response.json())
          .subscribe(res => {
              this.updatereleasetemp=false
              this.keyDownFunction('onoutfocus')
              this.global.swalSuccess("Release info. updated!")
          });
    }else{
      this.global.swalAlert("Field required!",x,'warning')
    this.updatereleasetemp=false
    }
    
  }
  getcoursecode(x){
    if (x!=null) {
    for (var i = 0; i < this.courses.length; ++i) {
      if (this.courses[i].programId.replace(/\s/g,'')==x.replace(/\s/g,'')) {
       return this.courses[i].courseCode
      }
    }
    return "Course not offered"
      // code...
    } return ""
  }
  checkresult(x){
    for (var i = 0; i < this.vitnvit.length; ++i) {
      if (this.vitnvit[i].courseCode==x) {
        if ((this.preference.vit==0||this.preference.nvit==0)||(this.preference.vit==null||this.preference.vit==null)||(this.preference.vit==''||this.preference.vit=='')) {
          return '- vit/nvit not set -'
        }
        if (this.preference.vit==1&&this.preference.nvit==1) {
          return 'Not Qualified'
        }else 
        if (this.vitnvit[i].vit>this.preference.vit||this.vitnvit[i].nVit>this.preference.nvit) {
          return 'Recommended'
        }else{
          return 'Passed'
        }
      }
    }
    return '- Not Set -'
  }

  sendtestsched(typex){
    var x=''
    if (this.preference.testScheduleId=='0'&&(this.programLevel=='06'||this.programLevel=='07')) {
      x=x+"*Exam Schedule not set.<br>"
    }
    if (this.preference.result=='0') {
      x=x+"*Result not set.<br>"
    }
    if (this.cno==''||this.cno==null) {
      x=x+"*Mobile Number is not set.<br>"
    }

    if (this.preference.jhS_CourseId!=this.jhS_CourseId) {
       x=x+"*Curriculum does not match the saved data!<br>"
     }
     if (this.preference.shS_PriorityStrandId1!=this.shS_PriorityStrandId1) {
       x=x+"*Guildance result not match the saved data!<br>"
     }
   
    if (x=='') {
      if (typex=='1') {
        this.confirmtext(typex)
      }else{
        var type
        if (this.preference.result=='P') {
          type = '2';
        }else
        if (this.preference.result=='R') {
          type = '3';
        }else
        if (this.preference.result=='F') {
          type = '4';
        }
        this.confirmtext(type)
      }
    }else
    {
      this.global.swalAlert("Cannot send the message due to the following error:",x+"<br>Please save before sending.",'warning')
    }
  }

sendexamschedule(){
    var x=''

          if (this.preference.testScheduleId!=this.testScheduleId){
                 x=x+"*Exam Schedule does not match the saved data!<br>"
          }
             var datesched=''
              for (var i = 0; i < this.examsched.length; ++i) {
                if (this.preference.testScheduleId.toString() == this.examsched[i].id.toString()) {
                  datesched = this.examsched[i].testDate
                  break;
                }
              }


          if (this.preference.testScheduleId == '0') {
               x=x+"*Exam Schedule is required!<br>"
          }else if (datesched=='') {
                 x=x+"*Exam Schedule is required!<br>"
              }
          if (this.preference.examRoom == '0') {
               x=x+"*Exam Room is required!<br>"
          }
          x=x+'<br>Please save before sending.';
    if (x=='<br>Please save before sending.') {
      this.confirmtextexamschedule("You are about to send the Placement Exam Schedule to the student.",'','question','','Send SMS')
    }else
    {
      this.global.swalAlert("Cannot send the message due to the following error:",x,'warning')
    }
  }

  confirmtextexamschedule(title,text,type,remove,button){
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
          if (remove=='') {
            this.global.swalLoading('')
              var option
              var header = new Headers();
              var course = ''
              header.append("Content-Type", "application/json");
              option = new RequestOptions({ headers: header });
              
              var datesched=''
              for (var i = 0; i < this.examsched.length; ++i) {
                if (this.preference.testScheduleId.toString() == this.examsched[i].id.toString()) {
                  datesched = this.examsched[i].testDate
                  break;
                }
              }

              this.http.get(this.global.acctgApi+'getphpfile/Placement-test-schedule.php?'
                +"datesched="+datesched
                +"&idnumber="+this.id
                +"&type=1"
                +"&cpnumber="+this.cno
                )
                .map(response => response.text())
                .subscribe(res => {
                  if (res=='Message Sent!') {
                    this.global.swalSuccess(res) 
                    this.http.put(this.global.api+'Placement/SMSTestSchedule/'+this.id,{},this.global.option)
                        .map(response => response.json())
                        .subscribe(res => {
                          this.preference.testSchedSent=true
                        });
                  }else{
                    this.global.swalAlert(res,'','warning')
                  }
                },Error=>{
                  console.log(Error)
                  this.global.swalAlertError(Error)
                });

            }
        }
      })
  }

  vit=''
  nvit=''
sendrecommended(type){
    var x=''
      if(type == '1'){
          if (this.selectrecommended == '0') {
               x=x+"*Option for recommended status is required!<br>"
          }
          else if (this.selectrecommended == '1'){
            if (this.preference.preferredCourseId==null||this.preference.preferredCourseId=='') {
               x=x+"*Preffered course is required!<br>"
            }
            if (!(this.preference.gResult==null||this.preference.gResult=='')) {
               x=x+"*Guildance result must be empty!<br>"
            }
          }
          else if (this.selectrecommended == '2'){
            if (this.preference.preferredCourseId==null||this.preference.preferredCourseId=='') {
               x=x+"*Preffered course is required!<br>"
            }
          }else if (this.selectrecommended == '3'){
            if (this.preference.gResult==null||this.preference.gResult=='') {
               x=x+"*Guildance result is required!<br>"
            }
          }
        }
     
      if(type == '2'){
        if (this.preference.preferredCourseId==null||this.preference.preferredCourseId=='') {
              x=x+"*Preffered course is required!<br>"
        }
      }
     if (this.preference.vit==0||this.preference.nvit==0) {
           x=x+"*Vit/NVit stanine is required!<br>"
         }if (this.vit!=this.preference.vit) {
           x=x+"*Vit stanine does not match the saved data!<br>"
         }
         if (this.nvit!=this.preference.nvit) {
           x=x+"*NVit stanine does not match the saved data!<br>"
         }
     
     if (this.preference.preferredCourseId!=this.preferredCourseId) {
       x=x+"*Preffered Course does not match the saved data!<br>"
     }
     if (this.preference.gResult!=this.gResult) {
       x=x+"*Guildance result not match the saved data!<br>"
     }
    if (x=='') {
      if (this.preference.result=='P'||this.preference.result=='R') {
        this.confirmtextrecommendedstatus(type)
      }else{
        this.global.swalAlert("Only PASSED or RECOMMENDED status is allowed to send.",'','warning')
      }
    }else
    {
      this.global.swalAlert("Cannot send the message due to the following error:",x+"<br>Please save before sending.",'warning')
    }
  }
 
 reportCardFollowUp(){
   swal.fire({
        title: "Send follow up on report card?",
        html: '',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Send SMS"
      }).then((result) => {
        if (result.value) {
          this.global.swalLoading("Sending SMS...")
          this.http.get(this.global.acctgApi+'getphpfile/Placement-COLLEGE-recommended.php?'
                +"type2=3"
                +"&cpnumber="+this.cno
                +"&idnumber="+this.id
                )
                .map(response => response.text())
                .subscribe(res => {
                  if (res=='Message Sent!') {
                    this.global.swalSuccess(res) 
                    this.http.put(this.global.api+'Placement/SMSReportCard/'+this.id,{ "Success": 1 },this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {
                        this.preference.reportCard_FollowUp_SMS_Ctr++
                    },Error=>{
                      console.log(Error)
                      this.global.swalAlertError(Error)
                    });
                  }else{
                    this.global.swalAlert(res,'','warning')
                  }
                },Error=>{
                  console.log(Error)
                  this.global.swalAlertError(Error)
                });
          
        }
      })
 }

 confirmtextrecommendedstatus(type){
   var c=''
   var n='' 
   if (this.preference.result == 'P')
     n = "PASSED"
   if (this.preference.result == 'R')
     n = "Recommended"
   if (type=='1') {
     c="You are about to send the Placement Result("+n+" Status) to the student."
   }else
     c = 'You are about to send the Placement Result('+n+' Status) to the student.'
    this.swalConfirmrecommendedstatus("",c,'info','Send SMS','send',type);
 }
 swalConfirmrecommendedstatus(title,text,type,button,remove,typex){
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

            this.global.swalLoading('')
            if (this.preference.result=='R'||this.preference.result=='P') {

              var option
              var header = new Headers();
              var course = ''
              for (var i3 = 0; i3 < this.courses.length; ++i3) {
                if (this.preference.gResult == this.courses[i3].programId) {
                  course = this.courses[i3].courseCode
                }
              }
              header.append("Content-Type", "application/json");
              option = new RequestOptions({ headers: header });
              this.http.get(this.global.acctgApi+'getphpfile/Placement-COLLEGE-recommended.php?'
                +"depcode="+this.preference.deptCode
                +"&cpnumber="+this.cno
                +"&idnumber="+this.id
                +"&firstname="+this.fname
                +"&middlename="+this.mname
                +"&lastname="+this.lname
                +"&course="+course
                +"&type="+this.selectrecommended
                +"&type2="+typex
                )
                .map(response => response.text())
                .subscribe(res => {
                  if (res=='Message Sent!') {
                    this.global.swalSuccess(res) 
                    this.http.put(this.global.api+'Placement/SMSTestResult/'+this.id,{},this.global.option)
                        .map(response => response.json())
                        .subscribe(res => {
                          this.preference.testResultSent=true
                        });
                  }else{
                    this.global.swalAlert(res,'','warning')
                  }
                },Error=>{
                  console.log(Error)
                  this.global.swalAlertError(Error)
                });
            }else {
                this.global.swalAlert("Result is invalid.",'','warning')
              }
        }
      })
  }

  confirmtext(typex){
    this.swalConfirm("","You are about to send the Placement Schedule to the student.",'info','Send SMS','send',typex);
 }
 swalConfirm(title,text,type,button,remove,typex){
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
          if (remove=='send') {
            this.global.swalLoading('')
            if (this.preference.result=='P') {
              var datesched:any
              for (var i = 0; i < this.examsched.length; ++i) {
                if (this.preference.testScheduleId == this.examsched[i].id) {
                  datesched =this.datepipe.transform(this.examsched[i].testDate,'MMMM dd, yyyy - h:mmaaa');
                  break
                }
              }
              var venue:any
              for (var i = 0; i < this.rooms.length; ++i) {
                if (this.preference.examRoom == this.rooms[i].roomid) {
                  venue = this.rooms[i].roomname;
                  break
                }
              }
              var course
              if (this.preference.jhS_CourseId!=null&&this.preference.jhS_CourseId!='') {
               for (var i2 = 0; i2 < this.strandfilteredjhs.length; ++i2) {
                 if (this.strandfilteredjhs[i2].programID.toString()==this.preference.jhS_CourseId.toString()) {
                   var n = this.strandfilteredjhs[i2].course.split(" ")
                   this.preference.jhS_Course= n[0]
                   break
                 }
               }
              }else if(this.preference.shS_PriorityStrandId1!=null&&this.preference.shS_PriorityStrandId1!=''){
                for (var i2 = 0; i2 < this.strandfiltered.length; ++i2) {
                   if (this.strandfiltered[i2].strandId==this.preference.shS_PriorityStrandId1) {
                     course=this.strandfiltered[i2].strandCode
                     break
                   }
                 }
               }
               var code='jhs'
               if (this.preference.jhS_CourseId!=null) {
                 code='jhs'
               }
               if (this.preference.shS_PriorityStrandId1!=null) {
                 code='shs'
               }

               if (this.preference.courr!='') {
                code=this.preference.courr
               }

              var option
              var header = new Headers();
              header.append("Content-Type", "application/json");
              option = new RequestOptions({ headers: header });
              this.http.get(this.global.acctgApi+'getphpfile/Placement-HIGHSCHOOL-schedule.php?datesched='
                +datesched
                +"&venue="+venue
                +"&course="+course
                +"&cpnumber="+this.cno
                +"&idnumber="+this.id
                +"&firstname="+this.fname
                +"&middlename="+this.mname
                +"&lastname="+this.lname
                +"&domain="+this.global.domain
                +"&type="+typex
                +"&strand="+this.preference.shS_PriorityStrandId1
                +"&curi="+this.preference.jhS_CourseId
                +"&code="+code
                )
                .map(response => response.text())
                .subscribe(res => {
                  if (res=='Message Sent!') {
                    this.global.swalSuccess(res) 
                    this.http.put(this.global.api+'Placement/SMSTestResult/'+this.id,{},this.global.option)
                        .map(response => response.json())
                        .subscribe(res => {
                          this.preference.testResultSent=true
                        });
                  }else{
                    this.global.swalAlert(res,'','warning')
                  }
                },Error=>{
                  console.log(Error)
                  this.global.swalAlertError(Error)
                });
            }else{
                this.global.swalAlert("Result is invalid.",'','warning')
              }
            }
        }
      })
  }


preferredCourseIdtext=''
alternativeCourseId1text=''
alternativeCourseId2text=''
  checkchanges(){
    var x=''
       this.preferredCourseIdtext = this.checkresult(this.getcoursecode(this.preference.preferredCourseId))
       if (this.preferredCourseIdtext=='- vit/nvit not set -'){
          x= ''
       }else if (this.preferredCourseIdtext=='Not Qualified'){
          x = 'F'
       }else if (this.preferredCourseIdtext=='Recommended'){
          x = 'R'
       }else if (this.preferredCourseIdtext=='Passed'){
          x = 'P'
       }
       if (this.preference.result==''||this.preference.result=='0') {
         this.preference.result =x
       }
       this.gResulttext = this.checkresult(this.getcoursecode(this.preference.gResult))
       this.alternativeCourseId1text= this.checkresult(this.getcoursecode(this.preference.alternativeCourseId1))
       this.alternativeCourseId2text= this.checkresult(this.getcoursecode(this.preference.alternativeCourseId2))
  }
  openpdf(x){
        var strand = ""
        for (var i = 0; i < this.strand.length; ++i) {
          if (this.preference.strand==this.strand[i].strandId.toString()) {
            strand = this.strand[i].strandCode
          }
        }
        const dialogRef = this.dialog.open(PlacementReportcardComponent, {
          width: '99%', disableClose: false , data:{vit:this.preference.vit,nvit:this.preference.nvit,strand:strand,idno:this.id,name:this.fname+" "+this.mname+" "+this.lname+" "+this.suffix,type:x,gResult:this.getdepid(this.preference.gResult),vitnvit:this.vitnvit,preference:this.preference,data:this.onlinedata,courses:this.courses}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
            }
          }
        });
  }
  openreportcard(){
    this.global.swalLoading('')
    if (this.preference.result!=null&&this.preference.result==='R') {
        this.global.swalClose()
        const dialogRef = this.dialog.open(PlacementReportcardComponent, {
          width: '99%', disableClose: false , data:{type:0,gResult:this.getdepid(this.preference.gResult),vitnvit:this.vitnvit,preference:this.preference,data:this.onlinedata,courses:this.courses}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
            }
          }
        });
    }else {
        this.global.swalClose()
        this.global.swalAlert("Result is required!",'','warning')
      }
    }


  getdepid(x){
    if (x!=null) {
    for (var i = 0; i < this.courses.length; ++i) {
      if (this.courses[i].programId.replace(/\s/g,'')==x.replace(/\s/g,'')) {
       return this.courses[i]
      }
    }
    return "Course not offered"
      // code...
    } return ""
  }
}