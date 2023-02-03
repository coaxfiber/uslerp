import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-educational-background',
  templateUrl: './educational-background.component.html',
  styleUrls: ['./educational-background.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EducationalBackgroundComponent implements OnInit {
  
  yeargrad=''
  otherinfo=''
  arrayproglevel
  proglevel=''
  arrayprog
  prog=''
  arrayschool
  options: string[] =[]

  progname=''
  schoolName
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  disabled=false;
  constructor(public dialogRef: MatDialogRef<EducationalBackgroundComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http: Http,public global: GlobalService) { }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnInit() {
    console.log(this.data)
      if(this.data.seek==1){
        this.proglevel = this.data.data.programLevel.toString()
        if (this.proglevel='0') {
          this.proglevel = '00';
        }
        this.getprogram(this.proglevel)
        this.disabled = true;
        this.prog = this.data.data.programID.toString()
        this.myControl.setValue(this.data.data.schoolName);
        this.otherinfo = this.data.data.otherInfo
        this.yeargrad = this.data.data.yearGraduated
        //this.myControl.valuesetValue() = this.data.data.programID
      }


    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

  	this.http.get(this.global.api+'PublicAPI/ProgramLevels',this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  this.arrayproglevel = res
                   this.http.get(this.global.api+'PublicAPI/Schools',this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {
                        this.arrayschool =res
                        for (var i = 0; i < this.arrayschool.length; ++i) {
                            this.options.push(this.arrayschool[i].companyName)
                        }
                      });
                });


  }
  assign(x){
    this.progname=x
  }
  getprogram(prog){
    this.http.get(this.global.api+'PublicAPI/ProgramNames/'+prog,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  this.arrayprog = res
                });
  }
 onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }

  save(){
    if (this.proglevel!=''&&this.prog!=''&&this.yeargrad!='') {
      // code...
    if (this.options.indexOf(this.myControl.value)!=-1) {
      this.http.put(this.global.api+'Student/EducBG/'+this.data.id ,{
                    "programLevel": this.proglevel.toString(),
                    "programID": this.prog.toString(),
                    "programName": this.progname,
                    "schoolName": this.myControl.value,
                    "yearGraduated": this.yeargrad,
                    "otherInfo": this.otherinfo,"companyID": this.arrayschool[this.options.indexOf(this.myControl.value)].companyID,
              },this.global.option)
                    .map(response => response.json())
                    .subscribe(res => {
                      this.global.swalSuccess(res.message);
                       this.dialogRef.close({result:'nice'});
                    },Error=>{
                      this.global.swalAlertError();
                      console.log(Error)
                    });
    }else 
      this.global.swalAlert("School Name must be selected in the list!","",'warning');
  
    
    }else 
      this.global.swalAlert("Please fill in the required fields!","",'warning');
  
    
  }
  saveadd(){
    if (this.proglevel!=''&&this.prog!=''&&this.yeargrad!='') {
      // code...
    if (this.options.indexOf(this.myControl.value)!=-1) {
      this.http.post(this.global.api+'Student/EducBG/'+this.data.id ,{
                    "programLevel": this.proglevel.toString(),
                    "programID": this.prog.toString(),
                    "programName": this.progname,
                    "schoolName": this.myControl.value,
                    "yearGraduated": this.yeargrad,
                    "otherInfo": this.otherinfo,"companyID": this.arrayschool[this.options.indexOf(this.myControl.value)].companyID,
              },this.global.option)
                    .map(response => response.json())
                    .subscribe(res => {
                      this.global.swalSuccess(res.message);
                       this.dialogRef.close({result:'nice'});
                    },Error=>{
                      this.global.swalAlertError();
                      console.log(Error)
                    });
    }else 
      this.global.swalAlert("School Name must be selected in the list!","",'warning');
  
    
    }else 
      this.global.swalAlert("Please fill in the required fields!","",'warning');
  
    
  }

}
