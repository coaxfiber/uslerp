import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
@Component({
  selector: 'app-grade-last-sy',
  templateUrl: './grade-last-sy.component.html',
  styleUrls: ['./grade-last-sy.component.scss']
})
export class GradeLastSyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GradeLastSyComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
 
  }
  ngOnInit() {
  }

  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }
}
