import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';

import { DomSanitizer } from '@angular/platform-browser';
import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MappingComponent } from './../student-evaluation/mapping/mapping.component';
import Swal from 'sweetalert2';
const swal = Swal;

@Component({
  selector: 'app-student-evaluation',
  templateUrl: './student-evaluation.component.html',
  styleUrls: ['./student-evaluation.component.scss']
})
export class StudentEvaluationComponent implements OnInit {
	data=undefined
	progid=''
  progid2=''
	tabledata=[]
	tableArr=[]
	id=''
  stud=[]
  status=[]

  lname=''
  mname=''
  fname=''
  suffix=''
  course=''
  yearOrGradeLevel=''
  image:any = 'assets/noimage.jpg';
  lastattended=''
  constructor(private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http,public dialog: MatDialog) { }

      ngOnInit() {
        
            if (this.global.activeid!='') {
              this.id=this.global.activeid
              this.keyDownFunctionstudent('onoutfocus')
            }
            
      }

      studentlookup(): void {
        const dialogRef = this.dialog.open(StudentLookupComponent, {
          width: '600px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            this.id = result.result;
            this.keyDownFunctionstudent('onoutfocus')
          }
        });
      }

keyDownFunctionstudent(event){
    this.stud=[]
    this.notcredited=[]
    this.credited=[]
    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
      this.global.swalLoading('')   
      this.global.activeid=this.id 
          this.http.get(this.global.api+'StudentEvaluation/StudentInfo/'+this.id+"/"+this.global.syear+'/'+this.global.domain,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  if (res.data==null) {
                    this.global.swalAlert(res.message,"","warning")
                  }else{

                  this.stud = res.data
                  this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
                  this.fname = res.data.firstName
                  this.mname = res.data.middleName
                  this.lname = res.data.lastName
                  this.suffix = res.data.suffixName
                  this.course = res.data.course
                  this.yearOrGradeLevel = res.data.yearOrGradeLevel.toString();
                  this.progid = res.data.programID
                  this.lastattended=res.data.lastSY
                  this.keyDownFunction('onoutfocus',0)
                  }
                },Error=>{
                  this.global.swalAlertError()
                  console.log(Error)
                  this.global.swalAlertError()
                });
    }
  }

  showcred=false
  textcred='Show Remaining Subject(s)'
  invertcred(){
    if (this.showcred==true){
      this.showcred=false
      this.textcred='Show Remaining Subject(s)'
    }
    else{
      this.textcred='Hide Remaining Subject(s)'
      this.showcred=true
    }
  }

  checklistexist=false
  grades=[]
  acadhist=[]
  keyDownFunction(event,xedia){
  	if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
  		this.data=undefined
      this.tabledata=undefined
      this.tableArr=undefined
      this.progid2 = this.progid
		  this.http.get(this.global.api+'StudentEvaluation/Curriculum/'+this.progid,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
          	if (res.data!=null) {
	            if (this.global.checkdomain(res.data.departmentId)) {
	              	this.data=res.data
			        this.http.get(this.global.api+'StudentEvaluation/'+this.id+'/'+this.progid,this.global.option)         
              .map(response => response.json())
			  			.subscribe(res => {
                  if (res.data==null) {
                    this.tableArr=[]
                    this.tabledata=[]
                  }else{
                    this.tableArr=[]
                    this.tabledata=[]
                  for (var i1 = 0; i1 < res.data.length; ++i1) {
                      if (res.data[i1].subjectId!='FILI 1013'&&res.data[i1].subjectId!='FILI 1023') {
                        this.tableArr.push(res.data[i1])
                        this.tabledata.push(res.data[i1])
                      }
                    }
                  }
                  this.grades = [];

                  if (res.data.length==0) {
                    this.checklistexist = false
                  }else{
                    this.checklistexist = true
                  }  

                  if (this.checklistexist == true) {
                    this.http.get(this.global.api+'StudentEvaluation/AcademicHistoryEvaluation/'+this.id,this.global.option)         
                    .map(response => response.json())
                          .subscribe(res => {
                            this.grades = res.data
                            this.http.get(this.global.api+'StudentEvaluation/SubjectAcademicHistoryMapping/'+this.id+'/'+this.progid,this.global.option)         
                              .map(response => response.json())
                                    .subscribe(res => {
                                      this.acadhist = res.data
                                      this.http.get(this.global.api+'StudentEvaluation/StatusList',this.global.option)         
                                      .map(response => response.json())
                                            .subscribe(res => {
                                              if (xedia==0) {
                                                this.global.swalClose();
                                              }
                                                this.status=res.data
                                                this.passnotcredited()
                                                this.matchingunsaved()
                                              },Error=>{
                                                this.status=[]
                                                this.global.swalAlertError();
                                             });
                                      },Error=>{
                                        this.acadhist=[]
                                        this.global.swalAlertError();
                                     });
                            },Error=>{
                              this.grades=[]
                              this.global.swalAlertError();
                           });
                  }else{
                     this.grades=[]
                     this.global.swalClose();
                  }
                  

			          },Error=>{
			            //console.log(Error);
			            this.global.swalAlertError();
                  this.tableArr=[]
                  this.tabledata=[]
			         });
	            }else
	            {
	              this.global.swalAlert("Acadims Alert!",'Your view domain does not allow you to view this curriculum.','warning')
	            }
          		// code...
          	}else
          	{
    			    this.tableArr=[]
    			    this.tabledata=[]
          	}

          },Error=>{
            //console.log(Error);
            this.global.swalAlertError();
            console.log(Error)
          });
  	  }
   }
 temporarymapping=[]
 gradecredited=[]
 gradenotincluded=[]
 checkgrade(i){
   var grade = ''
   var savedarr = []
   if (this.acadhist!=undefined&&this.grades!=undefined) {
     for (var b = 0; b < this.acadhist.length; ++b) {
       if (this.tableArr[i].id==this.acadhist[b].studentEvaluationCheckListId) {
         for (var temp1 = 0; temp1 < this.grades.length; ++temp1) {
           if (this.acadhist[b].academicHistoryRecordId==this.grades[temp1].recordId) {
             if (grade=='') {
               grade = this.grades[temp1].grade
               savedarr.push(this.grades[temp1])
             }else{
               grade = grade + ", " + this.grades[temp1].grade
               savedarr.push(this.grades[temp1])
             }
           }
         }
       }
     }
     // code...
   }

   if (this.grades!=undefined) {
     for (var g = 0; g < this.grades.length; ++g) {
       if ( (this.tableArr[i].subjectId.replace(/\s/g, '')==this.grades[g].subjectId.replace(/\s/g, '')&&
         this.tableArr[i].subjectTitle.replace(/,/g, "").replace(/\s/g, '').replace(/and/g, '').replace(/&/g, '')==this.grades[g].subjectTitle.replace(/,/g, "").replace(/\s/g, '').replace(/and/g, '').replace(/&/g, '')&&
         this.tableArr[i].totalUnits==this.grades[g].units
         )
         ||
         (this.grades[g].subjectId.replace(/\s/g, '')=="NSTP1013"&&this.tableArr[i].subjectId.replace(/\s/g, '')=="NSTP1013")
         ||
         (this.grades[g].subjectId.replace(/\s/g, '')=="NSTP1023"&&this.tableArr[i].subjectId.replace(/\s/g, '')=="NSTP1023")
         ) {
           var condition1 = ''
           for (var temp2 = 0; temp2 < savedarr.length; ++temp2) {
             if (savedarr[temp2].recordId==this.grades[g].recordId) {
               condition1 = 'passed'
             }
           }

           if (condition1=='') {
             if (grade == '') {
               grade = this.grades[g].grade
             }else{
               grade = grade + ", " + this.grades[g].grade
             }
           }

           if (this.temporarymapping.length == 0) {
             this.temporarymapping.push({id:this.tableArr[i].id,recordId:this.grades[g].recordId,subjectId:this.grades[g].subjectId,subjectTitle:this.grades[g].subjectTitle,units:this.grades[g].units,grade:this.grades[g].grade})
           }else{
             var condition2 = ''
             for (var temp3 = 0; temp3 < this.temporarymapping.length; ++temp3) {
               if (this.temporarymapping[temp3].recordId==this.grades[g].recordId) {
                 condition2 = 'passed'
                 break
               }
             }
             if (condition2=='') {
                this.temporarymapping.push({id:this.tableArr[i].id,recordId:this.grades[g].recordId,subjectId:this.grades[g].subjectId,subjectTitle:this.grades[g].subjectTitle,units:this.grades[g].units,grade:this.grades[g].grade})
             }
           }
         
       }
     }
   }
   return grade
 }

 notcredited=[]
 checkcurriculum(g){
   for (var i = 0; i < this.tableArr.length; ++i) {
     if (
         this.tableArr[i].subjectId==this.grades[g].subjectId&&
         this.tableArr[i].subjectTitle==this.grades[g].subjectTitle&&
         this.tableArr[i].totalUnits==this.grades[g].units
       )
       {
        return false
       }
   }
   return true
 }

 credited=[]
 passnotcredited(){
   var pass = 0
   var value = 0
   var pass2 = false
   for (var g = 0; g < this.grades.length; ++g) {
     for (var i = 0; i < this.tableArr.length; ++i) {
       if ( (this.tableArr[i].subjectId.replace(/\s/g, '')==this.grades[g].subjectId.replace(/\s/g, '')&&
         this.tableArr[i].subjectTitle.replace(/,/g, "").replace(/\s/g, '').replace(/and/g, '').replace(/&/g, '')==this.grades[g].subjectTitle.replace(/,/g, "").replace(/\s/g, '').replace(/and/g, '').replace(/&/g, '')&&
         this.tableArr[i].totalUnits==this.grades[g].units
         )
         ||
         (this.grades[g].subjectId.replace(/\s/g, '')=="NSTP1013"&&this.tableArr[i].subjectId.replace(/\s/g, '')=="NSTP1013")
         ||
         (this.grades[g].subjectId.replace(/\s/g, '')=="NSTP1023"&&this.tableArr[i].subjectId.replace(/\s/g, '')=="NSTP1023")
       ){
         this.credited.push({checklistid:this.tableArr[i].id,acadhist:this.grades[g]})
         pass = 1
         break
       }
     }
     if (pass == 0) {
       pass2 = true 
       for (var temp = 0; temp < this.acadhist.length; ++temp) {
           if (this.grades[g].recordId==this.acadhist[temp].academicHistoryRecordId) {
             pass2 = false 
             break
           }else{
             pass2 = true 
           }
       }
       if (pass2) {
                  
                      if (this.grades[g].subjectId!='FILI 1013'&&this.grades[g].subjectId!='FILI 1023') {
                        this.notcredited.push(this.grades[g])
                      }
           
       }
     }
     pass=0
     pass2 = false
   }
 }

  x=''
  sy(x){
    if (x!=null) {
      if (this.x.substring(0,6)==x.substring(0,6)) {
        this.x=x
        return false
      }else
      {
        this.x=x
        return true
      }
    }else
      return false
    
  }

  y=''
  sem(y){
    if (this.y==y) {
      this.y=y
      return false
    }else
    {
      this.y=y
      return true
    }
  }


  getstudgrade(x){
    for (var i = 0; i < this.stud.length; ++i) {
      if (this.stud[i]==x) {
        
        break;
      }
    }
  }

  createchecklisttemp=false
  createchecklist(){
    if (this.createchecklisttemp == false) {
      this.createchecklisttemp=true
      this.http.post(this.global.api+'StudentEvaluation/',{
        "idNumber": this.id,
        "programId": this.progid.toString()
        },this.global.option)         
            .map(response => response.json())
             .subscribe(res => {
                  this.keyDownFunctionstudent('onoutfocus')
                  this.createchecklisttemp=false
                },Error=>{
                  this.createchecklisttemp=false
                  this.global.swalAlertError();
        });
    }
  }

  deletechecklisttemp=false
  deletechecklist(){
    if (this.deletechecklisttemp == false) {
      this.deletechecklisttemp=true
      this.http.delete(this.global.api+'StudentEvaluation/'+this.id+"/"+this.progid,this.global.option)         
            .map(response => response.json())
             .subscribe(res => {
                  this.keyDownFunctionstudent('onoutfocus')
                  this.deletechecklisttemp=false
                },Error=>{
                  this.deletechecklisttemp=false
                  this.global.swalAlertError();
        });
    }
  }

  selectnotcreditedsubjvar = ''
  selectnotcreditedsubj(x){
    this.selectnotcreditedsubjvar = x;
  }

  openaddmapping(x,h){
    var y
    if (this.selectnotcreditedsubjvar!='') {
      y = this.selectnotcreditedsubjvar
    }else
      y = ''
    var mappingpass=[]
    for (var temp1 = 0; temp1 < this.temporarymapping.length; ++temp1) {
      if (x.id==this.temporarymapping[temp1].id) {
        mappingpass.push(this.temporarymapping[temp1])
      }
    }

    const dialogRef = this.dialog.open(MappingComponent, {
          width: '95%', disableClose: true, data:{lastsy:this.lastattended,map:mappingpass,color:h,grades:this.grades,checklist:x,status:this.status,acadhistid:y,notcredited:this.notcredited,credited:this.credited,mapping:this.acadhist,progid:this.progid,id:this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result==1) {
              this.keyDownFunctionstudent('onoutfocus')
            }
          }
        });
  }



  removechecklist(){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Delete checklist','checklist has been deleted','','sy');
  }

  swalConfirm(title,text,type,button,d1,d2,remove)
  {
    swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          if (remove=='sy') {
            this.deletechecklist()
          }
        }
      })
  }

  notsaved=[]
  checkcolor(i){
  var grade = 'white'
  var subj=[]
  var acadhist=[]
     if (this.grades!=undefined) {
       for (var g = 0; g < this.grades.length; ++g) {

         if ( (this.tableArr[i].subjectId.replace(/\s/g, '')==this.grades[g].subjectId.replace(/\s/g, '')&&
         this.tableArr[i].subjectTitle.replace(/,/g, "").replace(/\s/g, '').replace(/and/g, '').replace(/&/g, '')==this.grades[g].subjectTitle.replace(/,/g, "").replace(/\s/g, '').replace(/and/g, '').replace(/&/g, '')&&
         this.tableArr[i].totalUnits==this.grades[g].units
         )
         ||
         (this.grades[g].subjectId.replace(/\s/g, '')=="NSTP1013"&&this.tableArr[i].subjectId.replace(/\s/g, '')=="NSTP1013")
         ||
         (this.grades[g].subjectId.replace(/\s/g, '')=="NSTP1023"&&this.tableArr[i].subjectId.replace(/\s/g, '')=="NSTP1023")
           ) {
             subj.push(this.grades[g])
             if (this.acadhist.length==0) {
               grade = '#fcedd2'
             }else
             for (var l = 0; l < this.acadhist.length; ++l) {
               if (this.grades[g].recordId==this.acadhist[l].academicHistoryRecordId) {
                 acadhist.push(this.grades[g])
               }else{
                 grade = '#fcedd2' 
               }

             }
         }
       }
     }

     if (subj.length==acadhist.length) {
       grade = 'white'
     }

     return grade
   
  }
  
  matching=[]
  matchingunsaved(){
    for (var i = 0; i < this.tableArr.length; ++i) {
       for (var g = 0; g < this.grades.length; ++g) {
         if ( (this.tableArr[i].subjectId.replace(/\s/g, '')==this.grades[g].subjectId.replace(/\s/g, '')&&
         this.tableArr[i].subjectTitle.replace(/,/g, "").replace(/\s/g, '').replace(/and/g, '').replace(/&/g, '')==this.grades[g].subjectTitle.replace(/,/g, "").replace(/\s/g, '').replace(/and/g, '').replace(/&/g, '')&&
         this.tableArr[i].totalUnits==this.grades[g].units
         )
         ||
         (this.grades[g].subjectId.replace(/\s/g, '')=="NSTP1013"&&this.tableArr[i].subjectId.replace(/\s/g, '')=="NSTP1013")
         ||
         (this.grades[g].subjectId.replace(/\s/g, '')=="NSTP1023"&&this.tableArr[i].subjectId.replace(/\s/g, '')=="NSTP1023")
           ) {
             if (this.matching.length==0) {
               this.matching.push({id:this.tableArr[i].id,acadhistid:this.grades[g].recordId,subjectTitle:this.tableArr[i].subjectTitle})
             }else
             {
               var condition = true
               for (var zero = 0; zero < this.matching.length; ++zero) {
                 if (this.matching[zero].acadhistid==this.grades[g].recordId) {
                   condition=false
                 }
               }
               if (condition) {
                 this.matching.push({id:this.tableArr[i].id,acadhistid:this.grades[g].recordId,subjectTitle:this.tableArr[i].subjectTitle})
               }
             }
            }
       }
    }
  }
  savefuncvar=false
  savefunc(){
    this.global.swalLoading('Saving...')
    this.savefuncvar=true
    this.saveunsave(this.matching.length-1)
  }

  saveunsave(x){
    if (x>=0) {
      this.http.post(this.global.api+'StudentEvaluation/SubjectAcademicHistoryMapping/',{
          "studentEvaluationChecklistId": parseInt(this.matching[x].id),
          "academicHistoryRecordId": parseInt(this.matching[x].acadhistid),
          "statusId": 0
          },this.global.option)         
              .map(response => response.json())
               .subscribe(res => {
                    this.saveunsave(x-1)
                      this.http.post(this.global.api+'StudentEvaluation/History',{
                            "idNumber": this.id,
                            "programId": this.progid,
                            "schoolYear": this.lastattended,
                            "evaluatedBy": this.global.requestid()
                          },this.global.option)         
                              .map(response => response.json())
                               .subscribe(res => {
                                  },Error=>{
                                    this.global.swalAlertError();
                                  });
                  },Error=>{
                    this.savefuncvar=false
                    this.global.swalClose();
                    this.global.swalAlertError();
          });
    }else{
      this.global.swalClose();
      this.global.swalSuccess('Evaluation Saved!')
      this.savefuncvar=false
      this.notcredited=[]
      this.credited=[]
      this.keyDownFunction('onoutfocus',1)
    }
  }

   eval(id){
    this.Confirmeval("Save evaluation?","",'warning','Save',' ','','sy');
  }
  
  Confirmeval(title,text,type,button,d1,d2,remove)
  {
    swal.fire({
        title: title,
        text: text,
        type: type,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: button
      }).then((result) => {
        if (result.value) {
          this.savefunc()
        }
      })
   }
}
