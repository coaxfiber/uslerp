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
  selector: 'app-update-we',
  templateUrl: './update-we.component.html',
  styleUrls: ['./update-we.component.css']
})
export class UpdateWeComponent implements OnInit {

  position
  company
  sdate
  edate


  constructor(public dialogRef: MatDialogRef<UpdateWeComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,
  	) {}

  ngOnInit() {
    
    this.position = this.data.selectedData.position
    this.company = this.data.selectedData.companyname

    var sd = new Date(this.data.selectedData.startdate);
    var ed = new Date(this.data.selectedData.enddate);
    this.sdate = sd;
    this.edate = ed;

    
  }

  
  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void 
  {
    
    this.global.swalLoading('Updating Work Experience');
    this.http.put(this.global.api+'Employee/WorkExperience/'+this.data.selectedWID,{
              "position": this.position,
              "company": this.company,
              "sdate": this.sdate,
              "edate": this.edate,
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
