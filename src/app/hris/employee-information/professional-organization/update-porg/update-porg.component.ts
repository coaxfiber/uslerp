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
  selector: 'app-update-porg',
  templateUrl: './update-porg.component.html',
  styleUrls: ['./update-porg.component.css']
})
export class UpdatePorgComponent implements OnInit {

  	org
	position
	statusid
	idn
  date
	checked(){
    if (this.statusid==0) this.statusid=1
      else this.statusid=0
  }

  constructor(public dialogRef: MatDialogRef<UpdatePorgComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	public global: GlobalService,
  	private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,
  	) {}
  ngOnInit() {
    this.idn = this.data.idnum
    this.position = this.data.selectedData.position
    this.org = this.data.selectedData.organization

    if (this.data.selectedData.statusID == 1||this.data.selectedData.statusID==null) {
      this.statusid = 1;

    }else
      this.statusid = this.data.selectedData.statusID
    var d = new Date(this.data.selectedData.expirationDate);
    this.date = d;
    //console.log(this.global.requestid())
  }

  
  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void 
  {
    this.global.swalLoading('Updating Organization');
    this.http.put(this.global.api+'Employee/Organization/'+this.data.selectedPID,{
              "position": this.position,
              "organization": this.org,
			  "statusID": this.statusid,
        "approvedBy": this.global.requestid(),
			  "expirationDate": this.date,

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
