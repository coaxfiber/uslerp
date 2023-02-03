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
  selector: 'app-add-porg',
  templateUrl: './add-porg.component.html',
  styleUrls: ['./add-porg.component.css']
})
export class AddPorgComponent implements OnInit {

	org
	position
  date

  constructor(public dialogRef: MatDialogRef<AddPorgComponent>,
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
    
 	  this.global.swalLoading('Adding Organization');
    this.http.post(this.global.api+'Employee/Organization/'+this.data.selectedID,{
              "position": this.position,
              "organization": this.org,
              "expirationDate": this.date

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
