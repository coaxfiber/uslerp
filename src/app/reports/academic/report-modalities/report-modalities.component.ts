import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';

import {Sort} from '@angular/material/sort';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {ExcelService} from './../../../academic/curriculum/excel.service';
import * as XLSX from 'xlsx'; 

import {PurgeServicesService} from './../../../academic/purging/purge-services.service';

@Component({
  selector: 'app-report-modalities',
  templateUrl: './report-modalities.component.html',
  styleUrls: ['./report-modalities.component.scss']
})
export class ReportModalitiesComponent implements OnInit {
config: any;
proglevel='ALL'
sy=''
  constructor(private excelService:PurgeServicesService,public global: GlobalService,private http: Http,public dialog: MatDialog) { }
tableArr=[]
temp=[]
elective=""
electivearray=[]
departments=[]
  ngOnInit() {
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: 0
    };

    this.sy =this.global.syear
    this.proglevel =this.global.domain
    this.checkdomains()
    this.loaddata()
    // this.http.get(this.global.api+'Enrollment/LearningModalities/'+this.global.syear,this.global.option)
    //   .map(response => response.json())
    //   .subscribe(res => {
    //     this.electivelist=res.data
    //   },Error => {
    //     this.global.swalAlertError();
    //   });

    this.idno=''
    this.lname=''
    this.fname=''
    this.mname=''
    this.suffix=''
    this.year=''
    this.dept=''
    this.section=''
    this.course=''
    this.modality=''
    this.status=''
    this.name=''
    
  }

  checkdomains(){
    this.departments=[]
    for (var i = 0; i < this.global.departments.length; ++i) {
      if (this.global.checkdomain(this.global.departments[i].departmentId)) {
        if (this.global.departments[i].departmentId=='0001'||this.global.departments[i].departmentId=='0004') {
          
        }else
            {
              if (this.proglevel=='COLLEGE') {
                 if (this.global.departments[i].departmentId=='0008'||this.global.departments[i].departmentId=='0009'||this.global.departments[i].departmentId=='0071'||this.global.departments[i].departmentId=='0072'||this.global.departments[i].departmentId=='0073') {

                 }else
                    this.departments.push(this.global.departments[i])

              }else
                 if (this.proglevel=='GRADUATE SCHOOL') {
                   if (this.global.departments[i].departmentId=='0008') {
                     this.departments.push(this.global.departments[i])
                   }
                 }
        }
      }
    }
  }
  idno=''
  lname=''
  fname=''
  mname=''
  suffix=''
  year=''
  dept=''
  section=''
  course=''
  modality=''
  status=''
  name=''
  gender=''
  electivelist=[]
  loaddata(){
  	this.tableArr =undefined;
  	 var sy = this.sy
      if (this.proglevel=='ELEMENTARY'||this.proglevel=='HIGHSCHOOL') {
        if (this.sy.length==7) {
          sy = this.sy.substring(0,6)
        }
      }
    this.http.get(this.global.api+'ReportSummary/PreferredLearningModalityList/'+sy+"?level="+this.proglevel,this.global.option)
      .map(response => response.json())
      .subscribe(res => {
            this.tableArr = res.data
            this.temp = res.data
            this.electivelist=[]
            for (var i = 0; i < res.data.length; ++i) {
              if (!(this.electivelist.includes(res.data[i].preferredLearningModality))&&res.data[i].preferredLearningModality!='') {
                this.electivelist.push(res.data[i].preferredLearningModality)
              }
            }
            if ((this.proglevel == "GRADUATE SCHOOL" || this.proglevel == "COLLEGE")) {
              this.dept = this.departments[0].departmentCode
            }else{
              this.dept = ''
            }
            this.keyDownFunction()
      },Error => {
        this.global.swalAlertError();
      });
  }
   pageChanged(event){
    this.config.currentPage = event;
  }
  generate(){
    this.checkdomains()
  	this.loaddata()
  }
  keyDownFunction(){
   this.tableArr=[]
    
    //this.checkdomains()
    var checktrue = true
    for (var i = 0; i < this.temp.length; ++i) {
      if (this.modality=='none') {
        checktrue = this.temp[i].preferredLearningModality == ''
      }else{
        checktrue = this.temp[i].preferredLearningModality.toLowerCase().includes(this.modality.toLowerCase())||this.modality==''
      }
      if (this.proglevel=='GRADUATE SCHOOL'||this.proglevel=='COLLEGE') {
          if ((
                this.temp[i].idNumber.toLowerCase().includes(this.idno.toLowerCase())||this.idno=='')
              &&(this.temp[i].lastName.toLowerCase().includes(this.lname.toLowerCase())||this.lname=='')
              &&(this.temp[i].firstName.toLowerCase().includes(this.fname.toLowerCase())||this.fname=='')
              &&(this.temp[i].gender.toLowerCase().includes(this.gender.toLowerCase())||this.gender=='')
              &&(this.temp[i].middleName.toLowerCase().includes(this.mname.toLowerCase())||this.mname==''||this.mname==' '||this.mname==null)
              &&(this.temp[i].yearOrGradeLevel.toLowerCase().includes(this.year.toLowerCase())||this.year=='')
              &&(this.temp[i].departmentCode.toLowerCase().includes(this.dept.toLowerCase())||this.dept=='')
              &&(this.temp[i].courseCode.toLowerCase().includes(this.course.toLowerCase())||this.course=='')
              &&(checktrue)
              &&(this.temp[i].enrollmentStatusDesc.toLowerCase().includes(this.status.toLowerCase())||this.status=='')
              ) {
           this.tableArr.push(this.temp[i])
          }
      }else{
         if ((
                this.temp[i].idNumber.toLowerCase().includes(this.idno.toLowerCase())||this.idno=='')
              &&(this.temp[i].lastName.toLowerCase().includes(this.lname.toLowerCase())||this.lname=='')
              &&(this.temp[i].firstName.toLowerCase().includes(this.fname.toLowerCase())||this.fname=='')
              &&(this.temp[i].gender.toLowerCase().includes(this.gender.toLowerCase())||this.gender=='')
              &&(this.temp[i].middleName.toLowerCase().includes(this.mname.toLowerCase())||this.mname==''||this.mname==null)
              &&(this.temp[i].yearOrGradeLevel.toLowerCase().includes(this.year.toLowerCase())||this.year=='')
              &&checktrue
              &&(this.temp[i].enrollmentStatusDesc.toLowerCase().includes(this.status.toLowerCase())||this.status=='')
              ) {
           this.tableArr.push(this.temp[i])
          }
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
      var x=[]
     for (var i = 0; i < this.tableArr.length; ++i) {
       if (this.proglevel=='GRADUATE SCHOOL'||this.proglevel=='COLLEGE') {
         x.push({
           "ID Numner": this.tableArr[i].idNumber,
           "Last Name": this.tableArr[i].lastName,
           "First Name": this.tableArr[i].firstName,
           "Middle Name": this.tableArr[i].middleName,
           "Suffix": this.tableArr[i].suffixName,
           "Gender": this.tableArr[i].gender,
           "Year/Grade level": this.tableArr[i].yearOrGradeLevel,
           "Department": this.tableArr[i].departmentCode,
           "Course": this.tableArr[i].courseCode,
           "Learning Modality": this.tableArr[i].preferredLearningModality,
           "Contact No.": this.tableArr[i].contactNo,
           "Enrollment Status": this.tableArr[i].enrollmentStatusDesc,
         })
       }else{
          x.push({
           "ID Numner": this.tableArr[i].idNumber,
           "Last Name": this.tableArr[i].lastName,
           "First Name": this.tableArr[i].firstName,
           "Middle Name": this.tableArr[i].middleName,
           "Suffix": this.tableArr[i].suffixName,
           "Gender": this.tableArr[i].gender,
           "Year/Grade level": this.tableArr[i].yearOrGradeLevel,
           "section": this.tableArr[i].section,
           "Learning Modality": this.tableArr[i].preferredLearningModality,
           "Contact No.": this.tableArr[i].contactNo,
           "Enrollment Status": this.tableArr[i].enrollmentStatusDesc,
         })
       }
     }
       this.excelService.exportAsExcelFile(x, 'Learning-modality');
      
    }

}