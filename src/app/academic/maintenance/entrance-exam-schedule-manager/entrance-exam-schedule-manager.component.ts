import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Sort} from '@angular/material/sort';

import Swal from 'sweetalert2';import { map } from 'rxjs/operators';
import {PopUpComponent} from './pop-up/pop-up.component';
import { ConfirmationDialogComponent } from './../../../hris/confirmation-dialog/confirmation-dialog.component';

import { DatePipe } from '@angular/common'



const swal = Swal;

@Component({
  selector: 'app-entrance-exam-schedule-manager',
  templateUrl: './entrance-exam-schedule-manager.component.html',
  styleUrls: ['./entrance-exam-schedule-manager.component.css']
})
export class EntranceExamScheduleManagerComponent implements OnInit {


///////////////////PAGINATION VARIABLES///////////////////////
  eeschedCtr = 0;
  eeschedConfig: any;
  collection = { count: 60, data: [] };
  //////////////////////////////////////////////////////////////


  constructor(public global: GlobalService,private http: Http,public dialog: MatDialog,public datepipe: DatePipe) { 

    this.eeschedConfig = {
      itemsPerPage: 15,
      currentPage: 1,
      totalItems: this.eeschedCtr
    };

  }


  search=''

  allSchedsArr

  updateDataArr
  temp=[]

 eeschedPageChanged(event){
      this.eeschedConfig.currentPage = event;
    }

  ngOnInit() {
  	this.getEntranceExamScheds('',this.global.syear);
  }

  // keyDownFunction(event){
  //  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
   	
  //    	this.getEntranceExamScheds(this.search,this.global.syear)
  //   }else{

  //   }
  // }


keyDownFunction(){
    this.temp=[]
    if (this.search=="") {
      this.temp=this.allSchedsArr
    }else{
      for (var i = 0; i < this.allSchedsArr.length; ++i) {
        
         if (this.allSchedsArr[i].testDate.toLowerCase().includes(this.search.toLowerCase())) {
           this.temp.push(this.allSchedsArr[i])
          }
      }
    }
  }

// tempdate
// convertDate(param){
//   this.tempdate=new Date(param);
//    let latest_date =this.datepipe.transform(this.tempdate, 'MMM d, y h:mm a');
//     param = latest_date
//   return param;
// }

  getEntranceExamScheds(param,sy){
  	this.http.get(this.global.api+'Maintenance/EntranceTest/?id='+param+'&schoolYear='+sy,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.allSchedsArr = res.data;
            this.temp = this.allSchedsArr;
          },Error=>{
            //console.log(Error);
            console.log(Error)
         });  
  }

  addEntry(){
    const dialogRef = this.dialog.open(PopUpComponent, {
          width: '500px', disableClose: false,data:{selectedData:"",type:"Add"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
              this.getEntranceExamScheds('',this.global.syear);
          }
        });
  }
  updateEntry(param){
    // console.table(param)
    const dialogRef = this.dialog.open(PopUpComponent, {
          width: '500px', disableClose: false,data:{selectedData:param,type:"Update",targetData:param}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
             this.getEntranceExamScheds('',this.global.syear);
          }
        });
  }

  deleteEntry(paramid){
     const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Maintenance/EntranceTest/'+parseInt(paramid),this.global.option)
            .map(response => response.json())
            .subscribe(res => {

                this.global.swalAlert("Success","",'success');
                this.getEntranceExamScheds('',this.global.syear);
              
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

  sortData(sort: Sort) {
    const data = this.temp.slice();
    if (!sort.active || sort.direction === '') {
      this.temp = data;
      return;
    }
  }

}
