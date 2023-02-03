import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-research',
  templateUrl: './add-research.component.html',
  styleUrls: ['./add-research.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddResearchComponent implements OnInit {

  rtitle:any = '';
  rmarks:any = '';
  cyear:any = '';
  date:any = '';
  resTypeArr= '';
  RID= '';
  constructor(public dialogRef: MatDialogRef<AddResearchComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http
  	) { 

    this.http.get(this.global.api+'HRISMaintenance/ResearchTypes',this.global.option)
    .map(response => response.json())
    .subscribe(res => {
      //console.table(res.data)
     this.resTypeArr = res.data;
    },Error=>{
      this.global.swalAlertError();
    });
  }

  ngOnInit() {
    
  }
  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});

  }
  
  save(): void {
    //console.log(this.data.selectedID);
 	this.global.swalLoading('Adding Research');
    this.http.post(this.global.api+'Employee/InsertResearch/'+this.data.selectedID,{
              "title": this.rtitle,
              "dateCompleted": this.date,
              "remarks": this.rmarks,
              "copyrightYear": this.cyear.toString(),
              "researchTypeID": this.RID,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  console.log(res)
                                  // this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"Adding Success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
  }
}
