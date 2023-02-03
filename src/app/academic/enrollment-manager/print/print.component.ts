import { Component, OnInit } from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { GlobalService } from './../../../global.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {

	url
  constructor(private domSanitizer: DomSanitizer,public dialogRef: MatDialogRef<PrintComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService) {
  }
  
 close(): void {
       this.dialogRef.close({result:'cancel'});
  }
  ngOnInit() {
    var x=''
    for (var i = 0; i < this.data.subjects.length; ++i) {
      x = x+"&foo[]="+
      this.data.subjects[i].codeNo.toUpperCase()+"@-"+
      this.data.subjects[i].subjectID+"@-"+
      this.data.subjects[i].subjectTitle.replace("&", "and")+"@-"+
      this.data.subjects[i].units+"@-"+
      this.data.subjects[i].time+"@-"+
      this.data.subjects[i].day+"@-"+
      this.data.subjects[i].roomNumber+"@-"
    }


    var gender
    if (this.data.gender=='M'||this.data.gender=='m') gender="Male";
    else gender="Female";
  	this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(encodeURI(this.global.acctgApi+'getpdf/getpdf.php?gender='+gender+
      '&name='+this.data.name.toUpperCase()+
      '&idno='+this.data.id+
      '&year='+this.data.year+
      '&course='+this.data.course+
      '&length='+this.data.subjects.length+
      '&major='+this.data.major+
       x+"&sy="+this.global.syDisplay(this.global.syear)));
  }

}
