import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-placement-reportcard',
  templateUrl: './placement-reportcard.component.html',
  styleUrls: ['./placement-reportcard.component.css']
})
export class PlacementReportcardComponent implements OnInit {

  constructor(private domSanitizer: DomSanitizer,private http: Http,public dialog: MatDialog,public dialogRef: MatDialogRef<PlacementReportcardComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService) { }

  vitnvit
  attachment
  preference
  courses=[]
  url
  gResult
  ngifattach=null
  ngOnInit() {
    console.log(this.data.data)
    this.gResult=this.data.gResult
    this.vitnvit=this.data.vitnvit
    this.preference=this.data.preference
    this.courses=[]
     var c=this.data.preference.preferredCourse
    if (this.data.type==1) {
     this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(encodeURI(this.global.acctgApi+"getphpfile/exports/pdf_fm_gcc_304.php?idno="+this.data.idno+"&mname=&fname="+this.data.name.toUpperCase()+"&lname=&sname=&course="+c+"&strandcode="+this.data.strand))
    }else
    if (this.data.type==2) {
     this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(encodeURI(this.global.acctgApi+"getphpfile/exports/pdf_fm_gcc_314.php?idno="+this.data.idno+"&mname=&fname="+this.data.name.toUpperCase()+"&lname=&sname=&course="+c+"&strandcode="+this.data.strand+"&VIT="+this.data.vit+"&NVIT="+this.data.nvit))
    }else{
     this.attachment=null
     if (this.data.data!=undefined) {
       this.http.get(this.global.api+'OnlineRegistration/Applicant/'+this.global.syear+"/"+this.data.data.applicantNo)
         .map(response => response.json())
         .subscribe(res => {
           this.ngifattach = res.data[0].reportCard
           this.attachment = this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+res.data[0].reportCard)
         });
     }
    }

    
    for (var i = 0; i < this.data.courses.length; ++i) {
      if (this.data.gResult.departmentId==this.data.courses[i].departmentId) {
       this.courses.push(this.data.courses[i])
      }
    }
  }

  close(): void {
       this.dialogRef.close({result:'cancel'});
  }
  opennew(){
  	let data = this.attachment;
  	let w = window.open('about:blank');
  	let image = new Image();
  	image.src = data;
  	setTimeout(function(){
  	  w.document.write(image.outerHTML);
  	}, 0);
  }

  checkresult(x){
    for (var i = 0; i < this.vitnvit.length; ++i) {
      if (this.vitnvit[i].courseCode==x) {
        if ((this.preference.vit==0||this.preference.nvit==0)||(this.preference.vit==null||this.preference.vit==null)||(this.preference.vit==''||this.preference.vit=='')) {
          return '- vit/nvit not set -'
        }
        if (this.preference.vit==1&&this.preference.nvit==1) {
          return 'Not Qualified'
        }else 
        if (this.vitnvit[i].vit>=this.preference.vit||this.vitnvit[i].nVit>=this.preference.nvit) {
          return 'Recommended'
        }else{
          return 'Passed'
        }
      }
    }
    return '- No data in database -'
  }
}

