import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { AddressLookupComponent } from './../../../academic/student-information/address-lookup/address-lookup.component';

@Component({
  selector: 'app-online-registration-verify',
  templateUrl: './online-registration-verify.component.html',
  styleUrls: ['./online-registration-verify.component.css']
})
export class OnlineRegistrationVerifyComponent implements OnInit {

  proglevel=[]
  bdate = ''

  fname = ''
  mname = ''
  lname = ''
  suffix = ''
  gender = ''
  cnumber = ''
  cperson = ''
  gradfrom = ''
  proglevelval = ''
  courses=[]
  gradcourses=[]
  schools=[]
  strand=[]

  loading=true

  condition = false
  yeargrad=''
  collegestrandval=''
  courseval=''
  courseval1=''
  courseval2=''
  strandval=''
  strandval1=''
  top = false
remarks=''
  currentdate
  currdatearray=[]

  strandfiltered=[]
  idnumber=''
  preference
  veri='0'
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<OnlineRegistrationVerifyComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  remarksVerification
  ngOnInit() {
	this.currentdate=new Date().getFullYear()
	for (var i = 0; i < 19; ++i) {
	  this.currdatearray[i] = this.currentdate--
	}
   this.data.data.proofOfPayment=''
   this.data.data.reportCard=''
	 this.http.get(this.global.api+'OnlineRegistration/ProgramLevel')
                     .map(response => response.json())
                     .subscribe(res => {
                       this.proglevel=res.data
                       this.http.get(this.global.api+'OnlineRegistration/CoursesWithStrand')
                           .map(response => response.json())
                           .subscribe(res => {
                             for (var i = 0; i < res.data.length; ++i) {
                               if (res.data[i].programLevel=="50") {
                                 this.courses.push(res.data[i])
                               }
                               if (res.data[i].programLevel=="80"||res.data[i].programLevel=="90") {
                                 this.gradcourses.push(res.data[i])
                               }
                             }

                             this.http.get(this.global.api+'PublicAPI/Schools')
                                   .map(response => response.json())
                                   .subscribe(res => {
                                     this.schools=res
                                     this.http.get(this.global.api+'PublicAPI/Strands')
                                           .map(response => response.json())
                                           .subscribe(res => {
                                             this.strand=res.data
                                             for (var i = 0; i < res.data.length; ++i) {
                                               if (res.data[i].strandCode=='ABM'||res.data[i].strandCode=='HUMSS'||res.data[i].strandCode=='STEM-NH'||res.data[i].strandCode=='STEM-H') {
                                                 this.strandfiltered.push(res.data[i])
                                               }
                                             }
                                             this.strandfiltered=[]
                                             this.strandfiltered.push({strandId:'900009',strandTitle:'Accountancy, Business and Management Strand'})
                                             this.strandfiltered.push({strandId:'900011',strandTitle:'Humanities and Social Sciences Strand'})
                                             this.strandfiltered.push({strandId:'900013',strandTitle:'Science, Technology, Engineering and Mathematics Health Strand'})
                                             this.strandfiltered.push({strandId:'900010',strandTitle:'Science, Technology, Engineering and Mathematics-Non-Health Strand'})
                                             this.loading = false

                  												  	this.proglevelval=this.data.data.programLevel
                                                               		this.check()

                  												  	this.bdate = this.data.data.dateOfBirth

                  												  	this.fname = this.data.data.firstName
                  												  	this.mname = this.data.data.middleName
                  												  	this.lname = this.data.data.lastName
                  												  	this.suffix = this.data.data.suffixName
                  												  	this.gender = this.data.data.gender
                  												  	this.cnumber = this.data.data.contactNumber
                  												  	this.cperson = this.data.data.contactPerson
                  												  	this.gradfrom = this.data.data.schoolGraduatedFrom
                                              this.idnumber = this.data.data.idNumber
                  												  	this.yeargrad=this.data.data.yearGraduated.toString()
                  												  	this.collegestrandval=this.data.data.strandId.toString()
                  												  	this.courseval=this.data.data.preferredCourseID.toString()
                  												  	this.courseval1=this.data.data.alternativeCourseID1.toString()
                  												  	this.courseval2=this.data.data.alternativeCourseID2.toString()
                  												  	this.strandval=this.getnotnull(this.data.data.shS_PriorityStrandID1)

                  												  	this.strandval1=this.getnotnull(this.data.data.shS_PriorityStrandID2)
                    													this.permPSGC=this.data.data.schoolAddressPSGC
                    													this.address=this.data.data.schoolAddressNoStreet
                    													this.remarks=this.data.data.remark
                                              if (this.data.type==1) 
                                              this.veri=this.data.data.supportingDocumentStatus.toString()   
                                              if (this.data.type==null) 
                                              this.veri=this.data.data.paymentVerified.toString()      

                  	  												this.remarksVerification=this.data.data.remarksVerification
                                              var sy=this.global.syear
                                              if (this.global.domain == 'HIGHSCHOOL'||this.global.domain == 'ELEMENTARY') {
                                               sy = this.global.syear.substring(0,6)
                                            }
                                              this.http.get(this.global.api+'OnlineRegistration/Applicant/'+sy+"/"+this.data.data.applicantNo)
                                                 .map(response => response.json())
                                                 .subscribe(res => {
                                                   this.data.data.proofOfPayment = res.data[0].proofOfPayment
                                                   this.data.data.reportCard = res.data[0].reportCard
                                                   if (this.data.type==1) {
                                                     this.img=this.data.data.reportCard
                                                   if(this.data.data.reportCard==''){
                                                     this.data.data.reportCard=null
                                                   }
                                                   }else{
                                                     this.img=this.data.data.proofOfPayment
                                                   if(this.data.data.proofOfPayment==''){
                                                     this.data.data.proofOfPayment=null
                                                   }
                                                   }


                                                   this.attachment = 'data:image/png;base64,'+this.img
                                                 });
                                                  if(this.data.data.idNumber!=null&&this.data.data.idNumber!=''){
                                                 this.http.get(this.global.api+'OnlineRegistration/'+this.data.data.idNumber,this.global.option)
                                                 .map(response => response.json())
                                                    .subscribe(res => {
                                                       this.preference=res.data
                                                       if (this.preference==null) {
                                                         // code...
                                                       }else
                                                       if (this.proglevelval=='05') {
                                                          this.preference.shS_PriorityStrandId1 = this.getnotnull(this.data.data.shS_PriorityStrandID1)
                                                          this.preference.shS_PriorityStrandId2 =this.getnotnull(this.data.data.shS_PriorityStrandID2)
                                                          this.preference.examForSchoolYear = this.data.data.schoolYear
                                                       }
                                                     },Error=>{
                                                       this.global.swalAlertError(Error)
                                                      });
                                                  }
                                        },Error=>{
                                             this.global.swalAlertError(Error)
                                            });
                                   },Error=>{
                                     this.global.swalAlertError(Error)
                                    });
                           },Error=>{
                             this.global.swalAlertError(Error)
                            });
                     },Error=>{
                       this.global.swalAlertError(Error)
                      });
  }

  getnotnull(y){
    var x=y
    if (x==null) {
      x=''
    }
    return x
  }
 permPSGC=''
  address=''
  street=''
  lookup(lookup): void {
        const dialogRef = this.dialog.open(AddressLookupComponent, {
          width: '500px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
              this.permPSGC = result.data;
              this.address = result.result;
          }
        });
      } 

      getpaymenttype(){
        if (this.data.data.paymentType==0) {
         return "Testing Fee"
        }
        return "Pre-enrolment Fee";
      }
  schoolstemp=[]
  keyDownFunction(){
      this.schoolstemp=[]
    if (this.gradfrom!=''&&this.gradfrom.length>=4) {
      for (var i = 0; i < this.schools.length; ++i) {
        if (this.schools[i].companyName.toLowerCase().includes(this.gradfrom.toLowerCase())) {
          this.schoolstemp.push(this.schools[i].companyName)
        }
      }
    }else{
      this.schoolstemp=[]
    }
    
  }
  getAge(dateString) {
    var today = new Date("october 31, 2020");
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
 }
  check(){
     if (this.proglevelval=='01'||this.proglevelval=='02'||this.proglevelval=='04'||this.proglevelval=='05') {
      this.condition = false
    }else
      this.condition = true

    this.yeargrad = ''
    this.gradfrom = ''
    this.collegestrandval=''
    this.courseval=''
    this.courseval1=''
    this.courseval2=''
    this.strandval=''
    this.strandval1=''
    this.top = false
    this.accept = false
  }

  filetype
  attachment
  img
	onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.type.includes('jpg')||file.type.includes('png')||file.type.includes('JPG')||file.type.includes('PNG')||file.type.includes('jpeg')) {
          this.filetype = file.type
          this.attachment = "data:image/png;base64,"+reader.result.toString().split(',')[1]
          this.img = reader.result.toString().split(',')[1]
        }else{
          alert("Invalid Image Type");
        }
      };
    }
}


accept=false
  register2(){
    var date
    var x=''
    
      date = new Date(this.bdate).toLocaleString();

     if ((this.remarksVerification == ''||this.remarksVerification == null)&&this.veri=='2') {
        x=x+"*Verification Remark is required!<br>"
     }

    if (x=='') {
      this.accept = false
      var address=''
      var companyid=''
      //this.global.swalLoading('');
      for (var i = 0; i < this.schools.length; ++i) {
        if (this.schools[i].companyName == this.gradfrom) {
          address = this.schools[i].address
          companyid = this.schools[i].companyID
          break
        }
      }
      var strandid
      if (this.collegestrandval=='') {
        strandid = 0
      }else
        strandid = parseInt(this.collegestrandval)


      var year
      if (this.yeargrad=='') {
        year = 0
      }else
        year = parseInt(this.yeargrad)
      
      var strandval
      if (this.strandval=='') {
        strandval = 0
      }else
        strandval = parseInt(this.strandval)

      var strandval1
      if (this.strandval1=='') {
        strandval1 = 0
      }else
        strandval1 = parseInt(this.strandval1)

       var pv = this.veri
       if (pv=='1') {
         this.remarksVerification=''
       }
      this.global.swalLoading('')
      this.http.put(this.global.api+'OnlineRegistration/ApplicantGuidance/'+this.data.data.applicantNo ,{
        "ProgramLevel": this.proglevelval,
        "FirstName": this.fname,
        "MiddleName": this.mname,
        "LastName": this.lname,
        "SuffixName": this.suffix,
        "DateOfBirth": date,
        "Gender": this.gender,
        "ContactNumber": this.cnumber,
        "ContactPerson": this.cperson,
        "SchoolGraduatedFrom": this.gradfrom,
        "StrandId": strandid,
        "PreferredCourseId": this.courseval,
        "AlternativeCourseId1": this.courseval1,
        "AlternativeCourseId2": this.courseval2,
        "YearGraduated": year,
        "SchoolAddressNoStreet": this.address,
        "SchoolAddressPSGC": this.permPSGC,
        "SHS_PriorityStrandID1": this.strandval,
        "SHS_PriorityStrandID2": this.strandval1,
        "TopOfMyClass": this.condition,
        "Remark": this.remarks,
        "SchoolYear": this.data.data.schoolYear,
        "ProofOfPayment": this.data.data.proofOfPayment,
        "EmailAddress": this.data.data.emailAdd,
        "PaymentVerified": this.data.data.paymentVerified,
        "RemarksVerification": this.remarksVerification,
        "ReportCard": this.data.data.reportCard,
        "ReferenceNo": this.data.data.referenceNo,
        "DatePaid": null,
        "PaymentType": this.data.data.paymentType,
        "SupportingDocumentStatus":  parseInt(pv)
      },this.global.option)
            .map(response => response.json())
            .subscribe(res => {
                 this.global.swalSuccess(res.message)
                 this.dialogRef.close({result:'save'});
            },Error=>{
              this.global.swalAlertError(Error);
              this.accept = true
            });
    }else{
     this.global.swalAlert("Error Found:", x,"warning")
    }
  }



 register(){
    var date
    var x=''    
      date = new Date(this.bdate).toLocaleString();
    // if (this.bdate == '') {
    //   x=x+"*Birth date is required!<br>"
    // }else{
   //    date = new Date(this.bdate).toLocaleString();
   //    if (this.proglevelval=='01') {
   //      if (this.getAge(this.bdate)<4) {
   //        x=x+"*Sorry, age requirement is not met.<br>You are not qualified to register.<br>"
   //      }
   //    }if (this.proglevelval=='02') {
   //      if (this.getAge(this.bdate)<5) {
   //        x=x+"*Sorry, age requirement is not met.<br>You are not qualified to register.<br>"
   //      }
   //    }
   //  }

    if (this.proglevelval=='04'||this.proglevelval=='05'||this.proglevelval=='06'||this.proglevelval=='07') {
      if (this.address == '') {
        x=x+"*School Address is required!<br>"
      }
    }
    if (this.proglevelval=='05') {
      if (this.strandval == '') {
        x=x+"*Strand Priority 1 is required!<br>"
      }
      // if (this.strandval1 == '') {
      //   x=x+"*Strand Priority 2 is required!<br>"
      // }
    }
    if (this.proglevelval=='06') {
      if (this.collegestrandval == '') {
        x=x+"*Current Strand is required!<br>"
      }
      if (this.courseval == '') {
        x=x+"*Preffered Course is required!<br>"
      }
      if (this.courseval1 == ''&&this.courseval2 == '') {
        x=x+"Please select at least 1 Alternative Course<br>"
      }
    }
    if (this.proglevelval=='07') {
      if (this.courseval == '') {
        x=x+"*Course is required!<br>"
      }
    }
    if (this.proglevelval=='01'||this.proglevelval=='02'||this.proglevelval=='03') {
     
    }else{
       if (this.gradfrom == '') {
        x=x+"*School graduated from field is required!<br>"
      }
       if (this.yeargrad == '') {
        x=x+"*Year Graduated is required!<br>"
      }
    }


     if ((this.remarksVerification == ''||this.remarksVerification == null)&&this.veri=='2') {
        x=x+"*Verification Remark is required!<br>"
     }

    if (x=='') {
      this.accept = false
      var address=''
      var companyid=''
      //this.global.swalLoading('');
      for (var i = 0; i < this.schools.length; ++i) {
        if (this.schools[i].companyName == this.gradfrom) {
          address = this.schools[i].address
          companyid = this.schools[i].companyID
          break
        }
      }
      var strandid
      if (this.collegestrandval=='') {
        strandid = 0
      }else
        strandid = parseInt(this.collegestrandval)


      var year
      if (this.yeargrad=='') {
        year = 0
      }else
        year = parseInt(this.yeargrad)
      
      var strandval
      if (this.strandval=='') {
        strandval = 0
      }else
        strandval = parseInt(this.strandval)

      var strandval1
      if (this.strandval1=='') {
        strandval1 = 0
      }else
        strandval1 = parseInt(this.strandval1)

      var pv = this.veri
      if(this.data.data.datePaid=='0001-01-01T00:00:00'){
        this.data.data.datePaid= null
      }
      this.global.swalLoading('')
      this.http.put(this.global.api+'OnlineRegistration/ApplicantAcctg/'+this.data.data.applicantNo ,{
        "ProgramLevel": this.proglevelval,
        "FirstName": this.fname,
        "MiddleName": this.mname,
        "LastName": this.lname,
        "SuffixName": this.suffix,
        "DateOfBirth": date,
        "Gender": this.gender,
        "ContactNumber": this.cnumber,
        "ContactPerson": this.cperson,
        "SchoolGraduatedFrom": this.gradfrom,
        "StrandId": strandid,
        "PreferredCourseId": this.courseval,
        "AlternativeCourseId1": this.courseval1,
        "AlternativeCourseId2": this.courseval2,
        "YearGraduated": year,
        "SchoolAddressNoStreet": this.address,
        "SchoolAddressPSGC": this.permPSGC,
        "SHS_PriorityStrandID1": this.strandval,
        "SHS_PriorityStrandID2": this.strandval1,
        "TopOfMyClass": this.condition,
        "Remark": this.remarks,
        "SchoolYear": this.data.data.schoolYear,
        "ProofOfPayment": this.data.data.proofOfPayment,
        "EmailAddress": this.data.data.emailAdd,
        "PaymentVerified": parseInt(pv),
        "RemarksVerification": this.remarksVerification,
        "ReportCard": this.data.data.reportCard,
        "ReferenceNo": this.data.data.referenceNo,
        "DatePaid": this.data.data.datePaid,
        "PaymentType": this.data.data.paymentType,
      },this.global.option)
            .map(response => response.json())
            .subscribe(res => {
                 this.global.swalSuccess(res.message)
                 this.dialogRef.close({result:'save'});
                 if (this.data.data.paymentType==1&&pv=='1'&&this.proglevelval=='05') {
                   this.http.put(this.global.api+'OnlineRegistration/Placement/'+this.data.data.idNumber,{
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
                        "Result": "P",
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
                        },Error=>{
                          this.global.swalAlertError(Error);
                          this.accept = true
                        });
                 }else{
                   if (this.data.data.paymentType==1&&pv=='2'&&this.proglevelval=='05') {
                     this.http.put(this.global.api+'OnlineRegistration/Placement/'+this.data.data.idNumber,{
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
                        "Result": '',
                        "GResult": this.preference.gResult,
                        "TestSchedule":this.preference.testScheduleId,
                        "ExamRoom":this.preference.examRoom,
                        "ExamForSchoolYear": '12345',
                        "Elem_ExamResult": this.preference.elem_ExamResult,
                        "Elem_CourseId": this.preference.elem_CourseId,
                        "Elem_Course": this.preference.elem_Course,
                        "JHS_ExamResult":this.preference.jhS_ExamResult,
                        "JHS_CourseId": this.preference.jhS_CourseId,
                        "JHS_Course": this.preference.jhS_Course,
                        "SHS_ExamResult":this.preference.shS_ExamResult,
                        "SHS_PriorityStrandId1": '',
                        "SHS_PriorityStrand1": this.preference.shS_PriorityStrand1,
                        "SHS_PriorityStrandId2":'',
                        "SHS_PriorityStrand2": this.preference.shS_PriorityStrand2
                      },this.global.option)
                        .map(response => response.json())
                        .subscribe(res => {
                        });
                   }
                 }


            },Error=>{
              this.global.swalAlertError(Error);
              this.accept = true
            });
    }else{
     this.global.swalAlert("Error Found:", x,"warning")
    }
  }


  
  close(): void {
       this.dialogRef.close({result:'cancel'});
  }

    getapplicantno(x){
   var y = x.toString()
   for (var i = x.toString().length; i < 7; ++i) {
    y = '0'+y
   }
   return y
  }
}
