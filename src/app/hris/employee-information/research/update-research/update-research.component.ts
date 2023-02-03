import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-update-research',
  templateUrl: './update-research.component.html',
  styleUrls: ['./update-research.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateResearchComponent implements OnInit {

  rtitle
  rmarks
  cyear
  date
  idn
  statusid

  RID=''
  resTypeArr=''

  constructor(public dialogRef: MatDialogRef<UpdateResearchComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	public global: GlobalService,
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
    this.idn = this.data.idnum
  	this.rtitle = this.data.selectedData.title
  	this.rmarks = this.data.selectedData.remarks
  	this.cyear = this.data.selectedData.copyrightYear


    if (this.data.selectedData.statusID == 1||this.data.selectedData.statusID==null) {
      this.statusid = 1;

    }else
      this.statusid = this.data.selectedData.statusID
  	var sdate = new Date(this.data.selectedData.dateCompleted);
    this.date=sdate;
    this.RID = this.data.selectedData.researchTypeID.toString();
  }

    checked(){
    if (this.statusid==0) this.statusid=1
      else this.statusid=0

    console.log(this.statusid);
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void 
  {
     this.global.swalLoading('Updating Research');
    this.http.put(this.global.api+'Employee/UpdateResearch/'+this.data.selectedRID,{
              "title": this.rtitle,
              "dateCompleted": this.date,
              "remarks": this.rmarks,
              "copyrightYear": this.cyear,
              "statusID": this.statusid,
              "approvedBy": this.global.requestid(),
              "researchTypeID": this.RID
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalAlert("Success","",'success');
                                  this.dialogRef.close({result:"Update success"});   
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
  }
}
