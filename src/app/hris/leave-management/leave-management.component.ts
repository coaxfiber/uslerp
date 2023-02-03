import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import {FormBuilder, FormGroup} from '@angular/forms';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { ViewChild,ElementRef } from '@angular/core';
import { EditLeaveComponent } from './edit-leave/edit-leave.component';
import { EmployeeLookupComponent } from './../../academic/lookup/employee-lookup/employee-lookup.component';
import { HeadofofficeComponent } from './headofoffice/headofoffice.component';
import {ValidationServiceService} from './../hrisServices/validation-service.service';



@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {

   id:any='';
   image:any = 'assets/noimage.jpg';
   signature:any = 'assets/nosignature.jpg';
   pinfo:any = ''
   name = '';
   position:any = '';
   idnumber:any='';
   dtridnum:any='';

   linfo:any='';

   sickleave:any = '';slDay:any = '';slHour:any = '';slMin:any = ''
   vacationleave:any = '';vlDay:any = '';vlHour:any = '';vlMin:any = ''
   matrix:any = ''

   LHistoryArr;
   filteredLeaveHistoryArr = []


  VPAdmin = false;
  

  LeaveHistoryCtr = 0;
  LeaveHistoryConfig: any;
  LHcollection = { count: 60, data: [] };

  ctr = 0;
  config: any;
  collection = { count: 60, data: [] };

  employeeDeptIDAr: string[]=[];
  empDeptID;
  id1:any='';

  pendingLeaveArr = [];
  filteredPendingLeaveArr = [];
  filteredVPPendingLeaveArr = [];
  pendingLeaveTrigger = 0;
  leavetoprint = []


  semifilteredPendingLeaveArr = [];
  semifilteredVPPendingLeaveArr = [];


  selectedLeave = '';
  computedLeaveMinutes='';

isDisabled=true

  constructor(public dialog: MatDialog,
  	private domSanitizer: DomSanitizer,
  	private global: GlobalService,
  	private http: Http, 
    public validationService:ValidationServiceService) { 

    this.LeaveHistoryConfig = {
      itemsPerPage: 20,
      currentPage: 1,
      totalItems: this.LeaveHistoryCtr
    };

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.ctr};

     // console.log(this.validationService.validateTime('12:01'))
  }

  ngOnInit() {
  	// console.log("Active School Year: "+this.global.syear)
  }

  tabbing=0;
  getindex(tab){
    this.tabbing = tab.index;
  }



  pageChanged(event){
    this.config.currentPage = event;
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
  keyDownFunction(event) {
    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') 
    {
      if (this.id != '') 
      {
        this.filteredPendingLeaveArr = [];
        this.filteredVPPendingLeaveArr = [];
        this.filteredLeaveHistoryArr = [];
        this.getEmpInfo();
        this.getpendingLeaves();

      }
      else
      {
        
      }
    // code...
    }
  }
  getEmpInfo(){
  	this.global.swalLoading('Loading Person Information');
        this.http.get(this.global.api+'Employee/'+this.id,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            //console.log(res);
            this.global.swalClose();
            if (res.message != "IDNumber does not exist.") {
              this.name = res.data[0].fullname;
              this.position = res.data[0].position;
              this.idnumber=res.data[0].idnumber;
              this.dtridnum="DTR ID#: "+res.data[0].dtrid;
              
              this.http.get(this.global.api+'Employee/PersonalInfo/'+this.id,this.global.option)
  		        .map(response => response.json())
  		        .subscribe(res => {
  		          this.pinfo = res.data;
  		          //console.log(res.data);
  		          this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
  		          this.signature = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.signature);
  		          
  		          this.getLeaveCredit();
  		          this.getLeaveHistory()
  		        },Error=>{
  		                  //console.log(Error);
  		                  this.global.swalAlertError();
  		                  //console.log(Error)
  		        });
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

  getLeaveCredit(){
  	this.http.get(this.global.api+'LeaveManagement/LeaveCredit/'+this.id,this.global.option)
			        .map(response => response.json())
			        .subscribe(res => {
			          this.linfo = res.data;
			          this.sickleave = res.data.sickleave;
			          this.slDay = res.data.slDay;
			          this.slHour = res.data.slHour;
			          this.slMin = res.data.slMin;
			          this.vacationleave = res.data.vacationleave;
			          this.vlDay = res.data.vlDay;
			          this.vlHour = res.data.vlHour;
			          this.vlMin = res.data.vlMin;
			          this.matrix = res.data.matrix;
			        },Error=>{
			                  //console.log(Error);
			                  this.global.swalAlertError();
			                  //console.log(Error)
			        });
  }

  getLeaveHistory(){
  	
    this.http.get(this.global.api+'LeaveManagement/Leaves/'+this.id+'?schoolYear=2020211',this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.LHistoryArr = res.data;
                // if(this.LHistoryArr.length != 0 || this.LHistoryArr.length != null)
                if(res.data != null)
                  this.filterLeaveHistory(this.LHistoryArr);
                

                },Error=>{
                        //console.log(Error);
                        this.global.swalAlertError();
                        //console.log(Error)
              });
  }

  filterLeaveHistory(param){
    for (var i = 0; i < param.length; ++i) {
      if ((param[i].actionTakenByAdmin != null||param[i].actionTakenByAdmin != '')&&(param[i].cancelledRemarks_HoF != null||param[i].cancelledRemarks_HoF != '')) {
        this.filteredLeaveHistoryArr.push(param[i])
      }
    }
  }

  getpendingLeaves(){
    // this.http.get(this.global.api+'LeaveManagement/Leaves/'+this.id+'?schoolYear='+this.global.syear,this.global.option)
    this.http.get(this.global.api+'LeaveManagement/Leaves/'+this.id+'?schoolYear=2020211',this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        this.pendingLeaveArr = res.data;
        if(res.data!=null){
          this.filterLeave(this.pendingLeaveArr);
          this.pendingLeaveTrigger = this.filteredPendingLeaveArr.length;
        }
        
      },Error=>{
          this.global.swalAlertError();
        });
  }

  filterLeave(param){
    this.validateHeadPosition();
    var that = this;
    var atype = ''
    this.semifilteredPendingLeaveArr = [];
    this.semifilteredVPPendingLeaveArr = [];

    param.forEach(function(row){
      if((row.approvedByHeadOfOffice==null||row.approvedByHeadOfOffice=='')&&(row.cancelledRemarks_HoF == null|| row.cancelledRemarks_HoF == '')){
          that.semifilteredPendingLeaveArr.push(row)
          atype = 'HoF'
      }
      else{
        if((row.actionTakenByAdmin==null||row.actionTakenByAdmin=="")&&(row.cancelledRemarks_HoF == null|| row.cancelledRemarks_HoF == ''))
          that.semifilteredVPPendingLeaveArr.push(row);
          atype = 'VP'
      }
    });

    // if(atype == 'HoF'){
       // console.table(this.semifilteredPendingLeaveArr)
      // console.table(this.transform(semifilteredPendingLeaveArr))
      this.semifilteredPendingLeaveArr=this.leaveSort(this.semifilteredPendingLeaveArr)
      this.filteredPendingLeaveArr = this.transform(this.semifilteredPendingLeaveArr)

      this.semifilteredVPPendingLeaveArr=this.leaveSort(this.semifilteredVPPendingLeaveArr)
      this.filteredVPPendingLeaveArr = this.transform(this.semifilteredVPPendingLeaveArr)
      console.log(this.filteredPendingLeaveArr)
    // }
    // else{
    //   that.filteredVPPendingLeaveArr=this.leaveSort(that.filteredVPPendingLeaveArr)
    //   console.log(that.filteredVPPendingLeaveArr)
    // }

  }
  ctrr = 0;
  transform(array) {
      // console.log('dito')
      var that = this
      var newArray = [];
      this.ctrr= 0
      var startdate = ''
      var lastdate = ''
      array.forEach(item => {
        const index = newArray.findIndex(
          i => i.dateFiled === item.dateFiled 
          && i.leaveDescription === item.leaveDescription 
          && i.leaveTypeDescription === item.leaveTypeDescription
          && that.gettime(i.startDate) === that.gettime(item.startDate)
          && that.gettime(i.endDate) === that.gettime(item.endDate)
        );
        // console.log(item.startDate.substring(0,10))
        
        if(index >= 0) {
          // newArray1.push(item);
          lastdate = item.startDate.substring(0,10)
          newArray[that.ctrr-1].daterange = startdate+' to\n'+lastdate
          newArray[that.ctrr-1].totalMinutes+=item.totalMinutes
          lastdate = ''
        }else {
          // console.log(newArray[ctr].daterange)
          startdate = item.startDate.substring(0,10)
          newArray.push({
            'actionId': item.actionId,
            'actionTaken': item.actionTaken,
            'actionTakenByAdmin': item.actionTakenByAdmin,
            'adminRemarks': item.adminRemarks,
            'approvedByHeadOfOffice': item.approvedByHeadOfOffice,
            'cancelled': item.cancelled,
            'cancelledRemarks': item.cancelledRemarks,
            'cancelledRemarks_HoF': item.cancelledRemarks_HoF,
            'dateActionTakenByAdmin': item.dateActionTakenByAdmin,
            'dateApprovedHeadOfOffice': item.dateApprovedHeadOfOffice,
            'dateCancelled': item.dateCancelled,
            'dateCancelled_HoF': item.dateCancelled_HoF,
            'dateFiled': item.dateFiled,
            'endDate': item.endDate,
            'headOfOfficeRemarks': item.headOfOfficeRemarks,
            'leaveDescription': item.leaveDescription,
            'leaveId': item.leaveId,
            'leaveTypeDescription': item.leaveTypeDescription,
            'leaveTypeId': item.leaveTypeId,
            'officeId': item.officeId,
            'remarks': item.remarks,
            'retracted': item.retracted,
            'startDate': item.startDate,
            'sy':item.sy,
            'totalMinutes': item.totalMinutes,
            'daterange': setDateRange(startdate,lastdate)
          });
          that.ctrr+=1
        }
      });
      // console.table(newArray)
      function setDateRange(sdate,ldate){
        if(ldate != ''){
          return startdate+' to\n'+lastdate
        }else{
          return sdate
        }
      }
      return newArray;
    }
  leaveSort(data){
    return data.sort((a, b) => {
      if(a.dateFiled === b.dateFiled && a.leaveDescription === b.leaveDescription && a.leaveTypeDescription === b.leaveTypeDescription){
        return <any>new Date(a.startDate) - <any>new Date(b.startDate);
      }
    });
  }

  gettime(x){
    return x.substring(11,16)
  }

  validateAction(a_Action,b_Action){
    console.log(a_Action+'\n'+b_Action)
    if(b_Action != null || b_Action != ''){
      return 'Cancelled';
    }
    else{
      return a_Action;
    }
  }
  validateRemark(remarks,action){
    if(action!= null || action != ''){
      return action
    }else{
      return remarks
    }
  }


  validateTimeAMPM(x){
    if(parseInt(x.substring(0,2))>=12){
      if((parseInt(x.substring(0,2))>=13)&&(parseInt(x.substring(0,2))<=24)){
        x = '0'+(parseInt(x.substring(0,2))-12).toString()+x.substring(2,5)+' PM'
      }
      else{
        x = (12).toString()+x.substring(2,5)+' PM'
      }
    }
    else if(parseInt(x.substring(0,2))==0){
      x = (12).toString()+x.substring(2,5) +' PM'
    }
    else
      return x+' AM'

    return x;
  }



  editLeaveOpenDialog(): void {
    if (this.id=='') {
      this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }else {
      const dialogRef = this.dialog.open(EditLeaveComponent, {
        width: '600px', disableClose: false,data:{selectedID:this.idnumber}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {
          //console.log(result.result)

          if (result.result!=undefined) {
            this.getLeaveCredit();
          }
        }
      });
    }
   }

  compare(i,x):boolean{
    if(i>0){
      if(x.dateFiled == this.filteredPendingLeaveArr[i-1].dateFiled && 
          x.leaveTypeId == this.filteredPendingLeaveArr[i-1].leaveTypeId && 
          x.leaveDescription == this.filteredPendingLeaveArr[i-1].leaveDescription){

        return true;
      }
      else return false;
    }else return false;
  }


  clear(){
  	this.id='';
    this.image = 'assets/noimage.jpg';
    this.signature = 'assets/nosignature.jpg';
    this.pinfo = ''
    this.name = '';
    this.position = '';
    this.idnumber='';
    this.dtridnum='';
  }

  ///////////////////////PAGINATION FUNCTIONS////////////////
    LeaveHistoryPageChanged(event){
      this.LeaveHistoryConfig.currentPage = event;
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//EMPLOYEE VALIDATION///////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//LEAVE APPROVAL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  currentSL = [];
  currentVL = [];
  // dateofleaveArr = [];
  leavetoApprove = [];
  actionType = '';
  actionTakenHoF(i,param): void {
    console.log(param.actionTaken)
    console.log(param)
    this.leavetoApprove = [];
    this.leavetoprint = [];
    var that = this; 

    if(this.VPAdmin == true){
      this.semifilteredVPPendingLeaveArr.forEach(row=>{
        if(param.dateFiled == row.dateFiled && param.leaveTypeId == row.leaveTypeId && param.leaveDescription == row.leaveDescription){
          that.leavetoApprove.push(row);
        }
      });

      this.filteredVPPendingLeaveArr.forEach(row=>{
        if(param.dateFiled == row.dateFiled && param.leaveTypeId == row.leaveTypeId && param.leaveDescription == row.leaveDescription){
          that.leavetoprint.push(row);
        }
      });
      this.actionType = 'VPAdmin';

    }else{
      this.semifilteredPendingLeaveArr.forEach(row=>{
        if(param.dateFiled == row.dateFiled && param.leaveTypeId == row.leaveTypeId && param.leaveDescription == row.leaveDescription){
          that.leavetoApprove.push(row); 
        }
      });
      this.filteredPendingLeaveArr.forEach(row=>{
        if(param.dateFiled == row.dateFiled && param.leaveTypeId == row.leaveTypeId && param.leaveDescription == row.leaveDescription){
          that.leavetoprint.push(row); 
        }
      });
      this.actionType = 'HoF';
    }

    
    // console.log(this.leavetoApprove)
    // console.log(this.leavetoprint)
    this.currentSL.push({
      'sslDay': this.slDay,
      'sslHour': this.slHour,
      'sslMin': this.slMin,
    });
    this.currentVL.push({
      'vvlDay': this.vlDay,
      'vvlHour': this.vlHour,
      'vvlMin': this.vlMin,
    });
    if (this.id=='') {
      this.global.swalAlert("Please check the ID number of the employee.","",'warning');
    }else {
      const dialogRef = this.dialog.open(HeadofofficeComponent, {
        width: '816px', disableClose: false,data:{printdata:this.leavetoprint,selectedData:this.leavetoApprove,selectedID:this.id,selectedName:this.name,currentSL:this.currentSL,currentVL:this.currentVL,type:this.actionType}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result!=undefined) {
          //console.log(result.result)

          if (result.result=='success') {
            this.keyDownFunction('onoutfocus');
          }
        }
      });
    }
   }

  // approve(param){
  //   if(param == true){
  //     this.http.put(this.global.api+'/LeaveManagement/Leave/ActionTaken/'+this.selectedLeave,{
  //             "IdNumber": this.id,
  //             "ActionTaken": 1,
  //             "ApprovedByHeadOfOffice": this.global.requestid(),
  //             "TotalMinutes": parseInt(this.computedLeaveMinutes)
  //           },this.global.option)
  //                               .map(response => response.json())
  //                               .subscribe(res => {
  //                                 // console.log(res)
  //                                 //this.global.swalClose();
  //                                 this.global.swalAlert("Success","",'success');
  //                                 this.getpendingLeaves();    
  //                               },Error=>{
  //                                 this.global.swalAlertError();
  //                                 console.log(Error)
  //                               });
  //   this.selectedLeave = '';
  //   this.computedLeaveMinutes = '';
  //   }

  // }
//LEAVE APPROVAL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

VPapprove(parambool,x){
  console.log(parambool)
}

///////////////////////////TRIGGERS//////////////////////////////////////////
  routetrigger = false;
  validateRoute(param):boolean{
    if((param.dateApprovedHeadOfOffice==null || param.dateApprovedHeadOfOffice == "")&&(param.actionTakenByAdmin == null || param.actionTakenByAdmin == "")){
      this.routetrigger = false;
      return false
    }
    else{
      this.routetrigger = true;
      return true;
    }
  }

  actionTrigger = false;
  validateActionTaken(param):boolean{
    if(param == '' || param == null){
      this.actionTrigger = false;
      return true
    }
    else{
      this.actionTrigger = true;
      return false;
    }
  }

  setdata(param){
    this.selectedLeave = param.leaveId;

    // var starttime = param.startDate.substring(11,16);
    // var endtime = param.endDate.substring(11,16)

    var startDate = new Date(param.startDate)
    var endDate = new Date(param.endDate)

    var diff = ((startDate.getTime() - endDate.getTime())/1000);
    diff/=60;

    this.computedLeaveMinutes = Math.abs(Math.round(diff)).toString();
  }

  validateHeadPosition(){

    this.http.get(this.global.api+'Employee/'+this.global.requestid(),this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        //console.log(res.data[0].position.toString().toLowerCase())
        if(res.data[0].position.toString().toLowerCase().includes('administration')){
          
          this.setVPAdmin(true)
        }
        else{
          this.setVPAdmin(false)
        }
      },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                //console.log(Error)
      });
    
    console.table(this.VPAdmin)
    
  }

  setVPAdmin(param){
    console.log(param)
    this.VPAdmin = param;
  }


/*
//LEAVE APPROVAL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  keyDownFunction1(event) {
    
    if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') 
    {
      //console.log("1st")
      this.employeeDeptIDAr.length = 0;
      if (this.id1 != '') 
      {
        if(this.id1 == this.global.requestid()){
          this.proceedProc();
        }else{
          this.checkAppointment();
        }
      }
      else
      {
        // this.showContent = false;
      }
    // code...
    }
  }

  proceedProc(){

    this.filteredPendingLeaveArr = []
    this.getEmployeeleaves();
  }

  //EMPLOYEE VALIDATION//////////////////////////////////////////////////////////////////
    result
    checkAppointment(){
      this.http.get(this.global.api+'Employee/Appointment/'+this.id1,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
              // this.appointmentArr=res.data;
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
  //EMPLOYEE VALIDATION//////////////////////////////////////////////////////////////////

  //PROCESS//////////////////////////////////////////////////////////////////////////////
    getEmployeeleaves(){
        // this.http.get(this.global.api+'LeaveManagement/Leaves/'+this.id1+'?schoolYear='+this.global.syear,this.global.option)
        this.http.get(this.global.api+'LeaveManagement/Leaves/'+this.id1+'?schoolYear=2020211',this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.pendingLeaveArr = res.data;
          this.filterLeave(this.pendingLeaveArr);
          console.log(this.filteredPendingLeaveArr.length)
          this.pendingLeaveTrigger = this.filteredPendingLeaveArr.length;
          //console.log(this.pendingLeaveTrigger);
        },Error=>{
            this.global.swalAlertError();
          });
    }

    filterLeave(param){
      for (var i = 0; i < param.length; ++i) {
        if (param[i].actionTakenByAdmin == null) {
          this.filteredPendingLeaveArr.push(param[i])
        }
      }
    }
  //PROCESS//////////////////////////////////////////////////////////////////////////////
//LEAVE APPROVAL///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
}
