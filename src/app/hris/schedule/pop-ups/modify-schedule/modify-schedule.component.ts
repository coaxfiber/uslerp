import { Component, OnInit } from '@angular/core';
import { Inject,EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AmazingTimePickerService} from 'amazing-time-picker';



@Component({
  selector: 'app-modify-schedule',
  templateUrl: './modify-schedule.component.html',
  styleUrls: ['./modify-schedule.component.css']
})
export class ModifyScheduleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModifyScheduleComponent>,
  	@Inject(MAT_DIALOG_DATA) public data: any,
  	public dialog: MatDialog,
  	private global: GlobalService,
  	private http: Http,
    private fb: FormBuilder,
    private timepicker: AmazingTimePickerService,
  	) {}

  entryType;
  DayOfWeek
  TimeIn = '7:30'
  TimeOut = '12:00'

  computedHours
  timeIn="";
  timeOut="";

  daysArray: string[]=[];

  dayMonday=false;
  dayTuesday=false;
  dayWednesday=false;
  dayThursday=false;
  dayFriday=false;
  daySaturday=false;
  daySunday=false;

  ddayMonday=false;
  ddayTuesday=false;
  ddayWednesday=false;
  ddayThursday=false;
  ddayFriday=false;
  ddaySaturday=false;
  ddaySunday=false;

  ngOnInit() {
  	this.entryType = this.data.type;
  	if(this.entryType == "Add"){

  	}
  	else{
  		if(this.data.selectedData.dayOfWeek == 'Monday')
  			this.dayMonday = true;
  		if(this.data.selectedData.dayOfWeek == 'Tuesday')
  			this.dayTuesday = true;
  		if(this.data.selectedData.dayOfWeek == 'Wednesday')
  			this.dayWednesday = true;
  		if(this.data.selectedData.dayOfWeek == 'Thursday')
  			this.dayThursday = true;
  		if(this.data.selectedData.dayOfWeek == 'Friday')
  			this.dayFriday = true;
  		if(this.data.selectedData.dayOfWeek == 'Saturday')
  			this.daySaturday = true;
  		if(this.data.selectedData.dayOfWeek == 'Sunday')
  			this.daySunday = true;

  		this.ddEnable();

  		this.timeIn = this.data.selectedData.timeIn;
  		this.timeOut = this.data.selectedData.timeOut;
  		this.TimeIn = this.timeIn;
  		this.TimeOut = this.timeOut;
  		this.computedHours = this.data.selectedData.hours;
  		this.DayOfWeek = this.data.selectedData.dayOfWeek;
  	}
  }

  ddEnable(){
  	  this.ddayMonday=true;
	  this.ddayTuesday=true;
	  this.ddayWednesday=true;
	  this.ddayThursday=true;
	  this.ddayFriday=true;
	  this.ddaySaturday=true;
	  this.ddaySunday=true;
  }

  computeHours(){
  	if(this.timeIn!=""&&this.timeOut!=""){
  		var tin = Date.parse('2020-08-08 '+this.timeIn+':00');
  		var tout = Date.parse('2020-08-08 '+this.timeOut+':00');
  		var diffInMs= tout - tin;
		var diffInHours = (((diffInMs / 1000) / 60)/ 60)
		this.computedHours = diffInHours.toString();
  	}
  }

  addDayofWeek(day){
  	//console.log(this.validate(day))
  	
  	if(this.validate(day) == true)
  	{
  		//console.log("push")
  		this.daysArray.push(day);
  		//console.log(this.daysArray)
  	}
  	else{

  		let aCindex=this.daysArray.findIndex(item => item === day);
        //console.log(aCindex)
        this.daysArray.splice(aCindex, 1);
  		//console.log(this.daysArray)
  	}
	
  }

  validate(day):boolean{
  	if(day == 'Monday'){
  		this.dayMonday = this.check(this.dayMonday);
  		return this.dayMonday;
  	}
  	if(day == 'Tuesday'){
  		this.dayTuesday = this.check(this.dayTuesday);
  		return this.dayTuesday
  	}
  	if(day == 'Wednesday'){
  		this.dayWednesday = this.check(this.dayWednesday);
  		return this.dayWednesday
  	}
  	if(day == 'Thursday'){
  		this.dayThursday = this.check(this.dayThursday);
  		return this.dayThursday
  	}
  	if(day == 'Friday'){
  		this.dayFriday = this.check(this.dayFriday);
  		return this.dayFriday
  	
  	}if(day == 'Saturday'){
  		this.daySaturday = this.check(this.daySaturday);
  		return this.daySaturday
  	}
  	if(day == 'Sunday'){
  		this.daySunday = this.check(this.daySunday);
  		return this.daySunday
  	}
  	else
  		return false;
  }

  check(c):boolean{
  	if (c == true) {
  		return false;
  	}
  	else
  		return true
  }
  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  save(): void 
  {
    if(this.entryType == "Add"){
    	for(var x=0; x<this.daysArray.length; x++){
    		console.log(this.data.dtrid+'-'+this.daysArray[x]+'-'+this.TimeIn+'-'+this.TimeOut+'-'+this.computedHours)
    		
    		this.http.post(this.global.api+'Employee/Schedule/'+this.data.dtrid,{
              "DayOfWeek": this.daysArray[x],
              "TimeIn": this.timeIn,
              "TimeOut": this.timeOut,
              "Hours": this.computedHours,
            },this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  console.log(res)
                  //this.global.swalAlert(res.message,"",'success');
                  this.dialogRef.close({result:"Adding Success"});    
                },Error=>{
                  this.global.swalAlertError();
                  console.log(Error)
                });
            
    	}
    }else{
    	this.http.put(this.global.api+'Employee/Schedule/'+this.data.targetID,{
              "DayOfWeek": this.DayOfWeek,
              "TimeIn": this.timeIn,
              "TimeOut": this.timeOut,
              "Hours": this.computedHours,
            },this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  console.log(res)
                  //this.global.swalAlert(res.message,"",'success');
                  this.dialogRef.close({result:"Update Success"});    
                },Error=>{
                  this.global.swalAlertError();
                  console.log(Error)
                });
    }                           
  }

  openIndialog(){
  	const ref = this.timepicker.open({
  		time: this.TimeIn,
  		theme: 'material-blue',
  	});
  	ref.afterClose().subscribe((data) => {
  		this.timeIn = data;
  		this.computeHours();
  	});
  	
  }

  openOutdialog(){
  	const ref = this.timepicker.open({
  		time: this.TimeOut,
  		theme: 'material-blue',
  	});
  	ref.afterClose().subscribe((data) => {
  		this.timeOut = data;
  		this.computeHours();
  	});
  }

}
