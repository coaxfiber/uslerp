import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../../global.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
const swal = Swal;
@Component({
  selector: 'app-loading-applicant-text-blast',
  templateUrl: './loading-applicant-text-blast.component.html',
  styleUrls: ['./loading-applicant-text-blast.component.css']
})
export class LoadingApplicantTextBlastComponent implements OnInit {	
  percent=0
  sent=0
  failed=0
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<LoadingApplicantTextBlastComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) {

  }

  ngOnInit() {
  	if (this.data.type==0) {
		this.sendTexts(0)
  	}else{
 		this.getHistory()
  	}
  }
  array=[]
  getHistory(){
  	this.global.swalLoading('')
	this.http.get(this.global.api+'OnlineRegistration/Payment/FollowUpSMSHist/'+this.global.checknosemester(this.global.syear)+"?applicantNo="+this.data.applicantNo,this.global.option)
	     .map(response => response.json())
	     .subscribe(res => {
	     	console.log(res)
	        this.array=res.data
	        this.global.swalClose()
	     },Error=>{
	        this.global.swalAlertError(Error)
	     });
  }

  close(): void {
       this.dialogRef.close({result:'cancel'});
  }
  sendTexts(i){
  	if (i<this.data.data.length) {
  	this.http.get(this.global.acctgApi+'getphpfile/Applicant-textBlast-reminder.php?'
        +"cpnumber="+this.data.data[i].contactNumber
        +"&firstname="+this.data.data[i].firstName
        +"&middlename="+this.data.data[i].middleName
        +"&lastname="+this.data.data[i].lastName
        )
        .map(response => response.text())
        .subscribe(res => {
        	var succ=0
        	var sent=res

        	if(res=='Message Sent!')
        		succ=1
            this.http.post(this.global.api+'OnlineRegistration/Payment/FollowUpSMSHist',{
              "ApplicantNo": this.data.data[i].applicantNo,
			  "DateSent": new Date,
			  "Success": succ,
			  "Remarks": res,
			  "SchoolYear": this.global.checknosemester(this.global.syear)
            },this.global.option)
            .map(response => response.json())
            .subscribe(res => {
        		if(sent=='Message Sent!')
            		this.sent++
            	else
            		this.failed++

            	this.percent++
              	this.sendTexts(++i)
              },Error=>{
              	this.sendTexts(++i)
            	this.failed++
            	this.percent++
            });
        },Error=>{
          	this.sendTexts(++i)
        	this.failed++
        	this.percent++
        });	
  	 
  		// code...
  	}else{
  		 swal.fire({
            title: "Text Blast Summary!",
            html:'Success: '+this.sent+"<br>Failed: "+this.failed,
            type:'info',
            confirmButtonText: `OK`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            this.dialogRef.close({result:'save'});
          })
  		
  	}
  }

}
