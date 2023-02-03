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
  selector: 'app-add-we',
  templateUrl: './add-we.component.html',
  styleUrls: ['./add-we.component.css']
})
export class AddWeComponent implements OnInit {

  position
  company
  sdate
  edate

  constructor(public dialogRef: MatDialogRef<AddWeComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,
  	) {}

  ngOnInit() {
  }



  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void {
    
 	  this.global.swalLoading('Adding Work Experience');
    this.http.post(this.global.api+'Employee/WorkExperience/'+this.data.selectedID,{
              "position": this.position,
              "company": this.company,
              "sdate": this.sdate,
              "edate": this.edate,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalClose();
                                  //this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"Adding Success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });

                                
  }
}
