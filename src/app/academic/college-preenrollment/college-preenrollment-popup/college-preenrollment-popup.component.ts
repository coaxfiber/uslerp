import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { DomSanitizer } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
@Component({
  selector: 'app-college-preenrollment-popup',
  templateUrl: './college-preenrollment-popup.component.html',
  styleUrls: ['./college-preenrollment-popup.component.scss']
})
export class CollegePreenrollmentPopupComponent implements OnInit {

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<CollegePreenrollmentPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }
record
idpicturevar
birthcertvar
popvar
idpicturevarsave
birthcertvarsave
popsave
pdate
encryp
serverdate
ngOnInit() {
	this.Loaddata()
}
  Loaddata() {
    this.global.swalLoading('')
     this.http.get(this.global.api+'PublicAPI/CurrentServerTime',this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        var today:any = new Date(res.data);
        var dd = String(today.getDate()-1).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        this.serverdate = today

  	    this.http.get(this.global.api+'Enrollment/PreEnrollment/SubmittedRequirement/'+this.global.checknosemester(this.global.syear)+'?idNumber='+this.data.data.idNumber,this.global.option)
              .map(response => response.json())
              .subscribe(res => {

              	this.record=res.data
		        this.idpicturevar="data:image/png;base64,"+res.data[0].idPicture
		        this.birthcertvar="data:image/png;base64,"+res.data[0].birthCert
		        this.popvar="data:image/png;base64,"+res.data[0].proofOfPayment
		        this.idpicturevarsave=res.data[0].idPicture
		        this.birthcertvarsave=res.data[0].birthCert
		        this.popsave=res.data[0].proofOfPayment
		        this.pdate = res.data[0].dateOfPayment
		        
                  this.http.get(this.global.api+'Enrollment/EncryptedString/'+this.data.data.idNumber,this.global.option)
			        .map(response => response.json())
			        .subscribe(res => {
			          this.encryp=res.data
			          this.http.get(this.global.acctgApi+'getphpfile/acctgapis.php?action=VerifyPreEnrollment&en='+encodeURIComponent(this.encryp)+'&year='+encodeURIComponent(this.serverdate.substring(this.serverdate.length - 4)))
			              .map(response => response.json())
			              .subscribe(res => {
			              	if (res.data) {
			                  var pdate
					          pdate = new Date(this.pdate).toLocaleString();
					          this.http.put(this.global.api+'Enrollment/PreEnrollment/SubmittedRequirement/'+this.data.data.idNumber+'/'+this.global.checknosemester(this.global.syear),{
					          "IdPicture": this.idpicturevarsave,
					          "IdPictureStatus": this.record[0].idPicture_Status,
					          "IdPictureRemarks": this.record[0].idPicture_Remarks,
					          "BirthCert": this.birthcertvarsave,
					          "BirthCertStatus": this.record[0].birthCert_Status,
					          "BirthCertRemarks": this.record[0].birthCert_Remarks,
					          "ProofOfPayment": this.popsave,
					          "ProofOfPaymentStatus": 2,
					          "ProofOfPaymentRemarks": this.record[0].birthCert_Remarks,
					          "DateOfPayment": pdate,
					          "PaymentType": 1
					        },this.global.option)
					          .map(response => response.json())
					          .subscribe(res => {
		        	            this.check=1
					            this.record[0].proofOfPayment_Status=2
                				this.global.swalClose()
					          },Error=>{
					             this.global.swalAlertError(Error)
					            });
			                }else{
                				this.global.swalClose()
			                }
			              },Error=>{
			                window.history.back();
			                this.global.swalAlert("Server not found!","ACCOUNTING SERVER MAY NOT BE AVAILABLE!",'warning');
			                });
			         },Error=>{
			            window.history.back();
			            this.global.swalAlert("Server not found!","ACCOUNTING SERVER MAY NOT BE AVAILABLE!",'warning');
			          });
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError(Error);
              });
       },Error=>{
                //console.log(Error);
                this.global.swalAlertError(Error);
                console.log(Error)
              });
  }

  opennewpic(x){
    const base64ImageData = x;
	const contentType = 'image/png';

	const byteCharacters = atob(base64ImageData.substr(`data:${contentType};base64,`.length));
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
	    const slice = byteCharacters.slice(offset, offset + 1024);

	    const byteNumbers = new Array(slice.length);
	    for (let i = 0; i < slice.length; i++) {
	        byteNumbers[i] = slice.charCodeAt(i);
	    }

	    const byteArray = new Uint8Array(byteNumbers);

	    byteArrays.push(byteArray);
	}
	const blob = new Blob(byteArrays, {type: contentType});
	const blobUrl = URL.createObjectURL(blob);

	window.open(blobUrl, '_blank');
  }
  verification(id){
  	var x = ''

  	if(this.global.checkaccess(':Enrollment:PreEnrollmentSubmittedReqOSASPut')){
  		if (this.record[0].idPicture_Status===0) {
  			x=x+'*ID Picture status is required<br>'
  		}
  		if (this.record[0].idPicture_Status===1&& (this.record[0].idPicture_Remarks==''||this.record[0].idPicture_Remarks==null)) {
  			x=x+'*ID Picture remark is required<br>'
  		}
  		if (this.record[0].birthCert_Status===0) {
  			x=x+'*Birth Certificate status is required<br>'
  		}
  		if (this.record[0].birthCert_Status===1&& (this.record[0].birthCert_Remarks==''||this.record[0].birthCert_Remarks==null)) {
  			x=x+'*Birth Certificate remark is required<br>'
  		}
  	}

  	if(this.global.checkaccess(':Enrollment:PreEnrollmentSubmittedReqAcctgPut')){

  		if (this.record[0].proofOfPayment_Status===0) {
  			x=x+'*Payment status is required<br>'
  		}
  		if (this.record[0].proofOfPayment_Status===1&& (this.record[0].proofOfPayment_Remarks==''||this.record[0].proofOfPayment_Remarks==null)) {
  			x=x+'*Payment remark is required<br>'
  		}
  	}
  	if(x==''){
	  	this.global.swalLoading('')
	  	if(this.global.checkaccess(':Enrollment:PreEnrollmentSubmittedReqOSASPut')){
	  	  this.http.put(this.global.api+'Enrollment/PreEnrollment/SubmittedRequirement/OSAS/'+ id +'/'+this.global.checknosemester(this.global.syear),
	  	  	{
		  	  "IdPicture": this.idpicturevarsave,
			  "IdPictureStatus": this.record[0].idPicture_Status,
			  "IdPictureRemarks": this.record[0].idPicture_Remarks,
			  "BirthCert": this.birthcertvarsave,
			  "BirthCertStatus":this.record[0].birthCert_Status,
			  "BirthCertRemarks": this.record[0].birthCert_Remarks,
			  "ProofOfPayment": this.popsave
	  	  	},this.global.option)
		        .map(response => response.json())
		        .subscribe(res => {
		        	if (this.record[0].idPicture_Status==2&&this.idpicturevarsave!='') {
		        		this.http.put(this.global.api+'Student/Picture/'+ id ,
	  	  					{
							  "IdPicture":  this.idpicturevarsave,
							},this.global.option)
					        .map(response => response.json())
					        .subscribe(res => {
					        },Error=>{
				            this.global.swalAlertError(Error);
				          });
		        	}
		        	this.global.swalSuccess(res.message)
		        	this.check=1
		       },Error=>{
	            this.global.swalAlertError(Error);
	          });

	  	}
	  	if(this.global.checkaccess(':Enrollment:PreEnrollmentSubmittedReqAcctgPut')){
	  		this.http.put(this.global.api+'Enrollment/PreEnrollment/SubmittedRequirement/Acctg/'+ id +'/'+this.global.checknosemester(this.global.syear) ,
	  	  	{
			  "ProofOfPayment":this.popsave,
			  "ProofOfPaymentStatus": this.record[0].proofOfPayment_Status,
			  "ProofOfPaymentRemarks":this.record[0].proofOfPayment_Remarks
			},this.global.option)
		        .map(response => response.json())
		        .subscribe(res => {
		        	this.global.swalSuccess(res.message)
		        	this.check=1
		       },Error=>{
	            this.global.swalAlertError(Error);
	            console.log(Error)
	          });
	  	}
	  }else{
	  	this.global.swalAlert("Required fields warning!",x,'warning')
	  }
  }

  check=0
	onNoClick(): void {

	    this.dialogRef.close(this.check);
	  }
}
