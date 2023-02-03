import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewEncapsulation } from '@angular/core';
//import jsPDF from 'jspdf';

import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

//import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CVComponent implements OnInit {

	idnum
	image
	name
	position
	email
	address
	contact

	seminarsArr
	workXPArr

  constructor(public dialogRef: MatDialogRef<CVComponent>,private domSanitizer: DomSanitizer,
  	@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private global: GlobalService,private http: Http) { }

	@ViewChild('content') content:ElementRef;

  ngOnInit() {
  	this.idnum = this.data.selectedID;
  	this.image = this.data.empPicture;
  	this.name = this.data.name;
  	this.position = this.data.position;
  	this.email = this.data.info.emailAdd;
  	this.contact = this.data.info.telno;
  	this.address = this.data.address;
  	this.seminarsArr = this.data.SnA;
  	this.workXPArr = this.data.workXP;
  	//console.log(this.email);
  }

  onNoClickclose(): void {
    this.dialogRef.close({result:'cancel'});
  }
 
  save(): void {
  	
    const content:Element = document.getElementById('ContenttoExport');
    const options = {
    	margin: [50, 0, 0, 0],
    	filename: 'CV.pdf',
    	html2canvas: {},
    	image: {type:'jpeg'},
    	jsPDF: {unit: 'in', format: 'letter', orientation: 'portrait'},
    	//pagebreak: { mode: 'avoid-all', before: '#page2el' },
    	pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    	//pagebreak: { before: '.beforeClass', after: ['#after1', '#after2'], avoid: 'img' }
    	pdfCallback: pdfCallback
    };

    function pdfCallback(pdfObject) {
    	//console.log("dto ako")
	    var number_of_pages = pdfObject.internal.getNumberOfPages()
	    var pdf_pages = pdfObject.internal.pages
	    var myFooter = "University of Saint Louis Tuguegarao"
	    for (var i = 1; i < pdf_pages.length; i++) {
	        // We are telling our pdfObject that we are now working on this page
	        pdfObject.setPage(i)
	        //pdfObject.setFontSize(10);
	        //pdfObject.setTextColor(128,128,128)
	        //pdfObject.text("University of Saint Louis Tuguegarao", 10, 5)
	        pdfObject.setFontSize(10);
	        pdfObject.text(myFooter, 10, 292);
	        pdfObject.text("Page "+i,182,292);
	    }
	  }

      html2pdf().set(options).from(content);
      html2pdf().from(content).toPdf().get('pdf').then(function (options) {
      	// pdfObj has your jsPDF object in it, use it as you please!
      	pdfCallback(options);
  	    window.open(options.output('bloburl'), '_blank');
  	});
  }
}
