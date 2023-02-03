import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-enrollment-history',
  templateUrl: './enrollment-history.component.html',
  styleUrls: ['./enrollment-history.component.scss']
})
export class EnrollmentHistoryComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<EnrollmentHistoryComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { 
 
  }

  ngOnInit() {
  }

  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }

getformat(a){
     var x='';
     if (a.substring(6)!='') {
       if (a.substring(6)=='1')
       x="1st Semester";
     else if (a.substring(6)=='2')
       x="2nd Semester";
     else
       x="Summer";
     }
     
     var y = parseInt(a.substring(0,4)) + 1;

     a = x +' SY '+ a.substring(0,4) + "-" + y
        return a
      }
}
