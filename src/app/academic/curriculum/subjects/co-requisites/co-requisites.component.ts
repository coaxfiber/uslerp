import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import Swal from 'sweetalert2';
const swal = Swal;

@Component({
  selector: 'app-co-requisites',
  templateUrl: './co-requisites.component.html',
  styleUrls: ['./co-requisites.component.scss']
})
export class CoRequisitesComponent implements OnInit {
arrayPrereq

subjectId=''
subjectTitle=''
recordId=''

arrayrecordId=[]

 myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  arraysubjects=[]
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<CoRequisitesComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  loadpresub(){
    this.arrayPrereq=undefined;
     this.http.get(this.global.api+'Curriculum/Subject/Prerequisite/'+this.data.data.recordId,this.global.option)         .map(response => response.json())
          .subscribe(res => {

            this.arrayPrereq=[];
            for (var i = 0; i < res.data.length; ++i) {
              if (res.data[i].requisiteTypeId == "True") {
                this.arrayPrereq.push(res.data[i])
              }
            }
            this.checkdouble(this.arrayPrereq)
          },Error=>{
            console.log(Error)
          });
  }
  checkdouble(x){
          var get=0
          this.options=[]
          this.arrayrecordId=[]
          for (var i = 0; i < this.data.subjects.length; ++i) {
            if (this.data.data.recordId!=this.data.subjects[i].recordId) {
              if (this.data.data.yearLevel>=this.data.subjects[i].yearLevel) {
                if (this.data.subjects[i].yearLevel==this.data.data.yearLevel) {
                     for (var h = 0; h < x.length; ++h) {
                       if (x[h].pre_SubjectId==this.data.subjects[i].subjectId) {
                         get=1
                       }
                     }
                     if (get==0) {
                        this.options.push(this.data.subjects[i].subjectId+" - "+this.data.subjects[i].subjectTitle)
                        this.arrayrecordId.push(this.data.subjects[i].recordId)
                     }get=0;
                }else{
                     for (var h = 0; h < x.length; ++h) {
                       if (x[h].pre_SubjectId==this.data.subjects[i].subjectId) {
                         get=1
                       }
                     }
                     if (get==0) {
                        this.options.push(this.data.subjects[i].subjectId+" - "+this.data.subjects[i].subjectTitle)
                        this.arrayrecordId.push(this.data.subjects[i].recordId)
                     }get=0;
                }
              }
            }
          }
           //console.log(this.options)
     this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  }
  ngOnInit() {
         
    this.loadpresub()
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectsub(x){
    var y=0
    for (var i = 0; i < this.options.length; ++i) {
      if (this.options[i] == x) {
        y = i
        break;
      }
    }
    this.subjectTitle = this.arraysubjects[y];
    this.recordId = this.arrayrecordId[y];
  }

  prereqPost(){
    if (this.recordId==this.data.data.recordId) {
      this.global.swalAlert("Alert!","Cant select the same subject.","warning")
    }else
    if (this.recordId!='') {this.global.swalLoading('')
          this.http.post(this.global.api+'Curriculum/Subject/Prerequisite/',{
            "subjectRecordId": this.data.data.recordId,
            "prerequisiteRecordId": this.recordId,
            "type": 1
          },this.global.option)         
          .map(response => response.json())
          .subscribe(res => {

              if (res.message=='Subject pre-requisite added successfully') {
               this.global.swalClose()//this.global.swalSuccess('Subject co-requisite added successfully')
              }else{
                this.global.swalAlert("Alert!","Subject co-requisite Duplicate.",'warning')
              }
              this.myControl.setValue('')
              this.subjectTitle=''
              this.subjectId=''
              this.recordId=''
              this.loadpresub()
          },Error=>{
            console.log(Error)
          });
    }else{
      if (this.options.length == 0) {
        this.global.swalAlert("Alert!","No available subject to be added.","warning")
      }else
        this.global.swalAlert("Alert!","No subject selected.","warning")
    }

  }
  resetsub(){
  }

  removesub(rid){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove co-requesite Subject','Subject has been Removed','','sy',rid);
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove,rid)
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
          if (remove=='sy') {this.global.swalLoading('')
            this.http.delete(this.global.api+'Curriculum/Subject/Prerequisite/'+this.data.data.recordId+"/"+rid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {this.global.swalClose()
                //this.global.swalSuccess(res.message)
                this.loadpresub()
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
  close(){
       this.dialogRef.close({result:'cancel'});
  }

}
