import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { UpdatePersonalInformationComponent } from './update-personal-information/update-personal-information.component';
import { ChildrenComponent } from './children/children.component';
import { UpdateChildrenComponent } from './update-children/update-children.component';
import { EducationalbackgroundAddComponent } from './educationalbackground-add/educationalbackground-add.component';
import { EducationalbackgroundUpdateComponent } from './educationalbackground-update/educationalbackground-update.component';
import { AddEligComponent } from './eligibility/add-elig/add-elig.component';
import { UpdateEligComponent } from './eligibility/update-elig/update-elig.component';
import { AddSaTComponent } from './seminars-trainings/add-sa-t/add-sa-t.component';
import { UpdateSaTComponent } from './seminars-trainings/update-sa-t/update-sa-t.component';
import { AddWeComponent } from './work-experience/add-we/add-we.component';
import { UpdateWeComponent } from './work-experience/update-we/update-we.component';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { AddResearchComponent } from './research/add-research/add-research.component';
import { UpdateResearchComponent } from './research/update-research/update-research.component';
import { AddComExtComponent } from './community-extension/add-com-ext/add-com-ext.component';
import { UpdateComExtComponent } from './community-extension/update-com-ext/update-com-ext.component';
import { AddPorgComponent } from './professional-organization/add-porg/add-porg.component';
import { UpdatePorgComponent } from './professional-organization/update-porg/update-porg.component';
import { EmployeeLookupComponent } from './../../academic/lookup/employee-lookup/employee-lookup.component';
import { AppointmentsComponent } from './employee-records/appointments/appointments.component';
import { ContractsComponent } from './employee-records/contracts/contracts.component';
import { RankRecordsComponent } from './employee-records/rank-records/rank-records.component';
import { CVComponent } from './cv/cv.component';


import { AwardsComponent } from './awards/awards.component';
import { SpeakingEngagementComponent } from './speaking-engagement/speaking-engagement.component';



import jsPDF from 'jspdf';


@Component({
  selector: 'app-employee-information',
  templateUrl: './employee-information.component.html',
  styleUrls: ['./employee-information.component.scss']
})

export class EmployeeInformationComponent implements OnInit {
  image:any = 'assets/noimage.jpg';
  signature:any = 'assets/nosignature.jpg';
  name:any='';
  position:any='';
  idnumber:any='';
  id:any='';
  dtridnum:any='';
  nationality:any='';
  religion:any='';
  homeAddress:any='';
  contactNo1:any='';
  contactNo2:any='';
  localAddress:any='';
  LAContactNo:any='';
  emailAddress:any='';
  TIN:any='';
  SSS:any='';
  philhealth:any='';
  pagibig:any='';
  dOfBirth:any='';
  civilStatus:any='';
  nameOfChurch:any='';
  dateOfMarriage:any='';
  nameOfSpouse:any='';
  occupation:any='';
  IDparam:any='';

  CedNo = '';
  PlaceIssued = '';
  DateIssued = '';
  PTRNo = '';

  pinfo
  childrenInfo

  ChildrenArr;
  EducTableArr;
  EligTableArr;
  SeminarTableArr;

  WorkTableArr;
  OrgTableArr;
  ResearchTableArr;
  ComTableArr;
  
  awardsArr;
  speakingEngArr;



  appointmentArr;
  contractArr;
  rankRecordsArr;

  empDeptID
  employeeDeptIDAr: string[]=[];

  ctr = 0;

  config: any;
  collection = { count: 60, data: [] };

  showContent:boolean = false;

  imageTestData



  fname
  mname
  lname
  suffix
  gender
  cstatus
  tempDB
  personNameInfo


  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,private global: GlobalService,private http: Http) {

     this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.ctr
    };
  }

  

  WorkDisplayedColumns = ['position', 'companyname', 'startdate', 'enddate'];
  @ViewChild(MatSort) sort4: MatSort;
  @ViewChild('paginator4') paginator4: MatPaginator;

  ngOnInit() {
    
    //console.log(this.global.requestid());
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  ngAfterViewInit() {            
          
  }
  employeelookup(): void {

        const dialogRef = this.dialog.open(EmployeeLookupComponent, {
          width: '600px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            this.id = result.result;
            this.keyDownFunction('onoutfocus')
          }
        });
        
  }

  result
  keyDownFunction(event) {
    
    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') 
    {
      //console.log("1st")
      this.employeeDeptIDAr.length = 0;
      if (this.id != '') 
      {
        if(this.id == this.global.requestid()){
          this.proceedProc();
        }else{
          this.checkAppointment();
        }
      }
      else
      {
        this.showContent = false;
      }
    // code...
    }
  }

  proceedProc(){
    this.global.swalLoading('Loading Person Information');
        this.http.get(this.global.api+'Employee/'+this.id,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            //console.log(res);
            this.global.swalClose();
            if (res.message != "IDNumber does not exist.") {
              this.showContent = true;
              this.name = res.data[0].fullname;
              this.position = res.data[0].position;
              this.idnumber=res.data[0].idnumber;
              this.dtridnum="DTR ID#: "+res.data[0].dtrid;
              this.getBasicInfo();
              this.getPersonalInfo();
              this.getEducAttainment();
              this.getElgibilities();
              this.getSeminars();
              this.getWork();
              this.getOrganization();
              this.getResearch();
              this.getComExt();
              this.getAppointment();
              this.getContract();
              this.getRankRecords();
              this.getSpeakingEngagement();
              this.getAwards();
            }else{
              //console.log('1111')
              this.clear();
              this.global.swalAlert("Employee not found",'','warning');
            }
          },Error=>{
            this.clear();
            this.global.swalAlertError();
          });
  }

  getAppointment(){
    this.global.swalLoading('Loading item resources')
    this.http.get(this.global.api+'Employee/Appointment/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
            this.appointmentArr=res.data;
            this.global.swalClose();
          
          },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }

  checkAppointment(){
    this.http.get(this.global.api+'Employee/Appointment/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
            this.appointmentArr=res.data;
            //console.log("VIEW DOMAINS UNDER THE USER:");
            //console.log(this.global.viewdomain);

            //console.log("checking of appointment:");
            //console.log(this.appointmentArr);
            for(var x = 0; x<res.data.length;x++)
            {
              //if(res.data[x].classificationID == 2 &&res.data[x].active == 1) //used when getting only the fulltime employee's
              if(res.data[x].active == 1)
              {
                //this.empDeptID = res.data[x].departmentID.toString();//used when getting the first active appointment
                //x=res.data.length; //used when getting the first active appointment
                
                this.employeeDeptIDAr.push(res.data[x].departmentID.toString());

              }
              else{
                this.global.swalAlert('','Employee is a part time and has no active appointment','error');
              }
            }


            if (this.employeeDeptIDAr.length == 1) {
              //////THIS DECISION PROCESS ONLY FIRES UP WHEN THERE'S ONLY ONE APPOINTMENT FOR A CERTAIN EMPLOYEE
              this.empDeptID = this.employeeDeptIDAr[0].toString();
              //console.log(this.empDeptID);
              this.validateAppointment(this.global.checkdomain(this.empDeptID));
              
            }
            else{
              //////THIS DECISION PROCESS ONLY FIRES UP WHEN THERE'S MORE THAN ONE APPOINTMENT FOR A CERTAIN EMPLOYEE
              for (var i = this.employeeDeptIDAr.length - 1; i >= 0; i--) {
                if(this.global.checkdomain(this.employeeDeptIDAr[i]) == true){
                  this.result = true;
                }
                else{
                  this.result=false;

                }
              }
              this.validateAppointment(this.result);
            }

          
          //console.log(this.employeeDeptIDAr)
          
          },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }



  validateAppointment(param){
    if(param==true){
      this.proceedProc();
    }
    else{
      this.clear();
      this.global.swalAlert('','Employee does not belong to your department/office','error'); 
    }
  }


  updatenamevar=false
  updatename(){
    if (this.updatenamevar==true){

      this.updatenamevar = false
      this.proceedProc();
    }
    else{
      this.global.swalLoading('Loading item resources')
      this.http.get(this.global.api+'Employee/Person/'+this.id,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
              this.personNameInfo=res.data;
              this.fname = res.data.firstName
              this.mname = res.data.middleName
              this.lname = res.data.lastName
              this.suffix = res.data.suffixName
              this.gender = res.data.gender
              this.cstatus = res.data.civilStatus
              this.tempDB = res.data.dateOfBirth
              this.global.swalClose();
            
            },Error=>{
                    //console.log(Error);
                    this.global.swalAlertError();
                    //console.log(Error)
          });
      this.updatenamevar = true
    }

    

  }
  updatenameapi(){

    var error = '';
    if (this.fname=='') {
      error = error + '*First name must not be blank<br>';
    }
    if (this.lname=='') {
      error = error + '*Last name must not be blank<br>';
    }

    if (error == '') {
      var x=''
      let date = new Date(this.tempDB).toLocaleString();
          this.global.swalLoading('Updating...');
          this.http.put(this.global.api+'Employee/Person/'+this.id ,{
            
            'FirstName':this.fname,
            'MiddleName':this.mname,
            'LastName':this.lname,
            'SuffixName':this.suffix,
            'Gender':this.gender,
            'CivilStatus':this.cstatus,
            'DateOfBirth':this.tempDB,
            
          },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  this.global.swalSuccess(res.message);
                                  this.updatenamevar = false
                                  this.proceedProc();
                                },Error=>{
                                  this.global.swalAlertError();
                                });
    }else
    {
      this.global.swalAlert('The Following error has Occured',error,'error');
    }

  }





  getContract(){
    this.global.swalLoading('Loading item resources')
    this.http.get(this.global.api+'Employee/Contract/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
            this.contractArr=res.data;
            this.global.swalClose();
          
          },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getRankRecords(){
    this.global.swalLoading('Loading item resources')
    this.http.get(this.global.api+'Employee/Rank/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
            this.rankRecordsArr=res.data;
            this.global.swalClose();
          
          },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getBasicInfo() {
      this.http.get(this.global.api+'Employee/Children/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          //console.log("Children"+res.data)
            this.ChildrenArr=res.data;
            //console.table(res.data);
          },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getPersonalInfo(){
      this.http.get(this.global.api+'Employee/PersonalInfo/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.pinfo = res.data;
          this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
          this.imageTestData = res.data.idPicture;
          this.signature = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.signature);
          this.nationality = res.data.nationality;
          this.religion = res.data.religion;
          if(res.data.street1 == null||res.data.street1 == '')
            this.homeAddress =res.data.permanentaddress;
          else
            this.homeAddress = res.data.street1+' '+res.data.permanentaddress;
          if(res.data.street2 == null||res.data.street2 == '')
            this.localAddress =res.data.currentaddress;
          else
            this.localAddress = res.data.street2+' '+res.data.currentaddress;

          
          this.LAContactNo = res.data.telno;
          this.emailAddress = res.data.emailAdd;
          this.TIN = res.data.tin;
          this.SSS = res.data.sssNo;
          this.philhealth = res.data.philHealthNo;
          this.pagibig = res.data.pagIbigNo;
          this.dOfBirth =  res.data.dateofbirth;
          this.nameOfChurch = res.data.nameOfChurch;
          this.dateOfMarriage = res.data.dateofmarriage;
          this.nameOfSpouse = res.data.spouse;
          this.occupation = res.data.occupation;
          this.contactNo1 =  res.data.telno;
          this.contactNo2 =  res.data.mobileno;
          this.CedNo = res.data.cedulaNo;
          this.PlaceIssued = res.data.cedula_PlacedIssued;
          this.DateIssued = res.data.cedula_DateIssued;
          this.PTRNo = res.data.ptrOtrNo;

          if (res.data.civilstatus == 'S') {this.civilStatus = 'Single';}
          else if(res.data.civilstatus == 'M') {this.civilStatus = 'Married';}
          else if(res.data.civilstatus == 'W') {this.civilStatus = 'Widowed';}

        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getEducAttainment(){
      this.http.get(this.global.api+'Employee/EducationalBackground/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          //console.log(res);
          this.EducTableArr=res.data;

        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getElgibilities(){
      this.http.get(this.global.api+'Employee/Eligibility/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          //console.log(res.length);
          this.EligTableArr=res.data;
        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getSeminars(){
      this.http.get(this.global.api+'Employee/SeminarsAndTrainings/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => { 
          //console.table(res.data);
          this.SeminarTableArr=res.data;
          if(this.SeminarTableArr != undefined || this.SeminarTableArr != null)
          {
            var count = Object.keys(this.SeminarTableArr).length;
            this.ctr = count
          }
          
        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getWork(){
      this.http.get(this.global.api+'Employee/WorkExperience/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          //console.table(res.data);
          this.WorkTableArr=res.data;

        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getOrganization(){
      this.http.get(this.global.api+'Employee/Organization/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          //console.log(res);
          this.OrgTableArr=res.data;

        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getResearch(){
      this.http.get(this.global.api+'Employee/Research/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          //console.log(res);
          this.ResearchTableArr=res.data;
        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getComExt(){
      this.http.get(this.global.api+'Employee/CommunityExtension/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          //console.log(res);
          this.ComTableArr=res.data;
        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getAwards(){//console.log("aaa")
    this.http.get(this.global.api+'Employee/Awards/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {  
          
          //console.log(res.data)
          this.awardsArr=res.data;
          //console.log(this.global.CommunityExtArray)
        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }
  getSpeakingEngagement(){
    this.http.get(this.global.api+'Employee/SpeakingEngagement/'+this.id,this.global.option)
        .map(response => response.json())
        .subscribe(res => {  //console.log(res.data)
          this.speakingEngArr=res.data;
          //console.log(this.global.CommunityExtArray)
        },Error=>{
                  //console.log(Error);
                  this.global.swalAlertError();
                  //console.log(Error)
        });
  }



  editInfoOpenDialog(): void {
    const dialogRef = this.dialog.open(UpdatePersonalInformationComponent, {
      width: '900px',data:{selectedData:this.pinfo,selectedID:this.idnumber}
      
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res == undefined) {
        
      }else
      if (res.result==0) {
       //console.log("----")
       //console.log(res.data)
      }
      else
      {
        //console.log(res);
        this.keyDownFunction('onoutfocus');
      }
      //console.log(result);
    });
   }

  addingChildOpenDialog(): void {
    if (this.id=='') {
      this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }else {
      const dialogRef = this.dialog.open(ChildrenComponent, {
        width: '600px', disableClose: false,data:{selectedID:this.idnumber}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {
          //console.log(result.result)

          if (result.result=='Adding Success') {
            this.getBasicInfo();
          }
        }
      });
    }
   }
  updateChildrenOpenDialog(CID): void {
    //console.log(CID.firstName);
      if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        const dialogRef = this.dialog.open(UpdateChildrenComponent, {
          width: '600px', disableClose: false,data:{selectedData:CID,selectedCID:CID.childID,}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getBasicInfo();
            }
          }
        });
      }
   }
  deleteChild(SCID){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/DeleteChild/'+SCID.childID+'/'+this.id,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

              if (res.message == 'Child removed successfully.') {
                //console.log(this.id+"----"+SCID.childID)
                this.global.swalAlert("Success","",'success');
                this.getBasicInfo();
              }
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
    
   }
  
  addingEducBcgOpenDialog():void{
    if (this.id=='') {
          this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }
    else {
        const dialogRef = this.dialog.open(EducationalbackgroundAddComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.idnumber}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            //console.log(result.result)

            if (result.result=='Adding Success') {
              this.getEducAttainment();
            }
          }
        });
    }
   }
  updateEducBcgOpenDialog(educBcgData):void{
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(EducationalbackgroundUpdateComponent, {
          width: '600px', disableClose: false,data:{selectedData:educBcgData,selectedEID:educBcgData.educBGID,}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getEducAttainment();
            }
          }
        });
      }
   }
  deleteEducBcg(eid){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/DeleteEducationalBackground/'+eid,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

              if (res.message !=undefined) {
                this.global.swalAlert("Success","",'success');
                this.getEducAttainment();
              }
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        }); 
   }

  addEligibilityOpenDialog():void{
    if (this.id=='') {
          this.global.swalAlert("Please check the ID number of the employee.","",'warning');
        }else {
        const dialogRef = this.dialog.open(AddEligComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            //console.log(result.result)

            if (result.result=='Adding Success') {
              this.getElgibilities();
            }
          }
        });
        }
   }  
  updateEligOpenDialog(eligData):void{
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(UpdateEligComponent, {
          width: '600px', disableClose: false,data:{selectedData:eligData,selectedEID:eligData.eligibilityid,}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getElgibilities();
            }
          }
        });
      }
   }
  deleteeligibility(EID){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/Eligibility/'+EID,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

              if (res.message !=undefined) {
                this.global.swalAlert("Success","",'success');
                this.getElgibilities();
              }
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
    
   }

  addSaTOpenDialog():void{
    if (this.id=='') {
          this.global.swalAlert("Please check the ID number of the employee.","",'warning');
        }else {
        const dialogRef = this.dialog.open(AddSaTComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            //console.log(result.result)

            if (result.result=='Adding Success') {
              this.getSeminars();
            }
          }
        });
        }
   }
  approveSat(SatData){
    this.global.swalLoading('Updating Seminar and Training');
    //console.log(SatData.seminarid+' - '+SatData.seminardescription+' - '+SatData.companyname+' - '+SatData.startdate+' - '+SatData.enddate+' - '+SatData.trainingTypeID+' - '+SatData.venue;

    this.http.put(this.global.api+'Employee/UpdateSeminarAndTraining/'+SatData.seminarid,{
              "seminardesc": SatData.seminardescription,
              "companyname": SatData.companyname,
              "sdate": SatData.startdate,
              "edate": SatData.enddate,
              "trainingTypeID": SatData.trainingTypeID,
              "venue": SatData.venue,
              "statusID": 0,
              "approvedBy": this.global.requestid()
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalAlert("Success","",'success');
                                  this.getSeminars();    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
  } 
  updateSaTOpenDialog(SaTData):void{
    //console.log(this.idnumber);
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(UpdateSaTComponent, {
          width: '600px', disableClose: false,data:{selectedData:SaTData,selectedSID:SaTData.seminarid,idnum:this.idnumber}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getSeminars();
            }
          }
        });
      }
   }
  deleteSat(SID){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/DeleteSeminarAndTraining/'+SID,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

              if (res.message !=undefined) {
                this.global.swalAlert("Success","",'success');
                this.getSeminars();
              }
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });    
   }

  
  approveOrg(ot){
    this.global.swalLoading('Updating organization');
    this.http.put(this.global.api+'Employee/Organization/'+ot.organizationid,{
              "position": ot.position,
              "organization": ot.organization,
              "statusID": 0,
              "approvedBy": this.global.requestid()
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  //this.global.swalClose();
                                  this.global.swalAlert("Success","",'success');
                                  this.getOrganization();    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
   }
  updateOrgOpenDialog(porgData):void{
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(UpdatePorgComponent, {
          width: '600px', disableClose: false,data:{selectedData:porgData,selectedPID:porgData.organizationid,idnum:this.idnumber}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getOrganization();
            }
          }
        });
      }
   }
  deleteOrg(PID){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/Organization/'+PID,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

              if (res.message == 'Organization removed successfully.') {
                //console.log(this.id+"----"+SCID.childID)
                this.global.swalAlert(res.message,"",'success');
                this.getOrganization();
              }
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
   }

  addOrgOpenDialog():void{
    if (this.id=='') {
          this.global.swalAlert("Please check the ID number of the employee.","",'warning');
        }else {
        const dialogRef = this.dialog.open(AddPorgComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            //console.log(result.result)

            if (result.result=='Adding Success') {
              this.getOrganization();
            }
          }
        });
        }
   }
////////////////WORK EXPERIENCE////////////////////////////////////////////////////////////////////////////////
  addWEOpenDialog():void{
    if (this.id=='') {
          this.global.swalAlert("Please check the ID number of the employee.","",'warning');
        }else {
        const dialogRef = this.dialog.open(AddWeComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.id}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            //console.log(result.result)

            if (result.result=='Adding Success') {
              this.getWork();
            }
          }
        });
        }
   }


  updateWEOpenDialog(weData):void{
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(UpdateWeComponent, {
          width: '600px', disableClose: false,data:{selectedData:weData,selectedWID:weData.workid,}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getWork();
            }
          }
        });
      }
   }
  deleteWE(WID){

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/WorkExperience/'+WID,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

              if (res.message == 'WorkExperience removed successfully.') {
                //console.log(this.id+"----"+SCID.childID)
                this.global.swalAlert(res.message,"",'success');
                this.getWork();
              }
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////RESEARCH////////////////////////////////////////////////////////////////////////////////
  approveRes(rt){
    this.global.swalLoading('Updating research');
    this.http.put(this.global.api+'Employee/UpdateResearch/'+rt.researchID,{
              "title": rt.title,
              "dateCompleted": rt.dateCompleted,
              "remarks": rt.remarks,
              "copyrightYear": rt.copyrightYear,
              "statusID": 0,
              "approvedBy": this.global.requestid()
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  //this.global.swalClose();
                                  this.global.swalAlert("Success","",'success');
                                  this.getResearch();    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
   }

  addResearchOpenDialog(): void {
    if (this.id=='') {
      this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }else {
      const dialogRef = this.dialog.open(AddResearchComponent, {
        width: '600px', disableClose: false,data:{selectedID:this.idnumber}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {
          //console.log(result.result)

          if (result.result=='Adding Success') {
            this.getResearch();
          }
        }
      });
    }
   }
  updateResearchOpenDialog(resData):void{
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(UpdateResearchComponent, {
          width: '600px', disableClose: false,data:{selectedData:resData,selectedRID:resData.researchID,idnum:this.idnumber}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getResearch();
            }
          }
        });
      }
   }
  deleteResearch(RID){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/DeleteResearch/'+RID,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

              if (res.message != undefined) {
                //console.log(this.id+"----"+SCID.childID)
                this.global.swalAlert(res.message,"",'success');
                this.getResearch();
              }
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
    
   }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////COMMUNITY EXTENSIONS////////////////////////////////////////////////////////////////////////////////
  approveCE(ct){
    this.global.swalLoading('Updating research');

    this.http.put(this.global.api+'Employee/CommunityExtension/'+ct.ceid,{
              "activity": ct.activity,
              "dateConducted": ct.dateConducted,
              "location": ct.location,
              "StatusID":0,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  //this.global.swalClose();
                                  this.global.swalAlert("Success","",'success');
                                  this.getComExt();    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
   }

  addComExtOpenDialog(): void {
    if (this.id=='') {
      this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }else {
      const dialogRef = this.dialog.open(AddComExtComponent, {
        width: '600px', disableClose: false,data:{selectedID:this.idnumber}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {
          //console.log(result.result)

          if (result.result=='Adding Success') {
            this.getComExt();
          }
        }
      });
    }
   }
  updateComExtOpenDialog(cData):void{
    // console.log(cData.ceid)
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(UpdateComExtComponent, {
          width: '600px', disableClose: false,data:{selectedData:cData,selectedCID:cData.ceid,idnum:this.idnumber}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getComExt();
            }
          }
        });
      }
   }
  deleteComExt(RID){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/DeleteResearch/'+RID,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

              if (res.message != undefined) {
                //console.log(this.id+"----"+SCID.childID)
                this.global.swalAlert(res.message,"",'success');
                this.getResearch();
              }
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
    
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////AWARDS ////////////////////////////////////////////////////////////////////////////////
  approveAw(e){
    this.global.swalLoading('Updating research');

    this.http.put(this.global.api+'Employee/Award/'+e.id,{
              "EventTitle": e.eventTitle,
              "AwardReceived": e.awardReceived,
              "AwardingBody": e.awardingBody,
              "Venue": e.venue,
              "DateAwarded": e.dateAwarded,
              "StatusId": 1
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  //this.global.swalClose();
                                  this.global.swalAlert("Success","",'success');
                                  this.getAwards();    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
   }
  addAwOpenDialog(): void {
    if (this.id=='') {
      this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }else {
      const dialogRef = this.dialog.open(AwardsComponent, {
        width: '600px', disableClose: false,data:{selectedID:this.id,type:"Add"}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {
          //console.log(result.result)

          if (result.result=='Adding Success') {
            this.getAwards();
          }
        }
      });
    }
   }
  updateAwOpenDialog(eData,eid):void{
    //console.log(cData.ceid)
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(AwardsComponent, {
          width: '600px', disableClose: false,data:{selectedData:eData,selectedEID:eData.id,selectedID:this.idnumber,type:"Update"}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getAwards();
            }
          }
        });
      }
   }
  deleteAw(AID){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/Award/'+AID,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

                this.global.swalAlert(res.message,"",'success');
                this.getAwards();
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
    
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////SPEAKING ENGAGEMENT////////////////////////////////////////////////////////////////////////////////
  approveSE(e){
    this.global.swalLoading('Updating research');

    this.http.put(this.global.api+'Employee/SpeakingEngagement/'+e.id,{
              "EmployeeId": e.employeeId,
              "ConferenceTitle": e.conferenceTitle,
              "EventOrganizer": e.eventOrganizer,
              "StartDate": e.startDate,
              "EndDate": e.endDate,
              "Venue": e.venue,
              "statusId": 1,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  //this.global.swalClose();
                                  this.global.swalAlert("Success","",'success');
                                  this.getSpeakingEngagement();    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
   }
  addSEOpenDialog(): void {
    if (this.id=='') {
      this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }else {
      const dialogRef = this.dialog.open(SpeakingEngagementComponent, {
        width: '600px', disableClose: false,data:{selectedID:this.id,type:"Add"}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {
          //console.log(result.result)

          if (result.result=='Adding Success') {
            this.getSpeakingEngagement();
          }
        }
      });
    }
   }
  updateSEOpenDialog(eData,eid):void{
    //console.log(cData.ceid)
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        //console.log(eligData.eligibilityid);
        const dialogRef = this.dialog.open(SpeakingEngagementComponent, {
          width: '600px', disableClose: false,data:{selectedData:eData,selectedEID:eData.id,selectedID:this.idnumber,type:"Update"}
        });

        dialogRef.afterClosed().subscribe(result => {
          //this.keyDownFunction('onoutfocus');
          //console.log(result);
          if (result!=undefined)
          {
            if (result.result=='Update success')
            {
              this.getSpeakingEngagement();
            }
          }
        });
      }
   }
  deleteSE(AID){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '500px', disableClose: true,data:{message:"the selected item"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result=='deleteConfirm') {
            this.http.delete(this.global.api+'Employee/SpeakingEngagement/'+AID,this.global.option)
            .map(response => response.json())
            .subscribe(res => {

                this.global.swalAlert(res.message,"",'success');
                this.getSpeakingEngagement();
            },Error=>{
                      //console.log(Error);
                      this.global.swalAlertError();
                      //console.log(Error)
            });
          }
          else{

          }
        });
    
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////EMPLOYEE RECORDS////////////////////////////////////////////////////////////////////////////////////////////

  addAppointmentOpenDialog(){
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        const dialogRef = this.dialog.open(AppointmentsComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.idnumber,type:"add"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            //console.log(result.result)

            if (result.result=='Adding Success') {

              this.getAppointment();
            }
          }
        });
      }
  }
  updateAppointmentOpenDialog(a){
    const dialogRef = this.dialog.open(AppointmentsComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.idnumber,selectedData:a,type:"update"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            //console.log(result.result)

            if (result.result=='Update Success') {
              this.getAppointment();
            }
          }
        });
  }

  deleteAppointment(selectedid){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '500px', disableClose: true,data:{message:"the selected item"}
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result.result=='deleteConfirm') {
              this.http.delete(this.global.api+'Employee/Appointment/'+selectedid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {

                if (res.message != undefined) {
                  //console.log(this.id+"----"+SCID.childID)
                  this.global.swalAlert(res.message,"",'success');
                  this.getAppointment();
                }
              },Error=>{
                        //console.log(Error);
                        this.global.swalAlertError();
                        //console.log(Error)
              });
            }
            else{

            }
          });
  }
  addContractOpenDialog(){
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        const dialogRef = this.dialog.open(ContractsComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.idnumber,type:"add"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
              this.getContract();
          }
        });
      }

  }

  updateContractOpenDialog(c){
    const dialogRef = this.dialog.open(ContractsComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.idnumber,selectedData:c,type:"update"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
              this.getContract();
          }
        });
  }

  deleteContract(selectedid){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '500px', disableClose: true,data:{message:"the selected item"}
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result.result=='deleteConfirm') {
              this.http.delete(this.global.api+'Employee/Contract/'+selectedid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {

                if (res.message != undefined) {
                  //console.log(this.id+"----"+SCID.childID)
                  this.global.swalAlert(res.message,"",'success');
                  this.getContract();
                }
              },Error=>{
                        //console.log(Error);
                        this.global.swalAlertError();
                        //console.log(Error)
              });
            }
            else{

            }
          });
  }

  addRankRecordOpenDialog(){
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
      }else {
        const dialogRef = this.dialog.open(RankRecordsComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.idnumber,type:"add"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
              this.getRankRecords();
          }
        });
      }

  }

  updateRankRecordOpenDialog(c){
    const dialogRef = this.dialog.open(RankRecordsComponent, {
          width: '600px', disableClose: false,data:{selectedID:this.idnumber,selectedData:c,type:"update"}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
              this.getRankRecords();
          }
        });
  }

  deleteRankRecord(selectedid){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '500px', disableClose: true,data:{message:"the selected item"}
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result.result=='deleteConfirm') {
              this.http.delete(this.global.api+'Employee/Rank/'+selectedid+'?evaluationid='+selectedid,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                  // console.log(selectedid)

                if (res.message != undefined) {
                  this.global.swalAlert(res.message,"",'success');
                  this.getRankRecords();
                }
              },Error=>{
                        //console.log(Error);
                        this.global.swalAlertError();
                        //console.log(Error)
              });
            }
            else{

            }
          });
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  exportCV(){
    if (this.id=='') {
        this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }
    else {
    
      const dialogRef = this.dialog.open(CVComponent, {
            width: '850px',height:'600px', disableClose: true,data:{
              selectedID: this.idnumber,
              empPicture: this.image,
              address: this.localAddress,
              info: this.pinfo,
              name: this.name,
              position: this.position,
              education: this.EducTableArr,
              SnA: this.SeminarTableArr,
              eligibility: this.EligTableArr,
              workXP: this.WorkTableArr,
              researches: this.ResearchTableArr,

            }
          });
      dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {

          }
        });
    }
  }

 

  clear(){
    this.image = 'assets/noimage.jpg';
    
    this.signature = 'assets/nosignature.jpg';
    this.name = '';
    this.position = '';
    this.id = '';
    this.idnumber='';
    this.dtridnum='';
    this.nationality='';
    this.religion='';
    this.homeAddress='';
    this.contactNo1='';
    this.contactNo2='';
    this.localAddress='';
    this.LAContactNo='';
    this.emailAddress='';
    this.TIN='';
    this.SSS='';
    this.philhealth='';
    this.pagibig='';
    this.dOfBirth='';
    this.civilStatus='';
    this.nameOfChurch='';
    this.dateOfMarriage='';
    this.nameOfSpouse='';
    this.occupation='';
  }

  tabbing=0;
  getindex(tab){
    this.tabbing = tab.index;
  }

}

export interface PeriodicElement {
  lName:any;
  fName:any;
  mName:any;
  dBirth:any;
  usltIDNum:any;
}


