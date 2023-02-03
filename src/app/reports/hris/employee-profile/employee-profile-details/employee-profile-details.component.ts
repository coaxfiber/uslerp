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


import {SharedServicesService} from './../../../shared-services.service';


@Component({
  selector: 'app-employee-profile-details',
  templateUrl: './employee-profile-details.component.html',
  styleUrls: ['./employee-profile-details.component.css']
})
export class EmployeeProfileDetailsComponent implements OnInit {

  constructor(private excelService:SharedServicesService,public dialogRef: MatDialogRef<EmployeeProfileDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private global: GlobalService,
    private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,
    ) { }

  SelectedData;

  ngOnInit() {
  	this.SelectedData = this.data.SelectedData;
  }


  displaycs(x){
  	if (x=='S') {
  		return 'Single'
  	}
  	if (x=='M') {
  		return 'Married'
  	}
  	if (x=='W') {
  		return 'Widow'
  	}
  }
  displayg(x){
  	if (x=='M') {
  		return 'Male'
  	}
  	if (x=='F') {
  		return 'Female'
  	}
  }

  export(){
    this.excelService.generateHRISemployeeProfileExcelSolo(this.data.SelectedData)
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }


}
