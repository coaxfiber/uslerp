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

//////needed for school name/sponsor search and filtering////////////////////////////
/*
export interface School {
  address: string;
  companyID: string;
  companyName: string;
}
export class Schoollist {
  constructor(public companyID: string, public companyName: string) {}
}
export interface IUserResponse {
  total: string;
  results: Schoollist[];
}*/
////////////////////////////////////////////////////////////////////////////////////

@Component({
  selector: 'app-add-sa-t',
  templateUrl: './add-sa-t.component.html',
  styleUrls: ['./add-sa-t.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddSaTComponent implements OnInit {
  progTypeArr: any=[]
  seminardesc=''
  companyname=''
  sdate
  edate
  trainingTypeID
  venue=''

  STID=''
  SType=''


//////needed for school name/sponsor search and filtering////////////////////////////
  //filteredSchs: Schoollist[] = [];
  //usersForm: FormGroup;
  //isLoading = false;

  //selectedSchName = '';
  //schNameArr
  //recordschname
  //identifier
////////////////////////////////////////////////////////////////////////////////////



  constructor(public dialogRef: MatDialogRef<AddSaTComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http,
    private fb: FormBuilder,
    private httpC: HttpClient,
  	) { 

  	this.http.get(this.global.api+'HRISMaintenance/TraningType',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.progTypeArr = res.data;
	  },Error=>{
	    this.global.swalAlertError();
	  });

  }

  ngOnInit() {
    /*
    this.usersForm = this.fb.group({
      userInput: null
    })

    this.isLoading = false
      this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        switchMap(value => this.search(this.usersForm
        .get('userInput').value)
        )
      )
      .subscribe(users => this.filteredSchs = users.results);
      */
  }
/*
  displayFn(sch: Schoollist) {if (sch) { return sch.companyName; }}

  
  search(filter:any): Observable<IUserResponse> {

  this.isLoading = true
    return this.httpC.get<IUserResponse>(this.global.api+'PublicAPI/Schools',{observe: 'body', responseType: 'json'})
    .pipe(
      tap((response: IUserResponse) => {
        var x= filter;
        if (x.companyName==undefined) {
          this.identifier = '1'
          x= filter;
        }else
        x= filter.companyName;
        this.schNameArr = response

        response.results = this.schNameArr
          .map(sch => new Schoollist(sch.companyID, sch.companyName))
          .filter(sch => sch.companyName.toLowerCase().includes(x.toLowerCase()))
        
    this.isLoading = false
        return response;
      })
      );
  }

  recordSelectedSchname(sschname){
    this.identifier = '2'
    this.selectedSchName = sschname;
  }*/

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

 	  this.global.swalLoading('Adding Seminar and Training');
    this.http.post(this.global.api+'Employee/InsertSeminarAndTraining/'+this.data.selectedID,{
              "seminardesc": this.seminardesc,
              "companyname": this.companyname,
              "sdate": this.sdate,
              "edate": this.edate,
              "trainingTypeID": this.STID,
              "venue": this.venue
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