import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-admitted-dialog',
  templateUrl: './admitted-dialog.component.html',
  styleUrls: ['./admitted-dialog.component.css']
})
export class AdmittedDialogComponent implements OnInit {


  ///////////////////PAGINATION VARIABLES///////////////////////
  admittedCtr = 0;
  admittedConfig: any;
  collection = { count: 60, data: [] };
  //////////////////////////////////////////////////////////////


  constructor(public dialogRef: MatDialogRef<AdmittedDialogComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private http: Http,
    private fb: FormBuilder,
  	) { 

  	this.admittedConfig = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.admittedCtr
    };

  }


  admittedStudentsList
  stud

  ngOnInit() {
    console.log(this.data)
  	this.admittedStudentsList = this.data.selectedData;

  	if(this.admittedStudentsList.length > 1)
  		this.stud = 'Students'
  	else
  		this.stud = 'Student'
  	//console.log(this.admittedStudentsList)
  }


  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  admittedPageChanged(event){
    	this.admittedConfig.currentPage = event;
  	}

}
