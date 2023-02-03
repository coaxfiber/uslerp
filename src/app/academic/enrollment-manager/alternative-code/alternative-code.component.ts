import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;


@Component({
  selector: 'app-alternative-code',
  templateUrl: './alternative-code.component.html',
  styleUrls: ['./alternative-code.component.scss']
})
export class AlternativeCodeComponent implements OnInit {

	deps = new FormControl()
	departments;
	findby='Descriptive Title';
	exact=true
	string 

  dataSource; 
  tableArr:Array<any>=[];

  data=[]

  displayedColumns = ['codeno', 'subjectid', 'descriptivetitle', 'day', 'time', 'room', 'units','cs','oe','res','department','action'];
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public dialogRef: MatDialogRef<AlternativeCodeComponent>,@Inject(MAT_DIALOG_DATA) public data2: any,public global: GlobalService,private http: Http) { 
 
  }

  ngOnInit() {
    this.data = this.data2.subj;
    console.log(this.data2.subj)
    this.string=this.data2.data.subjectTitle;
    this.searchthis()
  }

 onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }
  select(x,y,a): void {
    if (this.seeclass(a)=='codeorange') {
      this.dialogRef.close({result:x,see:y});
    }else
      this.dialogRef.close({result:x,see:y});
  }

  select2(x,y): void {
    this.dialogRef.close({result:x,see:'bypass'});
  }

  swalConfirm(title,text,type,button,successm,remove,x){
    swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
            this.dialogRef.close({result:x,see:'success'});
        }
      })
  }
  filterby(){
  	console.log(this.deps.value)
  }

  checkbox(){
  	if (this.exact==false)
  	 this.exact=true
  	else
  	this.exact=false
  }

 

  searchthis(){
  	this.tableArr=undefined;
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
  	let x='true'

 		this.http.get(this.global.api+'Enrollment/EnrolledSubjects/'+this.findby+'/'+this.string+'/'+this.global.syear+'/'+x,this.global.option)
                .map(response => response.json())
                .subscribe(res => {

                    for (var i = 0; i < res.data.length; ++i) {
                      if (res.data[i].codeNo==this.data2.data.codeNo) {
                        res.data.splice(i, 1);
                        break
                      }
                    }
                    for (var i = 0; i < res.data.length; ++i) {
                      if (res.data[i].codeNo==this.data2.data.codeNo) {
                        res.data.splice(i, 1);
                        break
                      }
                    }
                    this.tableArr=res.data;
                    this.dataSource = new MatTableDataSource(res.data);
                    this.dataSource.sort = this.sort;
                   // console.log(res.data)
                },Error=>{
                  //console.log(Error);
                  console.log(Error)
  				        this.tableArr=[];
                  this.global.swalClose()
                });
  }seeclass(x){
    //console.log(x)

    var go = 0;
      for (var d = 0; d < this.data.length; ++d) {
        this.data[d].day = this.data[d].day.replace("TH", "U");
        this.data[d].day = this.data[d].day.replace("SAT", "R");
        this.data[d].day = this.data[d].day.replace("SUN", "D");
      }
      x.day = x.day.replace("TH", "U");
      x.day = x.day.replace("SAT", "R");
      x.day = x.day.replace("SUN", "D");

    if ((x.oe+x.res)>=x.classSize) {
      return 'codered';
    }


    var comp1
    var comp2

    if (x.time.substring(5,7)=='AM') {
      comp1 =  parseInt(x.time.substring(0,2) + x.time.substring(3,5));
    }else{
      comp1 = parseInt(x.time.substring(0,2) + x.time.substring(3,5)) + 1200
    }

    if (x.time.substring(13,15)=='AM') {
      comp2 =  parseInt(x.time.substring(8,10) + x.time.substring(11,13));
    }else{
      if (parseInt(x.time.substring(8,10) + x.time.substring(11,13))<1259&&parseInt(x.time.substring(8,10) + x.time.substring(11,13))>=1200) {
        comp2 =  parseInt(x.time.substring(8,10) + x.time.substring(11,13))
      }else
        comp2 =  parseInt(x.time.substring(8,10) + x.time.substring(11,13)) + 1200
    }

    var range1
    var range2

    for (var i = 0; i < this.data.length; ++i) {
          if (this.data[i].time.substring(5,7)=='AM') {
            range1 =  parseInt(this.data[i].time.substring(0,2) + this.data[i].time.substring(3,5));
          }else{
            range1 = parseInt(this.data[i].time.substring(0,2) + this.data[i].time.substring(3,5)) + 1200
          }

          if (this.data[i].time.substring(13,15)=='AM') {
            range2 =  parseInt(this.data[i].time.substring(8,10) + this.data[i].time.substring(11,13));
          }else{
            if (parseInt(this.data[i].time.substring(8,10) + this.data[i].time.substring(11,13))<1259&&parseInt(this.data[i].time.substring(8,10) + this.data[i].time.substring(11,13))>=1200) {
                range2 =  parseInt(this.data[i].time.substring(8,10) + this.data[i].time.substring(11,13));
        
             }else
              range2 =  parseInt(this.data[i].time.substring(8,10) + this.data[i].time.substring(11,13)) + 1200
          }
          if (range1==comp1) {
                    if(this.data[i].day.includes(x.day.charAt(p))){
                        go=1
                    }
          }else if (range1 < comp1){
              if (range2<=comp1) {
              }else{
                for (var p = 0; p <  x.day.length; ++p) {
                    if(this.data[i].day.includes(x.day.charAt(p))){
                        go=1
                    }
                }
              }
          }else if (range1 > comp1){
              if (comp2<=range1) {
              }else{
                for (var p = 0; p <  x.day.length; ++p) {
                      if (this.data[i].codeNo=='') 
                        go=1
                  }
              }
          }
     }
    for (var d = 0; d < this.data.length; ++d) {
      this.data[d].day = this.data[d].day.replace("U", "TH");
      this.data[d].day = this.data[d].day.replace("R", "SAT");
      this.data[d].day = this.data[d].day.replace("D", "SUN");
    }

    if (go==0) {
      return 'normal';
    }
    if (go>0) {
      return 'codeorange';
    }
  }

daydisplay(x){
      x = x.replace("U", "TH");
      x = x.replace("R", "SAT");
      x = x.replace("D", "SUN");
      return x;
}

}
