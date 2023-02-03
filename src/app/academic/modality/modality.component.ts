import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';

import {Sort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
const swal = Swal;

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {ExcelService} from './../../academic/curriculum/excel.service';
import * as XLSX from 'xlsx'; 

import {PurgeServicesService} from './../purging/purge-services.service';
import { G9ElectiveUpdateComponent } from './../g9-elective/g9-elective-update/g9-elective-update.component';
@Component({
  selector: 'app-modality',
  templateUrl: './modality.component.html',
  styleUrls: ['./modality.component.scss']
})
export class ModalityComponent implements OnInit {
config: any;
hide=true
  constructor(private excelService:PurgeServicesService,public global: GlobalService,private http: Http,public dialog: MatDialog) { }
tableArr=[]
temp=[]
elective=""
electivearray=[]
dept=''
departments=[]
  ngOnInit() {
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: 0
    };
    for (var i = 0; i < this.global.departments.length; ++i) {
      if (this.global.checkdomain(this.global.departments[i].departmentId)) {
        if (this.global.departments[i].departmentId=='0001'||this.global.departments[i].departmentId=='0004') {
          
        }else
            {
              if (this.global.domain=='COLLEGE') {
                 if (this.global.departments[i].departmentId=='0008'||this.global.departments[i].departmentId=='0009'||this.global.departments[i].departmentId=='0071'||this.global.departments[i].departmentId=='0072'||this.global.departments[i].departmentId=='0073') {

                 }else
                    this.departments.push(this.global.departments[i])

              }else
                 if (this.global.domain=='GRADUATE SCHOOL') {
                   if (this.global.departments[i].departmentId=='0008') {
                     this.departments.push(this.global.departments[i])
                   }
                 }
        }
      }
    }
    if (this.global.domain!='HIGHSCHOOL'&&this.global.domain!='ELEMENTARY') {
      this.dept = this.departments[0].departmentId
    }
    if (this.global.domain=='HIGHSCHOOL') {
      this.dept = '0009'
    }

    this.loaddata()
  }
  id=''
  course=''
  name=''
  electivelist=[]
  loaddata(){
  	// this.http.delete(this.global.api+'StudentPortal/HSEnrollment/Student/Elective/1402157/5/'+this.global.syear,this.global.option)
   //            .map(response => response.json())
   //            .subscribe(res => {});
    this.tableArr=undefined
    var sy = this.global.syear
    if (this.dept == "0009"||this.dept =="0071"||this.dept =="0072"||this.dept =="0073") {
      sy = this.global.syear.slice(0, -1)
    }
     this.http.get(this.global.api+'Enrollment/PreferredLearningModality/'+sy+"?departmentId="+this.dept,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                console.log(res)
                    this.tableArr = res.data
                    this.temp = res.data
                    if (this.global.domain == "ELEMENTARY" || this.global.domain == "GRADUATE SCHOOL") {
                      this.tableArr = []
                      this.temp = []
                    }
                    this.keyDownFunction()
                  this.http.get(this.global.api+'Enrollment/LearningModalities/'+this.global.syear,this.global.option)
		              .map(response => response.json())
		              .subscribe(res => {
                    this.electivelist=res.data
		              },Error => {
		                this.global.swalAlertError();
		              });
              },Error => {
                this.global.swalAlertError();
              });

  }
   pageChanged(event){
    this.config.currentPage = event;
  }
  keyDownFunction(){
    this.tableArr=[]
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: 0
    };
    for (var i = 0; i < this.temp.length; ++i) {
      if (this.temp[i].departmentId==null) {
        this.temp[i].departmentId=''
      }
      if ((this.temp[i].idNumber.toLowerCase().includes(this.id.toLowerCase()))
          &&this.temp[i].learningModalityId.toString().includes(this.elective)
          &&this.temp[i].departmentId.toString().includes(this.dept)
          &&this.temp[i].fullName.toLowerCase().includes(this.name.toLowerCase())
          &&this.temp[i].course.toLowerCase().includes(this.course.toLowerCase())) {
       this.tableArr.push(this.temp[i])
      }
    }
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.tableArr.length
    };
  }

   fileName=''
  exportexcel(): void 
    {  
      var x = []
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
       for (var i = 0; i < this.temp.length; ++i) {
          let reg = new Date(this.temp[i].dateRegistered)
          let up
          up = new Date(this.temp[i].dateUpdated)
          let reg_date =  months[reg.getMonth()] +" "+ reg.getDate() + ", " + " " + reg.getFullYear()
          let up_date =  months[up.getMonth()] +" "+ up.getDate() + ", " + " " + up.getFullYear()

          
         if(this.temp[i].dateUpdated==null){
           up = ''
         }
         x.push({
           "ID Numner": this.temp[i].idNumber,
           "Full name": this.temp[i].fullName,
           "Year/Grade level": this.temp[i].yearOrGradeLevel,
           "Department": this.temp[i].departmentCode,
           "Course": this.temp[i].course,
           "Learning Modality": this.temp[i].name,
           "Date Registered": reg,
           "Date Updated": up
         })
       }
       this.excelService.exportAsExcelFile(x, 'Learning-modality');
      
    }

    swalConfirm(title,text,eid,id)
  {
    swal.fire({
        title: title,
        text: text,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Confirm"
      }).then((result) => {
        if (result.value) {
            var sy = this.global.syear
            if (this.global.domain == "HIGHSCHOOL") {
              sy = this.global.syear.slice(0, -1)
            }
            this.http.delete(this.global.api+'Enrollment/LearningModality/'+id+'/'+eid+'/'+sy,this.global.option)
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
      })
  }

  openDialog(eid,id,fullname): void {
    const dialogRef = this.dialog.open(G9ElectiveUpdateComponent, {
          width: '600px', disableClose: false , data:{eid:eid,id:id,fullname:fullname,array:this.electivelist,type:1}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
                this.loaddata()
            }
          }
        });
    }
}
