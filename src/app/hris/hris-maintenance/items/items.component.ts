import { Component,ViewChild, OnInit,ElementRef } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EmployeeLookupComponent } from './../../../academic/lookup/employee-lookup/employee-lookup.component';
import { ConfirmationDialogComponent } from './../../confirmation-dialog/confirmation-dialog.component';
import { ItemModalComponent } from '.././modals/item-modal/item-modal.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

	itemArr
	deptName
	postName
	className
	reportsto

	itemID
	deptNameID
	postNameID
	classNameID
	reportstoID

	targetdeleteitemID

	editCTRL:boolean;

  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,private global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.populateTable();
  	this.editCTRL = true;
  }

  populateTable(){
  	this.http.get(this.global.api+'HRISMaintenance/Items',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.itemArr = res.data;
	   //console.table(res.data)
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }


  getiteminfo(d){
  this.deptName = d.departmentName;
  this.postName = d.position;
  this.className = d.classification;
  this.reportsto = d.reportsTo;

  this.itemID = d.itemid;
  this.deptNameID = d.departmentID;
  this.postNameID = d.positionID;
  this.classNameID = d.classificationID;
  this.reportstoID = d.reportstoID;

  this.editCTRL = false;
  }

  editItem(){
  	const dialogRef = this.dialog.open(ItemModalComponent, {
          width: '600px', disableClose: false,data:{
          	siid:this.itemID,
          	sdid:this.deptNameID,
          	spid:this.postNameID,
          	scid:this.classNameID,
          	srtid:this.reportstoID,
          	type:"update"}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
              this.populateTable();
              this.Cancel();
          }
        });
  }

  deleteItem(){
  	this.editCTRL = true;


  	const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'HRISMaintenance/DeleteItem/'+parseInt(this.itemID),this.global.option)
            .map(response => response.json())
            .subscribe(res => {

                this.global.swalAlert("Success","",'success');

                this.populateTable();
  				this.Cancel();
              
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });

  	
  }

  Cancel(){
  this.deptName = null;
  this.postName = null;
  this.className = null;
  this.reportsto = null;

  this.editCTRL = true;
  }


  additem(): void {
      const dialogRef = this.dialog.open(ItemModalComponent, {
        width: '600px', disableClose: false,data:{selectedData:null,type:"add"}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {
            this.populateTable();  
        }
      });
    
   }

}
