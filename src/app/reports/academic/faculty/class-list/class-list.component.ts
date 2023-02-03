import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Component,ViewChild, OnInit,ElementRef } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AdmittedDialogComponent } from './admitted-dialog/admitted-dialog.component';

import { SharedServicesService } from './../../../shared-services.service';


@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.scss']
})
export class ClassListComponent implements OnInit {

  codeNo = '';

  subjectID;
  descTitle;
  lecUnits;
  labUnits;

  officialEnrollees;
  admittedStuds;


  // day
  // time
  // room
  // instructor

  showContentCollege = false;
  dataLoad = true;
  codesummaryArr
  classlistArr
  admittedstudsArr

  CNum = null;
  lastTen

  newCodeListArr

  employeeCtrl='';
  noclasslist = false;


  pic=[]

  newCodeScheduleArr
generatetemp=false
  constructor(private excelService:SharedServicesService,public dialog: MatDialog,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http) { }
departments2=[]
departments=[]
dept=''
  ngOnInit() {
      for (var i = 0; i < this.global.departments.length; ++i) {
          for (var i2 = 0; i2 < this.global.viewdomain.length; ++i2) {
              if (this.global.departments[i].departmentId==this.global.viewdomain[i2]) {
                  this.departments2.push(this.global.departments[i])
              }
          }
      }
      if (this.global.domain=="ELEMENTARY") {
          for (var i = 0; i < this.departments2.length; ++i) {
              if (this.departments2[i].departmentCode=="ELEM") {
                  this.departments.push(this.departments2[i])
              }
          }
      }
      if (this.global.domain=="HIGHSCHOOL") {
          for (var i = 0; i < this.departments2.length; ++i) {
              if (this.departments2[i].departmentCode=="HS") {
                  this.departments.push(this.departments2[i])
              }
          }
      }
      if (this.global.domain=="GRADUATE SCHOOL") {
          for (var i = 0; i < this.departments2.length; ++i) {
              if (this.departments2[i].departmentCode=="GS") {
                  this.departments.push(this.departments2[i])
              }
          }
      }
      if (this.global.domain=="COLLEGE") {
          for (var i = 0; i < this.departments2.length; ++i) {
              if (this.departments2[i].departmentCode!="ELEM"&&this.departments2[i].departmentCode!="HS"&&this.departments2[i].departmentCode!="GS") {
                  this.departments.push(this.departments2[i])
              }
          }
      }
    if(this.departments2[0]!=undefined)
      this.dept = this.departments2[0].departmentId
    else
       this.dept = ''
  }


  presentCodeNum = ''
  lastNewCodeNum = '';

  presentDay = ''
  lastNewDay = '';

  presentTime = ''
  lastNewTime = '';

  presentSchedCodeNum = ''
  lastNewSchedCodeNum = '';

  presentSchedDay = ''
  lastNewSchedDay = '';

  getCodeSummary(){
    //console.log(this.dept)
    this.global.swalLoading('')
    this.getAdmitted(this.CNum)
    this.generatetemp=true
    this.http.get(this.global.api+"ReportTeacher/CodeSummary/"+this.global.syear+"?codeNo="+this.CNum+"&department="+this.dept,this.global.option)
      .map(response => response.json())
      .subscribe(res => {
                  this.codesummaryArr=res.data;
        if(this.codesummaryArr.length>0){
                    this.noclasslist = false;
                    this.showContentCollege = true;
                    this.subjectID = res.data[0].subjectId;
                    this.descTitle = res.data[0].subjectTitle;
                    this.lecUnits = res.data[0].lecUnits;
                    this.labUnits = res.data[0].labUnits;
                    this.codeNo = res.data[0].codeNo
                    this.officialEnrollees = res.data[0].oe;
                    
                  }else{
                    this.noclasslist = true;
                    this.showContentCollege = false;
                    
                  }
          this.http.get(this.global.api+'ReportTeacher/ClassList/'+this.CNum+'/'+this.global.syear,this.global.option)
          // this.http.get(this.global.api+'ReportTeacher/CodeSummary/2020211?codeNo='+this.CNum+'&instructorId=0903564',this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                  // console.log(this.codesummaryArr.length)
                  // console.log(this.codesummaryArr)
                 
                  this.generatetemp=false
                  this.classlistArr = res.data
                  this.global.swalClose();
                  this.pic = []
                  for (var i = 0; i < res.data.length; ++i) {
                    this.http.get(this.global.api+'ReportTeacher/IDInfo/'+res.data[i].idNumber,this.global.option)
                    // this.http.get(this.global.api+'EmployeePortal/StudentInfo/'+res.data[i].idNumber+'/2020211',this.global.option)
                    .map(response => response.json())
                    .subscribe(res => {
                        if(res.data!=null){
                          this.pic.push({
                              picture:this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture),
                              idNumber: res.data.idNumber
                            }
                          );
                        }
                        else{
                          this.pic.push({
                              picture:null,
                              idNumber: res.data.idNumber
                            }
                          );
                        }
                      },Error=>{
                        this.generatetemp=false
                        console.log(Error);
                        this.global.swalAlert("Forbidden!","API: ReportTeacher/IDInfo/","error");
                        //console.log(Error)
                    });
                  }
                },Error=>{
                        //console.log(Error);
                        this.global.swalAlertError();
                        //console.log(Error)
              });
         },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  

  
 

  getAdmitted(code){
    this.http.get(this.global.api+'ReportTeacher/AdmittedInCode/'+this.CNum+'/'+this.global.syear,this.global.option)
    // this.http.get(this.global.api+'EmployeePortal/AdmittedInCode/111/2020211',this.global.option)
        .map(response => response.json())
        .subscribe(res => {
            this.admittedstudsArr=res.data;
            this.admittedStuds = this.admittedstudsArr.length;
            
            this.global.swalClose();
          },Error=>{
                  //console.log(Error);
                  this.global.swalAlert("Forbidden!","API: ReportTeacher/AdmittedInCode/","error");
                  //console.log(Error)
        });
  }

  openAdmittedDialog(): void {
      const dialogRef = this.dialog.open(AdmittedDialogComponent, {
        width: '900px', disableClose: false,data:{selectedData:this.admittedstudsArr}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {

        }
      });
    
   
  }

  ctr = 0;
  getLast10(rank): boolean{
    
    /*if(this.ctr==this.officialEnrollees){
      
      this.dataLoad = false;
    }else{
      this.ctr+=1;
      this.dataLoad = false;
    }*/
    this.lastTen = this.officialEnrollees-9;
    //console.log('Start of Last 10: '+this.lastTen)
    
    if(rank>=this.lastTen)
      return true
    else
      return false
  }

  getimage(x){
      for (var i = 0; i < this.pic.length; ++i) {
        if (this.pic[i].idNumber==x) {
          if(this.pic[i].picture != null)
            return this.pic[i].picture
        }
      }
      return 'assets/noimage.jpg'
      
  }



  clear(){
      this.showContentCollege = false;
  }

  
  exportAsXLSX():void {
    var arr = []
    for (var i = 0; i < this.classlistArr.length; ++i) {
      arr.push(
      {
        'ID NUMBER':this.classlistArr[i].idNumber,
        "STUDENT'S NAME":this.classlistArr[i].fullName,
        GENDER:this.classlistArr[i].gender,
        'CRSE & YR':this.classlistArr[i].courseYr,
        "LEARNING MODALITY":this.classlistArr[i].preferredLearningModality,
        
      }
        )
    }
    var CLData = [];
    // console.log(this.codeNo)
    CLData.push({
      'Code': this.codeNo,
      'SubjectID': this.subjectID,
      'DescriptiveTitle': this.descTitle, 
      'LectureUnits': this.lecUnits, 
      'LaboratorylabUnits': this.labUnits, 
    })
   //this.excelService.exportAsExcelFile(arr, 'Class List');
   this.excelService.generateExcel(arr,CLData, this.codesummaryArr[0].instructor);
  }

  exportAdmittedAsXLSX():void{
    var arr = []
    for (var i = 0; i < this.admittedstudsArr.length; ++i) {
      arr.push(
      {
        'ID NUMBER':this.admittedstudsArr[i].idNumber,
        "STUDENT'S NAME":this.admittedstudsArr[i].fullName,
        GENDER:this.admittedstudsArr[i].gender,
        'CRSE & YR':this.admittedstudsArr[i].course+' '+this.admittedstudsArr[i].yearOrGradeLevel,
        "LEARNING MODALITY":this.admittedstudsArr[i].preferredLearningModality,
      }
        )
    }
    var CLData = [];
    // console.log(this.codeNo)
    CLData.push({
      'Code': this.codeNo,
      'SubjectID': this.subjectID,
      'DescriptiveTitle': this.descTitle, 
      'LectureUnits': this.lecUnits, 
      'LaboratorylabUnits': this.labUnits, 
    })
   //this.excelService.exportAsExcelFile(arr, 'Class List');
   this.excelService.generateAdmittedExcel(arr,CLData, this.codesummaryArr[0].instructor);
  }

  exportAllAsXLSX():void{
    var arr = []
    for (var i = 0; i < this.classlistArr.length; ++i) {
      arr.push(
      {
        'ID NUMBER':this.classlistArr[i].idNumber,
        "STUDENT'S NAME":this.classlistArr[i].fullName,
        GENDER:this.classlistArr[i].gender,
        'CRSE & YR':this.classlistArr[i].courseYr,
        "LEARNING MODALITY":this.classlistArr[i].preferredLearningModality,
      }
        )
    }

    var arr2 = []
    for (var i = 0; i < this.admittedstudsArr.length; ++i) {
      arr2.push(
      {
        'ID NUMBER':this.admittedstudsArr[i].idNumber,
        "STUDENT'S NAME":this.admittedstudsArr[i].fullName,
        GENDER:this.admittedstudsArr[i].gender,
        'CRSE & YR':this.admittedstudsArr[i].course+' '+this.admittedstudsArr[i].yearOrGradeLevel,
        "LEARNING MODALITY":this.admittedstudsArr[i].preferredLearningModality,
      }
        )
    }

    var CLData = [];
    // console.log(this.codeNo)
    CLData.push({
      'Code': this.codeNo,
      'SubjectID': this.subjectID,
      'DescriptiveTitle': this.descTitle, 
      'LectureUnits': this.lecUnits, 
      'LaboratorylabUnits': this.labUnits, 
    })

   //this.excelService.exportAsExcelFile(arr, 'Class List');
   this.excelService.generateAllExcel(arr,arr2,CLData, this.codesummaryArr[0].instructor);
  }



}
