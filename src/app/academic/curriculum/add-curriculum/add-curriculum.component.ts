import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import Swal from 'sweetalert2';
const swal = Swal;
import { EmployeeLookupComponent } from './../../../academic/lookup/employee-lookup/employee-lookup.component';


@Component({
  selector: 'app-add-curriculum',
  templateUrl: './add-curriculum.component.html',
  styleUrls: ['./add-curriculum.component.scss']
})
export class AddCurriculumComponent implements OnInit {
progid=''
progtitle=''

coursecode=''
version=''
major=''
amajor=''
proglevel=''
progstatus=''
progdisc=''
examlevel=''
accre=''
strand=''
prognormallength=''
dept=''
feetype=''
progchair=''
projactive=''
gstrand=''
active=''

arrayproglevel
arrayprogstatus
arrayprogdisc
arrayprogexamlevel
arrayprogaccre
arraystrand
arrayprognormallength
arraydept

	program
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<AddCurriculumComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public global: GlobalService,private http: Http) { }

  ngOnInit() {
  	if (this.data.data==1) {
  		this.proglevel = this.global.domain
  	}else{
  		console.log(this.data.array)
		this.http.get(this.global.api+'Curriculum/'+this.data.array.programId,this.global.option)         .map(response => response.json())
          .subscribe(res => {
          	this.proglevel = res.data.departmentGroup
    	  		this.progid=res.data.programId
      			this.progtitle=res.data.programTitle
      			this.coursecode=res.data.courseCode
      			this.version=res.data.version
      			this.major=res.data.major
      			this.amajor =res.data.abbreviatedMajor
      			this.proglevel =res.data.programLevel
      			this.progstatus=res.data.statusCode
      			this.progdisc =res.data.programDiscipline
      			this.examlevel =res.data.examLevel
      			this.accre =res.data.accreditationCode
      			this.strand  =res.data.strand
      			this.prognormallength =res.data.programNormalLengthCode
      			this.dept=res.data.departmentId
      			this.feetype  =res.data.feeType
      			this.progchair =res.data.programChair
      			this.projactive =res.data.projectActive
      			this.gstrand  =res.data.gStrand
      			this.active =res.data.active
          	console.log(res)
          });
  		
  	}
         this.http.get(this.global.api+'/Curriculum/Courses/'+this.proglevel,this.global.option)         .map(response => response.json())
          .subscribe(res => {
            this.program=[];
            if (res.data!=null) { 
              this.program=res.data;
            }
            //console.log(res.data)
          },Error=>{
            console.log(Error)
            this.program=[];
          });

         this.http.get(this.global.api+'/Curriculum/ProgramLevel',this.global.option)         .map(response => response.json())
          .subscribe(res => {
            this.arrayproglevel=[]
            if (res.data!=null) { 
              this.arrayproglevel=res.data;
            }
          	//console.log(res.data)
          },Error=>{
            console.log(Error)
            this.arrayproglevel=[]
          });
         this.http.get(this.global.api+'/Curriculum/ProgramStatus',this.global.option)         .map(response => response.json())
          .subscribe(res => {
            this.arrayprogstatus=[]
            if (res.data!=null) { 
              this.arrayprogstatus=res.data;
            }
            //console.log(res.data)
          },Error=>{
            console.log(Error)
            this.arrayprogstatus=[]
          });

         this.http.get(this.global.api+'/Curriculum/ProgramDiscipline',this.global.option)         .map(response => response.json())
          .subscribe(res => {
            this.arrayprogdisc=[]
            if (res.data!=null) { 
              this.arrayprogdisc=res.data;
            }
          },Error=>{
            console.log(Error)
            this.arrayprogdisc=[]
          });
         

         this.http.get(this.global.api+'/Curriculum/ExamLevelMatrix',this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.arrayprogexamlevel=[]
            if (res.data!=null) { 
              this.arrayprogexamlevel=res.data;
            }
          },Error=>{
            console.log(Error)
              this.arrayprogexamlevel=[]
          });
         

         this.http.get(this.global.api+'/Curriculum/Accreditation',this.global.option)         .map(response => response.json())
          .subscribe(res => {
            this.arrayprogaccre=[]
            if (res.data!=null) { 
              this.arrayprogaccre=res.data;
            }
          },Error=>{
            console.log(Error)
            this.arrayprogaccre=[]
          });

         this.http.get(this.global.api+'/Curriculum/Strand',this.global.option)         .map(response => response.json())
          .subscribe(res => {
             this.arraystrand=[]
            if (res.data!=null) { 
              this.arraystrand=res.data;
            }
            //console.log(res.data)
          },Error=>{
            console.log(Error)
             this.arraystrand=[]
          });

         this.http.get(this.global.api+'/Curriculum/ProgramNormalLength',this.global.option)         .map(response => response.json())
          .subscribe(res => {
             this.arrayprognormallength=[]
            if (res.data!=null) { 
              this.arrayprognormallength=res.data;
            }
          },Error=>{
            console.log(Error)
             this.arrayprognormallength=[]
          });


          this.http.get(this.global.api+'/PublicAPI/Departments',this.global.option)         .map(response => response.json())
          .subscribe(res => {
              this.arraydept=res;
          },Error=>{
            console.log(Error)
            this.arraydept=[]
          });
  }

   close(): void {
       this.dialogRef.close({result:'cancel'});
  }


  curriculumpost(){
  				var y = ''
          		if (this.progid == '') {
          			y=y+"*Program ID is Required!<br>"
          		}
          		if (this.progtitle == '') {
          			y=y+"*Program Title is Required!<br>"
          		}
              if (this.coursecode == '') {
                y=y+"*Course Code is Required!<br>"
              }
          		if (this.proglevel == '') {
          			y=y+"*Program level is Required!<br>"
          		}
          		if (this.version == '') {
          			y=y+"*Version is Required!<br>"
          		}
          		if (this.accre == '') {
          			y=y+"*Accreditaion is Required!<br>"
          		}
          		if (this.progstatus == '') {
          			y=y+"*Program status is Required!<br>"
          		}
          		if (this.prognormallength == '') {
          			y=y+"*Program Normal length is Required!<br>"
          		}
          		if (this.dept == '') {
          			y=y+"*Department is Required!<br>"
          		}
          		if (this.active == '') {
          			y=y+"*Active is Required!<br>"
          		}
          		if (this.progchair == '') {
          			y=y+"*Program Chair is Required!<br>"
          		}
          		if (y!='') {
          			this.global.swalAlert("Field Required Alert!",y,"warning")
          		}else
          this.http.get(this.global.api+'Curriculum/'+this.progid,this.global.option)         .map(response => response.json())
          .subscribe(res => {
          	if (res.data==null) {  
          	 	var exlvl
          		if (this.examlevel=='') {
          			exlvl = null;
          		}else 
          			exlvl=this.examlevel
		          	this.http.post(this.global.api+'Curriculum',{
			         	  "programId": this.progid,
						  "programTitle": this.progtitle,
						  "courseCode": this.coursecode,
						  "major": this.major,
						  "programLevel": this.proglevel,
						  "programDiscipline": this.progdisc,
						  "version": this.version,
						  "accreditationCode": this.accre,
						  "statusCode": this.progstatus,
						  "progNor": this.prognormallength,
						  "department": this.dept,
						  "feeType": this.feetype,
						  "abbreviatedMajor": this.amajor,
						  "active": this.active,
						  "examLevel": exlvl,
						  "programChair": this.progchair,
						  "projectActive": this.projactive,
						  "strand": parseInt(this.strand),
						  "gStrand": parseInt(this.gstrand),
		         	},this.global.option)
		                  .map(response => response.json())
		          .subscribe(res => {
		          	this.global.swalSuccess(res.message)
		          	this.dialogRef.close({result:'saved',data:this.progid});
		          },Error=>{
		            console.log(Error)
		            this.global.swalAlertError()
		          });
          	}else{
          		this.global.swalAlert("Program ID already exist!",res.data.programId+" - "+res.data.programTitle,"warning")
          	}
          },Error=>{
            console.log(Error)
          });
  }

    curriculumput(){
  				var y = ''
          		if (this.progid == ''||this.progid == null) {
          			y=y+"*Program ID is Required!<br>"
          		}
          		if (this.progtitle == ''||this.progtitle == null) {
          			y=y+"*Program Title is Required!<br>"
          		}
          		if (this.coursecode == ''||this.coursecode == null) {
          			y=y+"*Course Code is Required!<br>"
          		}
          		if (this.proglevel == ''||this.proglevel == null) {
          			y=y+"*Program level is Required!<br>"
          		}
          		if (this.version == ''||this.version == null) {
          			y=y+"*Version is Required!<br>"
          		}
          		if (this.accre == ''||this.accre == null) {
          			y=y+"*Accreditaion is Required!<br>"
          		}
          		if (this.progstatus == ''||this.progstatus == null) {
          			y=y+"*Program status is Required!<br>"
          		}
          		if (this.prognormallength == ''||this.prognormallength == null) {
          			y=y+"*Program Normal length is Required!<br>"
          		}
          		if (this.dept == ''||this.dept == null) {
          			y=y+"*Department is Required!<br>"
          		}
          		if (this.active == ''||this.active == null) {
          			y=y+"*Active is Required!<br>"
          		}
          		if (this.progchair == ''||this.progchair == null) {
          			y=y+"*Program Chair is Required!<br>"
          		}
          		if (y!='') {
          			this.global.swalAlert("Field Required Alert!",y,"warning")
          		}else{
	          	 	var exlvl
	          		if (this.examlevel=='') {
	          			exlvl = null
	          		}else 
          			exlvl=this.examlevel
          			console.log(this.prognormallength)
		          	this.http.put(this.global.api+'Curriculum/'+this.progid,{
			         	  "programId": this.progid,
    						  "programTitle": this.progtitle,
    						  "courseCode": this.coursecode,
    						  "major": this.major,
    						  "programLevel": this.proglevel,
    						  "programDiscipline": this.progdisc,
    						  "version": this.version,
    						  "accreditationCode": this.accre,
    						  "statusCode": this.progstatus,
    						  "progNor": this.prognormallength,
    						  "department": this.dept,
    						  "feeType": this.feetype,
    						  "abbreviatedMajor": this.amajor,
    						  "active": this.active,
    						  "examLevel": exlvl,
    						  "programChair": this.progchair,
    						  "projectActive": this.projactive,
    						  "strand": parseInt(this.strand),
    						  "gStrand": parseInt(this.gstrand),
		         	},this.global.option)
		                  .map(response => response.json())
		          .subscribe(res => {
		          	this.global.swalSuccess(res.message)
		          	this.dialogRef.close({result:'updated',data:this.progid});
		          },Error=>{
		            console.log(Error)
		            this.global.swalAlertError()
		          });
          	}
          	console.log(y)
  }

   emplookup(): void {
        const dialogRef = this.dialog.open(EmployeeLookupComponent, {
          width: '600px', disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            this.progchair = result.result;
            //this.keyDownFunction('onoutfocus')
          }
        });
      }


}
