import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';
import {ExcelService} from './../../academic/curriculum/excel.service';
import * as XLSX from 'xlsx'; 
import {Sort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
import { CollegePreenrollmentPopupComponent } from './../../academic/college-preenrollment/college-preenrollment-popup/college-preenrollment-popup.component';

const swal = Swal;
@Component({
  selector: 'app-college-preenrollment',
  templateUrl: './college-preenrollment.component.html',
  styleUrls: ['./college-preenrollment.component.scss']
})
export class CollegePreenrollmentComponent implements OnInit {
	idpicstat=''
	birthcertstat=''
	paymentstat=''
	temp=[]
	tableArr=[]
  uslshsstat=''
  programid=''
  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,public dialog: MatDialog) { }

  ngOnInit() {
    this.loaddata()
  }

  coursearr=[]
  levelarr=[]
  coursevar=''
  levelvar=''

  loaddata(){
  	this.tableArr=undefined
    var year=this.global.syear
    if (this.global.domain=='HIGHSCHOOL'||this.global.domain=='ELEMENTARY') {
      year = this.global.syear.substring(0, 6)
    }
  	 this.http.get(this.global.api+'Enrollment/PreEnrollment/SubmittedRequirement/'+year+'?includePic=0&level='+this.global.domain+'&',this.global.option)
              .map(response => response.json())
              .subscribe(res => {
              	if(res.data!=null){
                  for (var i = 0; i < res.data.length; ++i) {
                    if (res.data[i].level==''||res.data[i].level==null) 
                      res.data[i].level="Can't Determine Level"
                    if (res.data[i].course==''||res.data[i].course==null) 
                      res.data[i].course="No Preffered Course"
                    
                    if (!(this.coursearr.includes(res.data[i].course))) {
                      this.coursearr.push(res.data[i].course)
                    }
                    if (!(this.levelarr.includes(res.data[i].level))) {
                      this.levelarr.push(res.data[i].level)
                    }
                    
                }
                  this.temp=res.data
                  this.tableArr = res.data

              	}
                this.loadwithstatus()
              },Error=>{
                //console.log(Error);
               this.global.swalAlertError(Error);
                console.log(Error)
              });
  }

  deleterecord(idnumber){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove requirement record of student','Requirement record of student has been Removed','','sy',idnumber);
  }
  swalConfirm(title,text,type,button,d1,d2,remove,id)
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
            this.http.delete(this.global.api+'Enrollment/PreEnrollment/SubmittedRequirement/'+id+'/'+this.global.syear,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.loaddata()
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
	search=''


  exportAsXLSX():void {
    var x=[]
    for (var i = 0; i < this.temp.length; ++i) {
      x.push({
        IDNumber:this.temp[i].idNumber,
        FirstName:this.temp[i].firstName,
        MiddleName:this.temp[i].middleName,
        LastName:this.temp[i].lastName,
        SuffixName:this.temp[i].suffixName,
        Gender: this.checkgender(this.temp[i].gender),
        FromUSL:this.checkfromUSLSeniorHigh(this.temp[i].fromUSLSeniorHigh)
      })
    }
   this.excelService.exportAsExcelFile(x, 'College_Pre-enrollment_list');
  }
	loadwithstatus(){
	    this.temp=[]
		for (var i = 0; i < this.tableArr.length; ++i) {
      if (this.tableArr[i].level==null) 
        this.tableArr[i].level=''
      if (this.tableArr[i].course==null) 
        this.tableArr[i].course=''
      
		  if ((this.tableArr[i].idNumber.includes(this.search)||
		  	  this.tableArr[i].firstName.toLowerCase().includes(this.search.toLowerCase())||
		  	  this.tableArr[i].lastName.toLowerCase().includes(this.search.toLowerCase())||
		  	  this.tableArr[i].middleName.toLowerCase().includes(this.search.toLowerCase()))&&
		  	  this.tableArr[i].idPicture_Status.toString().includes(this.idpicstat)&&
		  	  this.tableArr[i].birthCert_Status.toString().includes(this.birthcertstat)&&
          this.tableArr[i].proofOfPayment_Status.toString().includes(this.paymentstat)&&
          this.tableArr[i].fromUSLSeniorHigh.toString().includes(this.uslshsstat)&&
          (this.tableArr[i].level.toString().includes(this.levelvar))&&
          (this.tableArr[i].course.toString().includes(this.coursevar))
		  	) {
		  	 this.temp.push(this.tableArr[i])
		  }
		}
	}
  checkfromUSLSeniorHigh(x){
    if(x==0)
      return "No"
      return "Yes"
  }
  checkgender(x){
    if(x=='M')
      return "Male"
      return "Female"
  }
	approvestat(data){
    var x = 0
    if(data.idPicture_Status==1&&data.birthCert_Status==1)
      return "Not Verified"
    if(data.idPicture_Status==0||data.birthCert_Status==0)
      return 'On Process'
    if(data.idPicture_Status==2&&data.birthCert_Status==2)
      return "Verified"
    if(data.idPicture_Status==1||data.birthCert_Status==1)
      return "Not Verified"
    return data.idPicture_Status.toString()+'-'+data.birthCert_Status
  }
  approvestat2(data){
    var x = 0
    if(data.proofOfPayment_Status==1)
      return "Not Verified"
    if(data.proofOfPayment_Status==0)
      return 'On Process'
    if(data.proofOfPayment_Status==2)
      return "Verified"
  }
    openDialog2(data=null,type=null): void {
      var disableClose = true
      if(this.global.checkaccess(':Enrollment:PreEnrollmentSubmittedReqAcctgPut'))
        disableClose = false
     
       const dialogRef = this.dialog.open(CollegePreenrollmentPopupComponent, {
          width: '700px', disableClose: disableClose , data:{data:data,type:type}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result==1) {
              this.loaddata()
            }
          }
          if (this.global.checkaccess(':Enrollment:PreEnrollmentSubmittedReqAcctgPut')) {
              this.loaddata()
          }
        });
    }
}
