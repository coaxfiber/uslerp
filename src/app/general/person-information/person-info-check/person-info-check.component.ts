import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
@Component({
  selector: 'app-person-info-check',
  templateUrl: './person-info-check.component.html',
  styleUrls: ['./person-info-check.component.scss']
})
export class PersonInfoCheckComponent implements OnInit {
  warning=''
  array=[]
  arraydis=[]
  search=''
  constructor(public dialogRef: MatDialogRef<PersonInfoCheckComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private global: GlobalService,private http: Http) { }

  ngOnInit() {
  	this.loadduplicate()
  }
	close(): void {
       this.dialogRef.close({result:'cancel'});
  }

  loadduplicate(){
  	this.global.swalLoading('');
    this.array=undefined
    this.arraydis=[]
    this.http.get(this.global.api+'Person/Lookup/'+this.data.lname+"/true",this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.global.swalClose();
          console.log(res.data[0])
          this.array=res.data[0]
          this.arraydis=res.data[0]
          if (res.data==null) {
            this.warning=res.message
          }else{
            if (res.data[0].length==0) {
              this.warning="- No Data -"
            }
          }

        },Error=>{
          this.array=[]
          this.global.swalAlertError();
        });
  }
keyDownFunction(event){
     this.arraydis=[]
      if (this.search!='') {
        for (var i = 0; i < this.array.length; ++i) {
            if (this.array[i].fullName.toLowerCase().replace(/\s/g, "").replace(/,/g, "").includes(this.search.toLowerCase().replace(/,/g, "").replace(/\s/g, ""))) {
              this.arraydis.push(this.array[i])
            }
        }
      }else{
        this.arraydis= this.array
      }
}
}
