import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';

import { UpdateMappingComponent } from './../update-mapping/update-mapping.component';
import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
	status=''
	notcred=''
  acadhist=[]
  notcredited=[]
  check=0
  constructor(public dialogRef: MatDialogRef<MappingComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http,public dialog: MatDialog) { }


  ngOnInit() {
    if (this.data.acadhistid==''&&this.data.map.length==0&&this.data.notcredited.length==0) {
       this.dialogRef.close({result:this.check});
       this.global.swalAlert("No Academic History to add!","",'warning')
    }
    this.notcredited=this.data.notcredited
   // if (this.data.color=='#fcedd2') { 
      if (this.data.map.length!=0) {
        this.notcred=this.data.map[0].recordId
      }else{
        if (this.data.acadhistid!='') {
          this.notcred=this.data.acadhistid
        }
      }
    //}
    
    this.getmapping()
  }

  getmapping(){
    this.acadhist=undefined
            this.http.get(this.global.api+'StudentEvaluation/SubjectAcademicHistoryMapping/'+this.data.id+'/'+this.data.progid+'?studentEvaluationChecklistId='+this.data.checklist.id,this.global.option)         
              .map(response => response.json())
                    .subscribe(res => {
                      this.acadhist=[]
                      for (var i = 0; i < this.data.grades.length; ++i) {
                        for (var s = 0; s < res.data.length; ++s) {
                          if (res.data[s].academicHistoryRecordId==this.data.grades[i].recordId) {
                            this.acadhist.push({
                              id:res.data[s].id,
                              recid:res.data[s].academicHistoryRecordId,
                              subjid:this.data.grades[i].subjectId,
                              subjtitle:this.data.grades[i].subjectTitle,
                              units:this.data.grades[i].units,
                              grade:this.data.grades[i].grade,
                              status:res.data[s].status,
                              statusid:res.data[s].statusId})
                          }
                        }
                      }
                    },Error=>{
                      this.acadhist=[]
                      this.global.swalAlertError();
                   });
  }

 close(): void {
       this.dialogRef.close({result:this.check});
  }
  addacadhisttemp=false
  save(){
  	if (this.status == '') {
  		this.status = '0'
  	}
    var dup =false
    for (var temp = 0; temp < this.acadhist.length; ++temp) {
      if (this.acadhist[temp].recid==this.notcred) {
        dup = true
        break
      }
    }
    if (dup) {
      this.global.swalAlert("Add failed!","Duplicate subject.","warning")
    }else
  	if (this.notcred=='') {
  		this.global.swalAlert("Field Required!","Academic history must not be empty.","warning")
  	}else
    {
      if (this.addacadhisttemp == false) {
        this.addacadhisttemp=true
        this.http.post(this.global.api+'StudentEvaluation/SubjectAcademicHistoryMapping/',{
          "studentEvaluationChecklistId": parseInt(this.data.checklist.id),
          "academicHistoryRecordId": parseInt(this.notcred),
          "statusId": parseInt(this.status)
          },this.global.option)         
              .map(response => response.json())
               .subscribe(res => {
                    this.status=''
                    this.notcred=''
                    this.global.swalSuccess(res.message)
                    this.addacadhisttemp=false
                    this.getmapping()
                    this.check=1

                      this.http.post(this.global.api+'StudentEvaluation/History',{
                            "idNumber": this.data.id,
                            "programId": this.data.progid,
                            "schoolYear": this.data.lastsy,
                            "evaluatedBy": this.global.requestid()
                          },this.global.option)         
                              .map(response => response.json())
                               .subscribe(res => {
                                  },Error=>{
                                    this.global.swalAlertError();
                                  });
                  },Error=>{
                    this.addacadhisttemp=false
                    this.global.swalAlertError();
          });
      }
    }
  }


  removesub(id){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Subject','Subject has been Removed','','sy',id);
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
            this.http.delete(this.global.api+'StudentEvaluation/SubjectAcademicHistoryMapping/'+id,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.getmapping()
                this.check=1
                
                      this.http.post(this.global.api+'StudentEvaluation/History',{
                            "idNumber": this.data.id,
                            "programId": this.data.progid,
                            "schoolYear": this.data.lastsy,
                            "evaluatedBy": this.global.requestid()
                          },this.global.option)         
                              .map(response => response.json())
                               .subscribe(res => {
                                  },Error=>{
                                    this.global.swalAlertError();
                                  });
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
   }
  
  openUpdatemapping(x){
    const dialogRef = this.dialog.open(UpdateMappingComponent, {
          width: '600px', disableClose: true, data:{lastsy:this.data.lastsy,status:this.data.status,array:x,id:this.data.id,progid:this.data.progid}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result==1) {
              this.getmapping()
            }
          }
        });
  }

}
