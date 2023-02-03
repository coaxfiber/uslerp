import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { AddressLookupComponent } from './../../../academic/student-information/address-lookup/address-lookup.component';

@Component({
  selector: 'app-online-registration-update',
  templateUrl: './online-registration-update.component.html',
  styleUrls: ['./online-registration-update.component.css']
})
export class OnlineRegistrationUpdateComponent implements OnInit {

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
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<OnlineRegistrationUpdateComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }


  ngOnInit() {
	this.currentdate=new Date().getFullYear()+1
	for (var i = 0; i < 19; ++i) {
	  this.currdatearray[i] = this.currentdate--
	}
  this.data.data.proofOfPayment=null
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

                              this.data.data.proofOfPayment=null

                                var sy=this.global.syear
                                if (this.global.domain == 'HIGHSCHOOL'||this.global.domain == 'ELEMENTARY') {
                                 sy = this.global.syear.substring(0,6)
                                }
                              this.http.get(this.global.api+'OnlineRegistration/Applicant/'+sy+"/"+this.data.data.applicantNo)
                                 .map(response => response.json())
                                 .subscribe(res => {
                                   this.data.data.proofOfPayment = res.data[0].proofOfPayment
                                   this.data.data.reportCard = res.data[0].reportCard
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
accept=false
  register(){
    var date
  	var x=''
  	if (this.fname == '') {
  		x=x+"*First name is required!<br>"
  	}
  	if (this.lname == '') {
  		x=x+"*Last name is required!<br>"
  	}
  	if (this.gender == '') {
  		x=x+"*Gender is required!<br>"
  	}
    if (this.cnumber == '') {
      x=x+"*Contact number is required!<br>";
    }else{
      if (this.cnumber.length!= 11) {
      x=x+"*Contact number is invalid!<br>"
      }
    }
    
      date = new Date(this.bdate).toLocaleString();
  	if (this.bdate == '') {
  		x=x+"*Birth date is required!<br>"
  	}
    // else{
    //   date = new Date(this.bdate).toLocaleString();
    //   if (this.proglevelval=='01') {
    //     if (this.getAge(this.bdate)<4) {
    //       x=x+"*Sorry, age requirement is not met.<br>You are not qualified to register.<br>"
    //     }
    //   }if (this.proglevelval=='02') {
    //     if (this.getAge(this.bdate)<5) {
    //       x=x+"*Sorry, age requirement is not met.<br>You are not qualified to register.<br>"
    //     }
    //   }
    // }

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

       var pv = 1
     if (this.data.data.paymentVerified==false) {
       pv = 0
     }
     if ('0001-01-01T00:00:00'==this.data.data.datePaid) {
      this.data.data.datePaid=null
     }
    	this.http.put(this.global.api+'OnlineRegistration/Applicant/'+this.data.data.applicantNo ,{
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
        "IdNumber": this.idnumber,
        "SchoolYear": this.data.data.schoolYear,
        "ProofOfPayment": this.data.data.proofOfPayment,
        "EmailAddress": this.data.data.emailAdd,
        "PaymentVerified": pv,
        "RemarksVerification": this.data.data.remarksVerification,
        "ReportCard": this.data.data.reportCard,
        "ReferenceNo": this.data.data.referenceNo,
        "DatePaid": this.data.data.datePaid,
        "PaymentType": this.data.data.paymentType,
			},this.global.option)
            .map(response => response.json())
            .subscribe(res => {
            	   this.global.swalSuccess(res.message)
                 this.dialogRef.close({result:'save'});
            },Error=>{
              this.global.swalAlertError(Error);
              console.log(Error)
              this.accept = true
            });
  	}else{
  	 this.global.swalAlert("Error Found:", x,"warning")
    }
  }
  
  close(): void {
       this.dialogRef.close({result:'cancel'});
  }
}
