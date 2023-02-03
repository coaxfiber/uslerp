import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-family-background-familymember',
  templateUrl: './family-background-familymember.component.html',
  styleUrls: ['./family-background-familymember.component.scss']
})
export class FamilyBackgroundFamilymemberComponent implements OnInit {

lname=''
fname=''
mname=''
suffix=''
id=''
yearlevel=''
course=''
image:any = 'assets/noimage.jpg';
checkid=''
constructor(private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http,public dialogRef: MatDialogRef<FamilyBackgroundFamilymemberComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) { 
 

}


  ngOnInit() {
    if (this.data.kind!=1) {
    	this.checkid= this.data.kind;
    	this.id = this.data.kind;
    	this.keyDownFunction('onoutfocus')
    }
  }
 onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }
 save(): void {
   var x='';
   if (this.id == '') {
     x = x + "*ID Number name is required.<br>"
   }else{
   if (this.id != this.checkid) {
     x = x + "*ID Number does not match the ID information. Please check the ID inputed"
   }}
   if(x==''){
      this.http.post(this.global.api+'Student/FamilyMember/'+this.data.id ,{
			  "memberId": this.checkid,
			  "relationship": 2
          },this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.dialogRef.close({result:'saved'});
            this.global.swalSuccess(res.message);
          },Error=>{
            this.global.swalAlertError();
            console.log(Error)
        });
     }else{
       this.global.swalAlert('Required fields!',x,'warning')
     }
  }


  keyDownFunction(event){

  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
  	if (this.id != '') {
    this.global.swalLoading('Loading Student Information');
    this.http.get(this.global.api+'Student/'+this.id+'/'+this.global.syear+'/'+this.global.domain,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.global.swalClose();
          if (res.message=="Student found.") {
              this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
              this.fname=res.data.firstName;
              this.mname=res.data.middleName;
              this.lname=res.data.lastName;
              this.suffix=res.data.suffixName;
              this.yearlevel = res.data.yearOrGradeLevel.toString();
              this.course = res.data.course.toString();
              this.checkid = this.id;
          }else{
	          this.global.swalAlert(res.message,'','warning')
	          this.clear();
          }
          
        },Error=>{
          this.global.swalAlert("Invalid ID Number","",'warning');
        });
      }
    }
  }
  clear(){
  	this.lname=''
	this.fname=''
	this.mname=''
	this.suffix=''
	this.id=''
	this.image = 'assets/noimage.jpg';

    this.checkid = '';
	this.yearlevel=''
	this.course=''
  }
}
