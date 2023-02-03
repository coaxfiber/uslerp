import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';

@Component({
  selector: 'app-add-sets',
  templateUrl: './add-sets.component.html',
  styleUrls: ['./add-sets.component.scss']
})
export class AddSetsComponent implements OnInit {
 	proglevel='';
  	yeardrop=[];
  	yearlevel=''
  	dept=''
    programid=''
    sy=''
    inactive=1;
    active=0;
    valact='0';
    tempdepartment;
    tempprogramid
    tempyear

    activate1=true
    activate2=true
  constructor(public dialogRef: MatDialogRef<AddSetsComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

   setsheaders
   setsheaders2
   departments=[]
   departmentsarray=[];
   arraycourses=[];
  sylist=[]

 setactive(){
 	this.inactive=0;
    this.active=1;
    this.valact='1';
 }
 setinactive(){
 	  this.inactive=1;
    this.active=0;
    this.valact='0';
 }
  ngOnInit() {
  	if (this.data.data===0) {
  		
  		this.http.get(this.global.api+'Code/Curriculum/'+this.data.set.programId,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.tempdepartment=res.data[0].departmentId
            this.tempprogramid=res.data[0].programId
            this.tempyear = this.data.set.yearLevel.toString();
          	if (res.data[0].departmentGroup=="GS") {
          		this.proglevel ="GRADUATE SCHOOL"
          	}else
          		this.proglevel ="COLLEGE";
        	    this.loadyears(this.proglevel)

          	this.sy=this.data.syear;
          	if (this.data.set.status=='False') {
    			 	  this.inactive=1;
    			    this.active=0;
    			    this.valact='0';
            }else{	
    			 	  this.inactive=0;
    			    this.active=1;
    			    this.valact='1';
             }
          	this.http.get(this.global.api+'PublicAPI/Departments',this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                   this.departmentsarray=res
                   this.getdepts()
                  },Error=>{
                    console.log(Error)
                  });
            this.http.get(this.global.api+'Maintenance/SYOptionsList',this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.sylist=res.data
                  },Error=>{
                     this.global.swalAlertError();
                  });
          },Error=>{
            console.log(Error)
          });
  	}else{
      this.sy=this.data.syear
      this.http.get(this.global.api+'PublicAPI/Departments',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
           this.departmentsarray=res
           //console.log(res)
          },Error=>{
            console.log(Error)
          });
    this.http.get(this.global.api+'Maintenance/SYOptionsList',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.sylist=res.data
          },Error=>{
             this.global.swalAlertError();
          });
    }

    
  }
activate(x){
this.sy=x
}
  getdepts(){
    var x='';
    this.departments=[];
  	for (var i = 0; i < this.departmentsarray.length; ++i) {

    if (this.proglevel=="COLLEGE") {
      if (this.departmentsarray[i].departmentGroup=='College') {
        this.departments.push({departmentId:this.departmentsarray[i].departmentId,departmentName:this.departmentsarray[i].departmentName})
      }
    }
    if (this.proglevel=="GRADUATE SCHOOL") {
      if (this.departmentsarray[i].departmentGroup=='GS') {
        this.departments.push({departmentId:this.departmentsarray[i].departmentId,departmentName:this.departmentsarray[i].departmentName})
      }
    }


  		}

    if (this.data.data==0) {
      this.dept = this.tempdepartment;
    }
    this.getcourses()
  }
getcourses(){
  if (this.dept!=''&&this.yearlevel!='') {

   this.http.get(this.global.api+'Admission/Courses/'+this.proglevel+'/'+this.dept+'/'+this.yearlevel,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            
            this.activate2=false
            this.arraycourses = [];
            this.arraycourses = res.data;
            if (this.data.data.length==0) {
              this.programid = this.tempprogramid;
            }

          },Error=>{
            //console.log(Error);
            console.log(Error)
         });
     }
    }

callgetcourse(x){
  this.dept = x
  this.getcourses()
}callgetcourse2(x){
  this.yearlevel = x.toString()
  this.getcourses()
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
  loadyears(proglevel){
    this.activate1=false
    this.yearlevel=''
    this.dept='';
      this.programid='';
    if (this.data.data==0) {
      this.programid=this.data.set.programId
    }
    this.arraycourses = [];
    if (proglevel=="GRADUATE SCHOOL") {
      this.yeardrop = [{year: 1,name: 1},{year: 2,name: 2}];
    }else if (proglevel=="COLLEGE") {
      this.yeardrop = [{year: 1,name: 1},{year: 2,name: 2},{year: 3,name: 3},{year: 4,name: 4},{year: 5,name: 5}];
    }else if (proglevel=="HIGHSCHOOL") {
      this.yeardrop = [{year: '1',name: 'Grade 7'},{year: '2',name: 'Grade 8'},{year: '3',name: 'Grade 9'},{year: '4',name: 'Grade 10'},{year: '5',name: 'Grade 11'},{year: '6',name: 'Grade 12'}];
    }else if (proglevel=="ELEMENTARY") {
      this.yeardrop = [{year: 'P',name:'Pre-School'},{year: '0',name:'K'},{year: '1',name:'1'},{year: '2',name:'2'},{year: '3',name:'4'},{year: '4',name:'4'},{year: '5',name:'5'},{year: '6',name:'6'}];
    }

    if (this.data.data==0) {
       this.yearlevel = this.tempyear;
    }
    this.getdepts();

  }


 close(): void {
       this.dialogRef.close({result:'cancel'});
  }
 save(): void {
 	if (this.programid!=''&&this.yearlevel!=''&&this.sy!='') {
     if (this.data.data==0) {  
       this.http.put(this.global.api+'Code/SetHeader/'+ this.data.set.headerId,{
              "headerId": this.data.set.headerId,
              "programID": this.programid,
              "yearLevel": this.yearlevel,
              "schoolYear": this.sy,
              "status": this.valact
              },this.global.option)
                    .map(response => response.json())
                    .subscribe(res => {
                     this.global.swalSuccess(res.message) 
                     if (this.data.data==0) {
                     this.dialogRef.close({result:'update',val:this.sy}); 
                     }  else
                     this.dialogRef.close({result:'save',val:this.sy}); 
                   },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      console.log(Error)
                    });
            }else{
         		this.http.post(this.global.api+'Code/SetHeader' ,{
        		  "programID": this.programid,
        		  "yearLevel": this.yearlevel,
        		  "schoolYear": this.sy,
        		  "status": this.valact
        	    },this.global.option)
        	          .map(response => response.json())
        	          .subscribe(res => {
        		       	this.global.swalSuccess(res.message) 
        	       		this.dialogRef.close({result:'save',val:this.sy});   
        		       },Error=>{
        	            //console.log(Error);
        	            this.global.swalAlertError();
        	            console.log(Error)
        	          });
          }
 	}else
 	this.global.swalAlert('Fill all required fields','','warning')
 	
  }
}
