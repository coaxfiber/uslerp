import { Component, OnInit } from '@angular/core';
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

export interface School {
  address: string;
  companyID: string;
  companyName: string;
}

@Component({
  selector: 'app-educationalbackground-update',
  templateUrl: './educationalbackground-update.component.html',
  styleUrls: ['./educationalbackground-update.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class EducationalbackgroundUpdateComponent implements OnInit {

  progLevelArr
  progNameArr
  schNameArr

  progLVl='';
  progName='';
  schName='';
  yrGrad='';
  sonumber='';

  selectedSchName=''
  UnitsEarned = '';


   myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  schoolCtrl = new FormControl();
  filteredSchools: Observable<School[]>;

  filteredSchs: Schoollist[] = [];
  usersForm: FormGroup;
  isLoading = false;



  identifier='';
  recordschname

  constructor(public dialogRef: MatDialogRef<EducationalbackgroundUpdateComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http,
  	private fb: FormBuilder,
  	private httpC: HttpClient,
  	) { 
  	
  	this.http.get(this.global.api+'PublicAPI/ProgramLevels',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	   this.progLevelArr = res;

	  },Error=>{
	    this.global.swalAlertError();
	  });


  }

  ngOnInit() {
    //console.log(this.data.selectedData.programName);
    

     this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.usersForm = this.fb.group({
      userInput: null
    })
    this.http.get(this.global.api+'PublicAPI/ProgramNames/'+this.data.selectedData.programLevelID,this.global.option)
    .map(response => response.json())
    .subscribe(res => {
     this.progNameArr = res
    },Error=>{
      this.global.swalAlertError();
    });


    this.progName = this.data.selectedData.programName
    this.myControl.setValue(this.progName);
    this.progLVl = this.data.selectedData.programLevelID.toString();
    this.usersForm.get('userInput').setValue({companyName:this.data.selectedData.schoolName})
    this.yrGrad = this.data.selectedData.yearGraduated;
    this.sonumber = this.data.selectedData.sonumber;
    this.UnitsEarned = this.data.selectedData.units_Earned;

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

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.progName = value;
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

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
        //console.log(filter)
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
    this.selectedSchName = sschname;
  }

  recordSelectedProgname(selectedProgName){
    this.progName = selectedProgName;
  }

  verifyClick(){
    if(this.currentSelectedProglvl != ''){
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
  }

  currentSelectedProglvl = ''
  getProgramName(selectedProglvl){
    this.currentSelectedProglvl = selectedProglvl;
    this.options = [];
    // this.filteredOptions = null;

    this.http.get(this.global.api+'PublicAPI/ProgramNames/'+selectedProglvl.programLevel,this.global.option)
    .map(response => response.json())
    .subscribe(res => {
       this.progNameArr = res
       for (var i = 0; i < this.progNameArr.length; ++i) 
        {
            this.options.push(this.progNameArr[i].programTitle)
        }
    },Error=>{
      this.global.swalAlertError();
    });

    // console.log(this.options)

  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void {
    //console.log(this.usersForm.get('userInput').value);
    //console.log(this.selectedSchName);
    this.progName = this.myControl.value;
 	  if (this.selectedSchName=='') {
       if(this.identifier != '1')
         this.recordschname = this.data.selectedData.schoolName
       else
         this.recordschname = this.usersForm.get('userInput').value
     }
    else
    {
      this.recordschname = this.selectedSchName
    }

    //console.log(this.data.selectedEID+"--"+this.progName+"--"+this.recordschname+"--"+this.sonumber+"--"+this.yrGrad);
    this.global.swalLoading('Updating Educational Attainment/Background');   
    this.http.put(this.global.api+'Employee/EducationalBackground/'+this.data.selectedEID,{
              "programname": this.progName,
              "school": this.recordschname,
              "yeargraduated": this.yrGrad,
              "sonumber": this.sonumber,
              "UnitsEarned": this.UnitsEarned
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalClose();
                                  //this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"Update success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
                            
  }
}
export class Schoollist {
	constructor(public companyID: string, public companyName: string) {}
}
export interface IUserResponse {
  total: string;
  results: Schoollist[];
}