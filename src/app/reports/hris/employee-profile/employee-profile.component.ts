import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SharedServicesService} from './../../shared-services.service';
import { EmployeeProfileDetailsComponent } from './employee-profile-details/employee-profile-details.component';
import * as XLSX from 'xlsx'; 


import {Sort} from '@angular/material/sort';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {

  constructor(private excelService:SharedServicesService,public global: GlobalService,private http: Http,public dialog: MatDialog) { }

  config: any;
  departmentArr = []
  DID

  employeeArr = null;
  tempArr = []



  empid = '';
  empName = '';
  empdateHired = '';
  empyearsOfService = '';
  empdateOfRetirement = '';
  empretirementYear = '';
  empemploymentStatus = '';
  empClassification = '';

  myControl = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;


  ngOnInit() {

    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: 0
    };

    this.filteredOptions = this.myControl.valueChanges
      .pipe(startWith(''),map(value => this._filter(value))
      );

  	this.getDepartment();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.deptName = value;
    // console.log(this.options)
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  verifyClick(){
    if(this.myControl.value == null){
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }
    else{
      this.myControl.setValue('')
    }
        

  }

  getDepartment(){
  	this.http.get(this.global.api+'HRISMaintenance/Department',this.global.option)
	  .map(response => response.json())
	  .subscribe(res => {
	    this.departmentArr = res.data;

       for (var i = 0; i < this.departmentArr.length; ++i) 
        {
            this.options.push(res.data[i].departmentID+'-'+res.data[i].departmentName)
        }
	   
      // console.log(this.departmentArr)
	  },Error=>{
	    this.global.swalAlertError();
	  });
  }

  getAdditionalInfo(a){
  	 const dialogRef = this.dialog.open(EmployeeProfileDetailsComponent, {
          width: '900px', disableClose: false,data:{SelectedData:a}
        });
  }

  deptName = '';
  getDepartmentid(x){
    var id = '';
    for (var i = 0 ; i< x.length; ++i) {
      if(x.substring(i,i-1)=='-'){
         break
      }
      else{
        id=id+x.substring(i,i-1)
      }
    }

    return id;
  }
  setDept(x){
  	this.deptName = this.getFilteredDeptName(x);
    this.myControl.setValue(this.deptName)
    var id=this.getDepartmentid(x);
    
    this.http.get(this.global.api+"HRISMaintenance/Department?departmentID="+id,this.global.option)
    .map(response => response.json())
    .subscribe(res => {
      
       this.DID = res.data[0].departmentID
    },Error=>{
      this.global.swalAlertError();
    });

  }

  getFilteredDeptName(param){
    var ctr = 0
    for (var i = 0 ; i< param.length; ++i) {
      if(param.substring(i,i-1)=='-'){
         break
      }
      else{
        ctr = i
      }
    }
    return param.substring(ctr+1,param.length)
  }


  EmpStatusList
  loadEmploymentStatus(){
    this.http.get(this.global.api+'HRISMaintenance/EmpStatus',this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        
        if (res.data==null) {
          this.global.swalAlert(res.message,'','warning')
        }else
          this.EmpStatusList = res.data

      },Error=>{
       
        this.global.swalAlertError();
      });
  }

  generate(){

  	if (this.DID=='') {
  		this.global.swalAlert("Department is required!",'','warning')
  	}else{
  		this.employeeArr=undefined

  		this.http.get(this.global.api+'ReportHRIS/EmployeeProfileByDept/'+this.DID,this.global.option)
		  .map(response => response.json())
		  .subscribe(res => {
		   // console.log(res)
		   this.employeeArr=[];
		  	if (res.data==null) {
		  		this.global.swalAlert(res.message,'','warning')
		  	}else
		      this.employeeArr = res.data;
          this.tempArr = res.data;
          this.loadEmploymentStatus();
          this.keyDownFunction()

		  },Error=>{
		  	this.employeeArr = [];
		    this.global.swalAlertError();
		  });

		
  	}
  }

  left = 0
  right = 0

  keyDownFunction(){
    this.employeeArr = [];
    // var checktrue = true
    for (var i = 0; i < this.tempArr.length; ++i) {
      
      var operator = this.empyearsOfService.substring(1,0);
      this.left = parseInt(this.tempArr[i].yearsOfService);
      this.right = parseInt(this.empyearsOfService.substring(1,this.empyearsOfService.length));

      if(
          (this.tempArr[i].employeeId.toLowerCase().includes(this.empid.toLowerCase()))
          && this.tempArr[i].name.toLowerCase().includes(this.empName.toLowerCase())
          &&(
              this.tempArr[i].dateHired.toLowerCase().includes(this.empdateHired.toLowerCase())
              ||this.tempArr[i].dateHired == '' 
              || this.tempArr[i].dateHired == null
            )
          &&(
              this.tempArr[i].dateOfRetirement.toLowerCase().includes(this.empdateOfRetirement.toLowerCase())
              ||this.tempArr[i].dateOfRetirement == '' 
              || this.tempArr[i].dateOfRetirement == null)
          &&(
              this.tempArr[i].retirementYear.toLowerCase().includes(this.empretirementYear.toLowerCase())
              ||this.tempArr[i].retirementYear == '' 
              || this.tempArr[i].retirementYear == null)
          &&(
              this.tempArr[i].employmentStatus.toLowerCase().includes(this.empemploymentStatus.toLowerCase())
              ||this.tempArr[i].employmentStatus == '' 
              || this.tempArr[i].employmentStatus == null)
          &&(this.tempArr[i].classification.toLowerCase().includes(this.empClassification.toLowerCase()))
        )
      {

        if(operator == '>'){
          if(this.left>this.right){
            this.employeeArr.push(this.tempArr[i])
          }
        }
        else if(operator == '<'){
          if(this.left<this.right){
            this.employeeArr.push(this.tempArr[i])
          }
        }
        else{
          if(this.tempArr[i].yearsOfService.toString().toLowerCase().includes(this.empyearsOfService.toLowerCase())
              ||this.tempArr[i].yearsOfService == '' 
              || this.tempArr[i].yearsOfService == null)
          {
            this.employeeArr.push(this.tempArr[i])
          }
        }
        
        
        
      }
    }
    this.config = {
      itemsPerPage: 8,
      currentPage: 1,
      totalItems: this.employeeArr.length
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  export(datatoExport){
  	// console.log(datatoExport);
  	var arr = []
    for (var i = 0; i < datatoExport.length; ++i) {
      arr.push(
      {
        "EMPLOYEE ID": datatoExport[i].employeeId,
      	"NAME": datatoExport[i].name,
      	"GENDER": datatoExport[i].gender,
      	"DATE OF BIRTH":datatoExport[i].dateOfBirth,
      	"AGE":datatoExport[i].age,
      	"DATE OF RETIREMENT":datatoExport[i].dateOfRetirement,
     	"RETIREMENT YEAR":datatoExport[i].retirementYear,
      	"DATE HIRED":datatoExport[i].dateHired,
      	"YEARS OF SERVICE":datatoExport[i].yearsOfService,
      	"EMPLOYMENT STATUS":datatoExport[i].employmentStatus,
      	"RANK":datatoExport[i].rank,
      	"POSITION":datatoExport[i].position,
      	"CLASSIFICATION": datatoExport[i].classification,
      	"ELIGIBILITY":datatoExport[i].eligibility,
      	"BACHELOR'S DEGREE":datatoExport[i].bachelorsDegree,
      	"MASTERAL DEGREE":datatoExport[i].masteralDegree,
      	"DOCTORATE":datatoExport[i].doctorate,
      	"CEDULA NO":datatoExport[i].cedulaNo,
      	"PLACE ISSUED":datatoExport[i].placeIssued,
      	"DATE ISSUED":datatoExport[i].dateIssued,
      	"PTR NO":datatoExport[i].ptrNo,  
      }
        )
    }
    // console.log(arr)
   this.excelService.generateHRISemployeeProfileExcel(arr,this.deptName);
  }

}
