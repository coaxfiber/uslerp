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

import {AmazingTimePickerService} from 'amazing-time-picker';
import * as moment from 'moment';


import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private global: GlobalService,
    private http: Http,
    private fb: FormBuilder,
    private timepicker: AmazingTimePickerService,
    ) { }

  schYear
  slotNo
  testdate

  time = '8:00'
  endtime = '8:00'
  recordTime
  recordEndTime

  entryType

  sylist
  selectedsem
  activesy

  finaldate = ''

  finalSTime=''
  finalEtime=''

  ngOnInit() {
    this.time = '8:00'
  	this.entryType = this.data.type;
  	this.getSY();
    if(this.entryType == "Update"){
      this.getTimeIO(this.data.targetData.testDate)
      
      this.recordTime = this.finalSTime;
      if(parseInt(this.finalSTime.substring(0,2))<6){
        this.finalSTime = (parseInt(this.finalSTime.substring(0,2))+12).toString()+':'+this.finalSTime.substring(2,4)
        this.time = this.finalSTime;
      }
      else
        this.time = this.finalSTime;

     
      this.recordEndTime = this.finalEtime;
      if(parseInt(this.finalEtime.substring(0,2))<6){
        this.finalSTime = (parseInt(this.finalEtime.substring(0,2))+12).toString()+':'+this.finalEtime.substring(2,4)
        this.endtime = this.finalEtime;

      }
      else
        this.endtime = this.finalEtime;


      //console.log(this.data.targetData.testDate.substring(0,11))
      const momentDate = new Date(this.data.targetData.testDate.substring(0,11)); // Replace event.value with your date value
      const formattedDate = moment(momentDate).format("YYYY-MM-DD");


      this.testdate = formattedDate
      this.slotNo = this.data.targetData.slots
      // console.log(this.global.syear)
    }
  }

  openIndialog(){
  	const ref = this.timepicker.open({
  		time: this.time,
  		theme: 'material-blue',
  	});
  	ref.afterClose().subscribe((data) => {
      if(parseInt(data.substring(0,2))>12)
      {
        if((parseInt(data.substring(0,2))>=10)&&(parseInt(data.substring(0,2))<=12))
          data = (parseInt(data.substring(0,2))-12).toString()+data.substring(2,5)
        else
          data = '0'+(parseInt(data.substring(0,2))-12).toString()+data.substring(2,5)
      }
  		this.recordTime = data;
  	});
  	
  }
  openIndialog1(){
    const ref = this.timepicker.open({
      time: this.endtime,
      theme: 'material-blue',
    });
    ref.afterClose().subscribe((data) => {

      if(parseInt(data.substring(0,2))>12)
      {
        if((parseInt(data.substring(0,2))>=10)&&(parseInt(data.substring(0,2))<=12))
          data = (parseInt(data.substring(0,2))-12).toString()+data.substring(2,5)
        else
          data = '0'+(parseInt(data.substring(0,2))-12).toString()+data.substring(2,5)
      }

      this.recordEndTime = data;
    });
    
  }


  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }

  getTimeIO(param){
    //console.log(param)
    
    this.finalSTime = param.substring(12,17)
    this.finalEtime = param.substring(22,27)
  }

  /*getTime(param){

      //console.log(param)
      let YourDate = param
      let time= moment(YourDate).format("hh:mm")
      // console.log(time.substring(3,5))
      var x = time.substring(0,2)
      if(parseInt(x)<6){
        // console.log((parseInt(x)+12).toString()+":"+time.substring(3,5))
        this.recordTime = time.toString();
        return param = (parseInt(x)+12).toString()+":"+time.substring(3,5);
      }
      else{
        this.recordTime = time.toString();
        return param = time.toString()
      }

  }*/

  getSY(){

  	this.http.get(this.global.api+'Maintenance/SYOptionsList',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.sylist=res.data
            //console.log(this.sylist)
          },Error=>{
             this.global.swalAlertError();
          });
  }

  display(x){
    var y = x.substring(0,4)
    var z = parseInt(y) + 1
    var a = y.toString() + " - " + z.toString();
    var b = x.substring(6,7)
    var c
    if (b==1)
      c="First Semester"
    else if (b==2)
      c="Second Semester"
    else
      c="Summer"
    return "School Year "+a + " " + c
  }

  activate(x){
  	this.activesy = x
  }

  
  save(): void 
  {
    if(this.entryType == "Add"){
		
    	this.finaldate = this.formatFinalDate(this.testdate);
    	this.http.post(this.global.api+'Maintenance/EntranceTest',{
              "SchoolYear": this.global.syear,
              "Slots": this.slotNo,
              "TestDate": this.finaldate,
            },this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  console.log(res)
                  this.dialogRef.close({result:"Adding Success"});    
                },Error=>{
                  this.global.swalAlertError();
                  console.log(Error)
                });
    }else{
      
     
      this.finaldate = this.formatFinalDate(this.testdate);
      console.log(this.finaldate)
      this.http.put(this.global.api+'Maintenance/EntranceTest/'+this.data.targetData.id,{
              "SchoolYear": this.global.syear,
              "Slots": this.slotNo,
              "TestDate": this.finaldate,
            },this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  
                  //this.global.swalAlert(res.message,"",'success');
                  this.dialogRef.close({result:"Update Success"});    
                },Error=>{
                  this.global.swalAlertError();
                  console.log(Error)
                });
    	
    }                           
  }

  formatFinalDate(param)
  {
    const momentDate = new Date(param);
    const formattedDate = moment(momentDate).format("MMM DD YYYY")

    if(parseInt(this.recordTime.substring(0,2))>=10&&parseInt(this.recordTime.substring(0,2))<=12)
    {
      if(parseInt(this.recordTime.substring(0,2))==12)
        this.recordTime = this.recordTime+'PM'
      else
        this.recordTime = this.recordTime+'AM'
    }
    else{
      if(parseInt(this.recordTime.substring(0,2))<6)
        this.recordTime = '0'+this.recordTime+'PM'
      else
        this.recordTime = '0'+this.recordTime+'AM'
    }

    if(parseInt(this.recordEndTime.substring(0,2))>=10&&parseInt(this.recordEndTime.substring(0,2))<=12)
    {
      if(parseInt(this.recordEndTime.substring(0,2))==12)
        this.recordEndTime = this.recordEndTime+'PM'
      else
        this.recordEndTime = this.recordEndTime+'AM'
    }
    else{
      if(parseInt(this.recordEndTime.substring(0,2))<6)
        this.recordEndTime = '0'+this.recordEndTime+'PM'
      else
        this.recordEndTime = '0'+this.recordEndTime+'AM'
    }

    return (formattedDate+' '+this.recordTime+' - '+this.recordEndTime).toString()
  }

}
