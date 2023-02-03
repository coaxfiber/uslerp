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
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit {


	deptArr;
	postArr;
	classArr;
	repArr;

	selectedDept=''
	selectedPost=''
	selectedClass=''
	selectedRept=''

	targetupdateID


	deptoptions: string[] =[]
  	deptmyControl = new FormControl();
  	deptfilteredOptions: Observable<string[]>;

  	postoptions: string[] =[]
  	postmyControl = new FormControl();
  	postfilteredOptions: Observable<string[]>;

  	HoFoptions: string[] =[]
  	HoFmyControl = new FormControl();
  	HoFfilteredOptions: Observable<string[]>;


  constructor(public dialogRef: MatDialogRef<ItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private global: GlobalService,
    private http: Http,
    private fb: FormBuilder,
    ) { 

  	

  }

  private _filterdept(value: string): string[] {
    const filterdeptValue = value.toLowerCase();
    return this.deptoptions.filter(optiondept => optiondept.toLowerCase().includes(filterdeptValue));
  }

  private _filterpost(value: string): string[] {
    const filterpostValue = value.toLowerCase();
    return this.postoptions.filter(optionpost => optionpost.toLowerCase().includes(filterpostValue));
  }

  private _filterHoF(value: string): string[] {
    const filterHoFValue = value.toLowerCase();
    return this.HoFoptions.filter(optionHoF => optionHoF.toLowerCase().includes(filterHoFValue));
  }

  ngOnInit() {

	if(this.data.type == "update"){

		this.selectedDept=this.data.sdid.toString();
		this.selectedPost=this.data.spid.toString();
		this.selectedClass=this.data.scid.toString();
		this.selectedRept=this.data.srtid;
		this.targetupdateID = this.data.siid
	}

	this.deptfilteredOptions = this.deptmyControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterdept(value))
      );

    this.postfilteredOptions = this.postmyControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterpost(value))
      );

    this.HoFfilteredOptions = this.HoFmyControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterHoF(value))
      );




    this.global.swalLoading('Loading item resources')
  	this.http.get(this.global.api+'HRISMaintenance/Department',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	    this.deptArr = res.data;
	    for (var i = 0; i < this.deptArr.length; ++i) {
            this.deptoptions.push(this.deptArr[i].departmentName)
        }
		   this.http.get(this.global.api+'HRISMaintenance/PositionList',this.global.option)
			  .map(response => response.json())
			  .subscribe(res => {
			    this.postArr = res.data;
		   		//console.log(this.postArr)
		   		for (var i = 0; i < this.postArr.length; ++i) {
		            this.postoptions.push(this.postArr[i].position)
		        }
		   		this.http.get(this.global.api+'HRISMaintenance/Classifications',this.global.option)
				  .map(response => response.json())
				  .subscribe(res => {
				   this.classArr = res.data;
		   			//console.log(this.classArr)

				   	this.http.get(this.global.api+'HRISMaintenance/HeadsOfOffices',this.global.option)
				  	.map(response => response.json())
				  	.subscribe(res => {
				   		this.repArr = res.data;
				   		for (var i = 0; i < this.repArr.length; ++i) {
				            this.HoFoptions.push(this.repArr[i].head)
				        }
				   		this.global.swalClose()
					   	//console.log(this.repArr)
					   
					  },Error=>{
					    this.global.swalAlertError();
					  });
				  },Error=>{
				    this.global.swalAlertError();
				  });
		  },Error=>{
		    this.global.swalAlertError();
		  });
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }


  setDept(){
  	//console.log(this.deptArr[this.deptoptions.indexOf(this.deptmyControl.value)].departmentID);
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
  

  save(): void {
    /*
    if(this.identifier == '1')
      this.recordschname = this.usersForm.get('userInput').value
    else
      this.recordschname = this.selectedSchName;
    */
    //console.log(this.selectedDept+'--'+this.selectedPost+'--'+this.selectedClass+'--'+this.selectedRept)

    if(this.data.type == "update"){

    	this.global.swalLoading('Updating Item');
	    this.http.put(this.global.api+'HRISMaintenance/UpdateItem/'+this.targetupdateID,{
	              "departmentID": this.selectedDept,
	              "positionID": this.selectedPost,
	              "classificationID": this.selectedClass,
	              "reportsTo": this.selectedRept,
	             
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

    }else{
	 	this.global.swalLoading('Adding Item');
	    this.http.post(this.global.api+'HRISMaintenance/InsertItem',{
	              "departmentID": this.selectedDept,
	              "positionID": this.selectedPost,
	              "classificationID": this.selectedClass,
	              "reportsTo": this.selectedRept,
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

}