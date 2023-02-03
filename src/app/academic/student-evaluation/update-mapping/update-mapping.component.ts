import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
@Component({
  selector: 'app-update-mapping',
  templateUrl: './update-mapping.component.html',
  styleUrls: ['./update-mapping.component.scss']
})
export class UpdateMappingComponent implements OnInit {
 notcred=''
 status=''
 check=0
 constructor(public dialogRef: MatDialogRef<UpdateMappingComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }


  ngOnInit() {
  	console.log(this.data.array)
  	this.status = this.data.array.statusid.toString()
  	this.notcred = this.data.array.subjid +" - "+ this.data.array.subjtitle +" with "+this.data.array.units + " total units: "+this.data.array.grade 
  }
  savevar=false
  save(){

        this.http.put(this.global.api+'StudentEvaluation/SubjectAcademicHistoryMapping/'+this.data.array.id,{
	          "academicHistoryRecordId": this.data.array.recid,
	          "statusId": parseInt(this.status)
          },this.global.option)         
              .map(response => response.json())
               .subscribe(res => {
                    this.global.swalSuccess(res.message)
                    this.check=1
                    this.closethis()
                    
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
                    this.savevar=false
                    this.global.swalAlertError();
          });
  }

 closethis(): void {
       this.dialogRef.close({result:this.check});
  }
}
