import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';

@Component({
  selector: 'app-person-assign-applicant',
  templateUrl: './person-assign-applicant.component.html',
  styleUrls: ['./person-assign-applicant.component.scss']
})
export class PersonAssignApplicantComponent implements OnInit {
 warning=''
  array=[]
  arraydis=[]
  search=''
  constructor(public dialogRef: MatDialogRef<PersonAssignApplicantComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.loaddata()
  }
	close(): void {
       this.dialogRef.close({result:'cancel'});
  }
  checkthis(x){
       this.dialogRef.close({result:x});
  }

style(x){
  if (x){
    return 'red'
  }else
    return 'green'
}
  loaddata(){
  	var text
    var syear = this.global.checknosemester(this.global.syear)
  	if (this.global.domain=="ELEMENTARY") {
  		text=this.global.api+'OnlineRegistration/Applicant/Find?schoolYear='+syear+'&includeAll=1&programLevel=01&eProgramLevel=03';
  	}
  	if (this.global.domain=="HIGHSCHOOL") {
  		text=this.global.api+'/OnlineRegistration/Applicant/Find?schoolYear='+syear+'&includeAll=1&programLevel=04&eProgramLevel=05';
  	}
  	if (this.global.domain=="COLLEGE") {
  		text=this.global.api+'/OnlineRegistration/Applicant/Find?schoolYear='+syear+'&includeAll=1&programLevel=06&eProgramLevel=06';
  	}
  	if (this.global.domain=="GRADUATE SCHOOL") {
  		text=this.global.api+'/OnlineRegistration/Applicant/Find?schoolYear='+syear+'&includeAll=1&programLevel=07&eProgramLevel=07';
  	}
    this.arraydis=undefined
    this.http.get(text,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.global.swalClose();
          this.arraydis=[]
          this.array=[]
          console.log(res)
          for (var i = 0; i < res.data.length; ++i) {
            if (res.data[i].idNumber==null||res.data[i].idNumber=='') {
              this.array.push(res.data[i])
              this.arraydis.push(res.data[i])
            }
          }
        },Error=>{
		      this.arraydis=[]
          this.array=[]
          this.global.swalAlertError();
        });
  }
keyDownFunction(event){
     this.arraydis=[]
      if (this.search!='') {
        for (var i = 0; i < this.array.length; ++i) {
            if ((this.array[i].firstName+this.array[i].middleName+this.array[i].lastName).toLowerCase().replace(/\s/g, "").replace(/,/g, "").includes(this.search.toLowerCase().replace(/,/g, "").replace(/\s/g, ""))) {
              this.arraydis.push(this.array[i])
            }
        }
      }else{
        this.arraydis= this.array
      }
}
}
