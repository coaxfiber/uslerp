import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';

import {Sort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
const swal = Swal;

import {ExcelService} from './../../academic/curriculum/excel.service';
import * as XLSX from 'xlsx'; 

import { OnlineRegistrationUpdateComponent } from './../../academic/online-registration/online-registration-update/online-registration-update.component';
import { DatePipe } from '@angular/common'
import { OnlineRegistrationVerifyComponent } from './../../academic/online-registration/online-registration-verify/online-registration-verify.component';
import { ApplicantTextBlastComponent } from './../../academic/online-registration/applicant-text-blast/applicant-text-blast.component';
@Component({
  selector: 'app-online-registration',
  templateUrl: './online-registration.component.html',
  styleUrls: ['./online-registration.component.scss']
})
export class OnlineRegistrationComponent implements OnInit {

search=''
constructor(public datepipe: DatePipe,private excelService:ExcelService,public global: GlobalService,private http: Http,public dialog: MatDialog) { }
	tabledata=[]
	tableArr=[]

  proglevel=[]
  proglevelval
  strandfiltered=[]
  temp=[]
  status=''
  fee=''
  strands=[]
  ngOnInit() {
    this.strandfiltered=[]
     this.strandfiltered.push({strandId:'900009',strandTitle:'Accountancy, Business and Management Strand'})
     this.strandfiltered.push({strandId:'900011',strandTitle:'Humanities and Social Sciences Strand'})
     this.strandfiltered.push({strandId:'900013',strandTitle:'Science, Technology, Engineering and Mathematics Health Strand'})
     this.strandfiltered.push({strandId:'900010',strandTitle:'Science, Technology, Engineering and Mathematics-Non-Health Strand'})
     this.http.get(this.global.api+'OnlineRegistration/ProgramLevel')         
            .map(response => response.json())
            .subscribe(res => {
             for (var i = 0; i < res.data.length; ++i) {
               if (this.global.domain=='ELEMENTARY') {
                 if (res.data[i].programLevel=='01'||res.data[i].programLevel=='02'||res.data[i].programLevel=='03') {
                   this.proglevel.push(res.data[i])
                 }
               }
               if (this.global.domain=='HIGHSCHOOL') {
                 if (res.data[i].programLevel=='04'||res.data[i].programLevel=='05') {
                   this.proglevel.push(res.data[i])
                 }
               }
               if (this.global.domain=='COLLEGE') {
                 if (res.data[i].programLevel=='06') {
                   this.proglevel.push(res.data[i])
                 }
               }
               if (this.global.domain=='GRADUATE SCHOOL') {
                 if (res.data[i].programLevel=='07') {
                   this.proglevel.push(res.data[i])
                 }
               }
             }


             this.strandfiltered=[]
             this.strands=[]
             this.strands.push('900009')
             this.strands.push('900011')
             this.strands.push('900013')
             this.strands.push('900010')
             this.strandfiltered.push({strandId:'900009',strandTitle:'Accountancy, Business and Management Strand'})
             this.strandfiltered.push({strandId:'900011',strandTitle:'Humanities and Social Sciences Strand'})
             this.strandfiltered.push({strandId:'900013',strandTitle:'Science, Technology, Engineering and Mathematics Health Strand'})
             this.strandfiltered.push({strandId:'900010',strandTitle:'Science, Technology, Engineering and Mathematics-Non-Health Strand'})
          
          },err=>{
            console.log(err)
          }
          );
  }
  checkproglevel(c){
    for (var i = 0; i < this.proglevel.length; ++i) {
      if (c==this.proglevel[i].programLevel) {
        return this.proglevel[i].progLevelDesc
      }
    }
  }
  outputstrand(x){
    for (var i = 0; i < this.strandfiltered.length; ++i) {
      if (this.strandfiltered[i].strandId==x) {
        return this.strandfiltered[i].strandTitle
      }
    }
  }

  keyDownFunction(){
    this.temp=[]
    if (this.search=="") {
      this.temp=this.tabledata
    }else{
    for (var i = 0; i < this.tabledata.length; ++i) {
      if (this.tabledata[i].middleName==null) {
        this.tabledata[i].middleName = ''
      }
      if (this.tabledata[i].idNumber==null) {
       this.tabledata[i].idNumber=''
      }
      if ((this.tabledata[i].firstName+" "+this.tabledata[i].middleName+" "+this.tabledata[i].lastName).toLowerCase().includes(this.search.toLowerCase())||(this.tabledata[i].idNumber).toLowerCase().includes(this.search.toLowerCase())||this.tabledata[i].applicantNo.toString().includes(this.search.toLowerCase())) {
       this.temp.push(this.tabledata[i])

      }
    }
  }
  }
  verificationtype=''
  verificationcertstatus=''
  proofOfPaymentUploaded=''
  loadwithstatus(){
    this.temp = []
    for (var i = 0; i < this.tabledata.length; ++i) {
        if (
          (this.tabledata[i].paymentType==parseInt(this.fee)||this.fee=='')&&
          (this.tabledata[i].paymentVerified==parseInt(this.status)||this.status=='')&&
          (this.tabledata[i].schoolGraduatedFrom==this.schoolsval||this.schoolsval=='')&&
          (this.tabledata[i].shS_PriorityStrandID1==this.strandval||this.strandval=='')&&
          (this.tabledata[i].proofOfPaymentUploaded.toString()==this.proofOfPaymentUploaded||this.proofOfPaymentUploaded=='')) {
            if (this.tabledata[i].middleName==null) {
              this.tabledata[i].middleName = ''
            }
            if (this.tabledata[i].idNumber==null) {
             this.tabledata[i].idNumber=''
            }
           if ((this.tabledata[i].firstName+" "+this.tabledata[i].middleName+" "+this.tabledata[i].lastName).toLowerCase().includes(this.search.toLowerCase())||(this.tabledata[i].idNumber).toLowerCase().includes(this.search.toLowerCase())||this.tabledata[i].applicantNo.toString().includes(this.search.toLowerCase())) {
             this.temp.push(this.tabledata[i])
            }
        }
      }

    var temp = this.temp
    this.temp=[]
    for (var i = 0; i < temp.length; ++i) {
      if(this.verificationtype==''){
        this.temp.push(temp[i])
      }else if(this.verificationtype=='1'){

        if ((temp[i].programLevel=='05'&&(temp[i].schoolGraduatedFrom!='University of Saint Louis Tuguegarao'))) {
          if (this.verificationcertstatus=='') {
            this.temp.push(temp[i])
          }else if (this.verificationcertstatus=='0') {
            if (temp[i].supportingDocumentStatus==0) {
              this.temp.push(temp[i])
            }
          }else if (this.verificationcertstatus=='1') {
            if (temp[i].supportingDocumentStatus==1||this.tabledata[i].paymentVerified==1) {
              this.temp.push(temp[i])
            }
          }else if (this.verificationcertstatus=='2') {
            if (temp[i].supportingDocumentStatus==2) {
              //console.log(temp[i])
              this.temp.push(temp[i])
            }
          }
        }
      }else if(this.verificationtype=='0'){
        if (!(temp[i].programLevel=='05'&&(temp[i].schoolGraduatedFrom!='University of Saint Louis Tuguegarao')&&(temp[i].idNumber==''||temp[i].idNumber==null))) {
          this.temp.push(temp[i])
        }
      }
    }
  }
style(x,a){
  if (a==null||a=='') 
    {if (x){
      return 'red'
    }else
      return 'green'
  }
      return 'none'
  
}
schoolsval=''
schools=[]
strandval=''
  filterprog(x,y = null){
            this.tabledata = []
            this.tableArr =undefined
            var sy=this.global.syear
            if (this.global.domain == 'HIGHSCHOOL'||this.global.domain == 'ELEMENTARY') {
             sy = this.global.syear.substring(0,6)
            }

            
  	        this.http.get(this.global.api+'OnlineRegistration/Applicants/'+sy+'?programLevel='+x+'&eProgramLevel='+x,this.global.option)         
  	        .map(response => response.json())
            .subscribe(res => {
            	this.tabledata = res.data
              for (var i = 0; i < this.tabledata.length; ++i) {
                if (this.tabledata[i].middleName==null) {
                  this.tabledata[i].middleName = ''
                }
                if (this.tabledata[i].suffixName==null) {
                  this.tabledata[i].suffixName = ''
                }
                if (!(this.schools.includes(this.tabledata[i].schoolGraduatedFrom))) {
                  this.schools.push(this.tabledata[i].schoolGraduatedFrom)
                }
              }
              this.tableArr =this.tabledata
              this.temp =this.tabledata.slice()
              this.loadwithstatus()
              if (y==1) {
                // code...
              }
            },err=>{
              this.global.swalAlertError(Error)
              console.log(err)
            }
          );

  }

  deleterecord(id,idnumber){
    if (idnumber != null&&idnumber != '') {
     this.global.swalAlert("Cannot be deleted!","ID Number is assigned to the applicant.","warning")
    }else
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Applicant information','Applicant information has been Removed','','sy',id);
  }
  sortData(sort: Sort) {
    const data = this.temp.slice();
    if (!sort.active || sort.direction === '') {
      this.temp = data;
      return;
    }

    this.temp = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'programLevel': return compare(a.programLevel, b.programLevel, isAsc);
        case 'idno': return compare(a.idNumber, b.idNumber, isAsc);
        case 'lastname': return compare(a.lastName,b.lastName, isAsc);
        case 'firstname': return compare(a.firstname,b.firstname, isAsc);
        case 'middlename': return compare(a.middlename,b.middlename, isAsc);
        case 'cnumber': return compare(a.contactNumber, b.contactNumber, isAsc);
        case 'cperson': return compare(a.contactPerson, b.contactPerson, isAsc);
        case 'gradfrom': return compare(a.schoolGraduatedFrom, b.schoolGraduatedFrom, isAsc);
        case 'year': return compare(a.yearGraduated, b.yearGraduated, isAsc);
        case 'cstrand': return compare(a.strand, b.strand, isAsc);
        case 'prog': return compare(a.preferreCourse, b.preferreCourse, isAsc);
        case 'datereg': return compare(a.dateRegistered, b.dateRegistered, isAsc);
        case 'datever': return compare(a.dateVerified, b.dateVerified, isAsc);
        case 'remarks': return compare(a.remark, b.remark, isAsc);
        default: return 0;
      }
    });
      function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
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
            this.http.delete(this.global.api+'OnlineRegistration/Applicant/'+id,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.filterprog(this.proglevelval)
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError(Error);
                console.log(Error)
              });
          }
        }
      })
  }

  searchlookup(){
    
  }

  fileName=''
  hide=true
  exportexcel(): void 
    {
      this.hide=false
     setTimeout(()=>{  
       this.fileName= 'OnlineRegistration.xlsx'
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);

      this.hide=true
     });
       
      
    }

    openDialog(data=null): void {
    const dialogRef = this.dialog.open(OnlineRegistrationUpdateComponent, {
          width: '700px', disableClose: false , data:{data:data}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
                this.filterprog(this.proglevelval)
            }
          }
        });
    }

    openDialog2(data=null,type=null): void {
    const dialogRef = this.dialog.open(OnlineRegistrationVerifyComponent, {
          width: '700px', disableClose: false , data:{data:data,type:type}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
                this.filterprog(this.proglevelval)
            }
          }
        });
    }


  exportarray(){
    if (this.global.domain=="COLLEGE") {
    var arr = []

    for (var i = 0; i < this.temp.length; ++i) {
      var dt = new Date(this.temp[i].dateOfBirth)
      arr.push(
          {
            "Applicant No." : this.temp[i].applicantNo,
            "Program Level" : this.checkproglevel(this.temp[i].programLevel),
            "Last Name" : this.temp[i].lastName,
            "First Name" : this.temp[i].firstName,
            "Middle Name" : this.temp[i].middleName,
            "Suffix" : this.temp[i].suffixName,
            "Email Address" : this.temp[i].emailAdd,
            "Gender" : this.temp[i].gender,
            "Date of Birth" : this.datepipe.transform(this.temp[i].dateOfBirth,"MMMM dd, yyyy"),
            "Contact Number" : this.temp[i].contactNumber, 
            "Date Registered" : this.datepipe.transform(this.temp[i].dateRegistered,"MMMM dd, yyyy"),
            "Date Verified" : this.getverifieddate(this.temp[i].dateVerified),
            "School Graduated From" : this.temp[i].schoolGraduatedFrom,
            "Year Graduated" : this.temp[i].yearGraduated,
            "School Address" : this.temp[i].schoolAddressNoStreet,
            "Current Strand" : this.temp[i].strand,
            "Preffered Course" : this.temp[i].preferreCourse,
            "Alternative Course 1" : this.temp[i].alternativeCourse1,
            "Alternative Course 2" : this.temp[i].alternativeCourse2,
            "Remarks" : this.temp[i].remarks,
          }
        )
      }
    this.excelService.exportAsExcelFile(arr, 'OnlineRegistration');
      // code...
    }else{
      this.exportexcel()
    }
  }

  getverifieddate(x){
    if (x=='0001-01-01T00:00:00'){
      return ' '
    }
    return this.datepipe.transform(x,"MMMM dd, yyyy");
  }

  smsTxtBlast(){
    const dialogRef = this.dialog.open(ApplicantTextBlastComponent, {
          width: '99%', disableClose: true , data:'{data:data,type:type}'
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
                this.filterprog(this.proglevelval)
            }
          }
        });
  }
}
