import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LookUpCurriculumComponent } from './../look-up-curriculum/look-up-curriculum.component';
import { AddUpdateSubjectsComponent } from './add-update-subjects/add-update-subjects.component';
import { PreRequisitesComponent } from './pre-requisites/pre-requisites.component';
import { OtherPreRequisitesComponent } from './other-pre-requisites/other-pre-requisites.component';
import { CoRequisitesComponent } from './co-requisites/co-requisites.component';

import {ExcelService} from './../excel.service';
import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
	progid=""
	tabledata

  
  floadingDeptCode=''
  fhours=''
  fsubjectId=''
  frecordId=''
  fsubjectTitle=''
  funits=''
  flabUnits=''
  flecUnits=''
  fyearLevel=''
  fterm=''

  arraydept
  tableArr=[]
  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,public dialog: MatDialog) { }

  ngOnInit() {

          this.http.get(this.global.api+'/PublicAPI/Departments',this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.arraydept=res;
          },Error=>{
            console.log(Error)
          });
  }
  filterall(event){
     if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
       var filter = {
        recordId: this.frecordId,
        subjectId: this.fsubjectId,
        subjectTitle: this.fsubjectTitle,
        units: this.funits ,
        labUnits: this.flabUnits ,
        lecUnits: this.flecUnits ,
        yearLevel: this.fyearLevel ,
        term: this.fterm ,
        hours: this.fhours ,
        loadingDeptCode: this.floadingDeptCode
      };
      var users = this.tableArr
      users= users.filter(function(item) {
        for (var key in filter) {
          if (!item[key].toUpperCase().includes(filter[key].toUpperCase()))
            return false;
        }
        return true;

      });
      this.tabledata = users
        }
      
    }
  loadsubjects(){
            this.tabledata = undefined
            this.tableArr =undefined
  	        this.http.get(this.global.api+'Curriculum/Subjects/'+this.progid,this.global.option)         .map(response => response.json())
            .subscribe(res => {
            for (var i = 0; i < res.data.length; ++i) {
              if (res.data[i].subjectTitle==null) {
                res.data[i].subjectTitle = ''
              }
              if (res.data[i].subjectTypeId==null) {
                res.data[i].subjectTypeId = ''
              }
              if (res.data[i].hours==null) {
                res.data[i].hours = ''
              }
            }
          	this.tabledata = res.data
            this.tableArr =res.data
            this.filterall('onoutfocus')
          },err=>{
            console.log(err)
          }
          );

  }
resetsearch(){

  this.floadingDeptCode=''
  this.fhours=''
  this.fsubjectId=''
  this.frecordId=''
  this.fsubjectTitle=''
  this.funits=''
  this.flabUnits=''
  this.flecUnits=''
  this.fyearLevel=''
  this.fterm=''
}
  data
openDialoglookup(x,a): void {
    const dialogRef = this.dialog.open(LookUpCurriculumComponent, {
          width: '95%', disableClose: false, data:{data:x,array:a}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result!='cancel') {
              this.progid = result.result.programId
              this.keyDownFunction('onoutfocus');
            }
          }
        });
    }
 openDialogaddupdatesubjects(x,a): void {
    const dialogRef = this.dialog.open(AddUpdateSubjectsComponent, {
          width: '600px', disableClose: false, data:{data:x,array:a,curr:this.data}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result!='cancel') {
              this.loadsubjects();
            }
          }
        });
    }
 openDialogPrerequisites(x): void {
    const dialogRef = this.dialog.open(PreRequisitesComponent, {
          width: '800px', disableClose: false,data:{data:x,subjects:this.tableArr}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result!='cancel') {
              this.loadsubjects();
            }
          }
        });
    } 
    openDialogCorequisites(x): void {
    const dialogRef = this.dialog.open(CoRequisitesComponent, {
          width: '800px', disableClose: false,data:{data:x,subjects:this.tableArr}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result!='cancel') {
              this.loadsubjects();
            }
          }
        });
    }
 openDialogOtherrequisites(x): void {
    const dialogRef = this.dialog.open(OtherPreRequisitesComponent, {
          width: '500px', disableClose: false,data:{data:x}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result!='cancel') {
              this.loadsubjects();
            }
          }
        });
    }

  keyDownFunction(event){
  		    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {

            this.http.get(this.global.api+'Curriculum/'+this.progid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.data=undefined
                if (res.data==null) {
                  this.data=[]
                  this.global.swalAlert("Acadims Alert!",'No Program ID found.','warning')
                }else
                if (this.global.checkdomain(res.data.departmentId)) {
                  this.data=res.data
                  this.resetsearch();
                  this.loadsubjects();
                }else
                {
                  this.global.swalAlert("Acadims Alert!",'Your view domain does not allow you to view this curriculum.','warning')
                }

              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
  		    }
        }
     

  removesub(id,rid){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Subject','Subject has been Removed','','sy',id,rid);
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove,id,rid)
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
            this.http.delete(this.global.api+'Curriculum/Subject/'+id+"?recordId="+rid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.keyDownFunction('onoutfocus')
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
   }
  

  export(){
   let x=[]
  this.global.swalLoading('')

  let recid = this.data.programId
  this.http.get(this.global.api+'Curriculum/SubjectListWithPrerequisites/'+recid,this.global.option)         
          .map(response => response.json())
          .subscribe(res => { 
            console.log(res)
            for (var i = 0; i < res.data.length; ++i) {
              var t=''
              if (res.data[i].otherRequisite!=null) {
                t=res.data[i].otherRequisite
              }
              x.push({
                    SubjectID: res.data[i].subjectId,
                    SubjectTitle: res.data[i].subjectTitle,
                    YearLevel: res.data[i].yearLevel,
                    Term: res.data[i].term,
                    PreRequesite:res.data[i].preRequisite,
                    CoRequesite:res.data[i].coRequisite,
                    OtherRequesites:t,
                    LoadingDepartment:res.data[i].loadingDept,
                  })
            }
                    this.global.swalClose();
                    this.excelService.exportAsExcelFile(x, this.data.courseCode);
          },Error=>{
             this.global.swalAlertError()
          });

  }
}
