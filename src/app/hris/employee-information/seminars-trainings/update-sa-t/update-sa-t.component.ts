import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-update-sa-t',
  templateUrl: './update-sa-t.component.html',
  styleUrls: ['./update-sa-t.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UpdateSaTComponent implements OnInit {

  progTypeArr: any = [];
  ptype
  ptypeid

  idn
  seminardesc
  companyname
  venue
  sdate
  edate
  STID
  appBy

  statusid
  

  constructor(public dialogRef: MatDialogRef<UpdateSaTComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	public global: GlobalService,
  	private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,
  	) { 
  	this.STID= this.data.selectedData.trainingTypeID
  	this.http.get(this.global.api+'HRISMaintenance/TraningType',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {

	   this.progTypeArr = res.data;
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }

  ngOnInit() {
    //console.log(this.global.requestid()+this.data.idnum)
    this.idn = this.data.idnum
    this.companyname= this.data.selectedData.companyname
  	this.ptype = this.data.selectedData.trainingType
  	this.seminardesc= this.data.selectedData.seminardescription
	  this.venue= this.data.selectedData.venue
  	var sd = new Date(this.data.selectedData.startdate);
  	var ed = new Date(this.data.selectedData.enddate);
  	this.sdate = sd;
  	this.edate = ed;
  	this.STID= this.data.selectedData.trainingTypeID.toString();

    if (this.data.selectedData.statusID == 1||this.data.selectedData.statusID==null) {
      this.statusid = 1;
    }else
      this.statusid = this.data.selectedData.statusID
    //console.log(this.statusid)
  }

  checked(){
    if (this.statusid==0) this.statusid=1
      else this.statusid=0
  }

  display(c){
  	//console.log(c.trainingType)
  	this.STID = c.trainingtypeID;
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void 
  {  	
  	
    //console.log(this.data.selectedSID+"--"+this.seminardesc+"--"+ this.companyname+"--"+this.sdate+"--"+this.edate+"--"+this.STID+"--"+this.venue+"--"+this.statusid)
    this.global.swalLoading('Updating Seminar and Training');
    this.http.put(this.global.api+'Employee/UpdateSeminarAndTraining/'+this.data.selectedSID,{
              "seminardesc": this.seminardesc,
              "companyname": this.companyname,
              "sdate": this.sdate,
              "edate": this.edate,
              "trainingTypeID": this.STID,
              "venue": this.venue,
              "statusID": this.statusid,
              "approvedBy": this.global.requestid()
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  //this.global.swalClose();
                                  this.global.swalAlert("Success","",'success');
                                  this.dialogRef.close({result:"Update success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
                               
  }
}
