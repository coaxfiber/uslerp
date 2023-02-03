import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddressLookupComponent } from './../../academic/student-information/address-lookup/address-lookup.component';
import { FamilyBackgroundComponent } from './family-background/family-background.component';
import { EducationalBackgroundComponent } from './educational-background/educational-background.component';
import { FamilyBackgroundGuardianComponent } from './family-background-guardian/family-background-guardian.component';
import { EducationalbackgroundAddComponent } from './../../hris/employee-information/educationalbackground-add/educationalbackground-add.component';
import { EducationalbackgroundUpdateComponent } from './../../hris/employee-information/educationalbackground-update/educationalbackground-update.component';
import { FamilyBackgroundFamilymemberComponent } from './family-background-familymember/family-background-familymember.component';

import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';
import Swal from 'sweetalert2';import { map } from 'rxjs/operators';
const swal = Swal;
import {Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.scss']
})
export class StudentInformationComponent implements OnInit {
  image:any = 'assets/noimage.jpg';
  id='';
  checkId='';
  lrno='';
  fname='';
  mname='';
  lname='';
  suffix='';
  //basic
  gender='';
  cstatus='';
  bdate='';
  nationality='';
  religion='';
  placeob='';
  //contact
  tno='';
  cno='';
  email='';

  homeaddress='';
  street='';
    boardingaddress='';
    street2='';
    permPSGC
    currPSGC

    familyarray
    educarray

hidden=true

  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http) { }

  clear(){
  	this.image = 'assets/noimage.jpg';
    this.id='';
    this.checkId='';
    this.lrno='';
    this.fname='';
    this.mname='';
    this.lname='';
    this.suffix='';
    //basic
    this.gender='';
    this.cstatus='';
    this.bdate='';
    this.nationality='';
    this.religion='';
    this.placeob='';
    //contact
    this.tno='';
    this.cno='';
    this.email='';

    this.homeaddress='';
    this.street='';
    this.boardingaddress='';
    this.street2='';


  }

  nearestneighbor=''
  medicaladvise=''
  healthproblems=''
  pdefects=''
  contest=''
  sabilities=''
  birthorder=''
  nofamily=''

  quickSavePersonalInfo(){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }
    else{
    this.global.swalLoading('Updating Basic Info');
    this.http.put(this.global.api+'Student/PersonalInfo?idNumber='+this.checkId,{
           "numberOfSibling": this.nofamily,
            "birthOrder": this.birthorder,
            "skillTalent": this.sabilities,
            "contestToJoin": this.contest,
            "physicalDefect": this.pdefects,
            "healthProblem": this.healthproblems,
            "medicalAdvise": this.medicaladvise,
            "nearestNeighbor": this.nearestneighbor
    },this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.global.swalSuccess(res.message);
        },Error=>{
          this.global.swalAlertError(Error);
        });
    }
  }
updatenamevar=false
updatename(){
  if (this.updatenamevar==true) 
    this.updatenamevar = false
  else
    this.updatenamevar = true
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
    let date = new Date(this.bdate).toLocaleString();
        this.global.swalLoading('Updating Student...');
        this.http.put(this.global.api+'Student/PersonInfo' ,{
          'lrNumber':this.lrno,
          'firstName':this.fname,
          'middleName':this.mname,
          'lastName':this.lname,
          'suffixName':this.suffix,
          'gender':this.gender,
          'civilStatus':this.cstatus,
          'dateOfBirth':date,
          'mobileNo':this.cno,
          'telNo':this.tno,
          'idNumber':this.id,
          'idNo': this.id,
          "personType": 0,
          "nationality": this.nationality,
          "religion": this.religion,
          "emailAddress": this.email,
        },this.global.option)
                              .map(response => response.json())
                              .subscribe(res => {
                                this.global.swalSuccess(res.message);
                                this.updatenamevar = false
                              },Error=>{
                                this.global.swalAlertError(Error);
                              });
  }else
  {
    this.global.swalAlert('The Following error has Occured',error,'error');
  }

}
    openDialog(lookup): void {
        const dialogRef = this.dialog.open(AddressLookupComponent, {
          width: '500px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            if (lookup==1) {
              this.permPSGC = result.data;
              this.homeaddress = result.result;
            }else{
              this.currPSGC = result.data;
              this.boardingaddress = result.result;
            }
          }
        });
      } 

      studentlookup(): void {
        const dialogRef = this.dialog.open(StudentLookupComponent, {
          width: '600px', disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            this.id = result.result;
            this.keyDownFunction('onoutfocus')
          }
        });
      }

    openDialog2(lookup): void {
        if (this.checkId!=this.id||this.id=='') {
          this.global.swalAlert("Please Check the ID number of the Student","",'warning');
        }else {
        const dialogRef = this.dialog.open(FamilyBackgroundComponent, {
          width: '600px', disableClose: false, data: {id:this.checkId,kind:lookup},
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            if (result.result=='cancel') {
            }
            if (result.result=='saved') {
              this.loadfambg();
            }
          }
        });
        }
      }

    openDialog3(educBcgData,seek): void {
        if (this.checkId!=this.id||this.id=='') {
          this.global.swalAlert("Please Check the ID number of the Student","",'warning');
        }else {
          const dialogRef = this.dialog.open(EducationalBackgroundComponent, {
            width: '600px', disableClose: false,data:{data:educBcgData,id:this.checkId,seek:seek},
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result!=undefined) {
              if (result.result!='cancel') {
                if (result.result=='nice') {
                  this.loadeducbg();
                }
              }
            }
          });
        }
      }

    openDialogguardian(lookup): void {
        if (this.checkId!=this.id||this.id=='') {
          this.global.swalAlert("Please Check the ID number of the Student","",'warning');
        }else {
          const dialogRef = this.dialog.open(FamilyBackgroundGuardianComponent, {
          width: '600px', disableClose: false, data: {id:this.checkId,kind:lookup},
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result!=undefined) {
            if (result.result=='cancel') {
            }
            if (result.result=='saved') {
              this.loadfambg();
            }
          }
          });
        }
      }


    openDialogfamilymember(lookup): void {
        if (this.checkId!=this.id||this.id=='') {
          this.global.swalAlert("Please Check the ID number of the Student","",'warning');
        }else {
        const dialogRef = this.dialog.open(FamilyBackgroundFamilymemberComponent, {
          width: '600px', disableClose: false, data: {id:this.checkId,kind:lookup},
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            if (result.result=='cancel') {
            }
            if (result.result=='saved') {
              this.loadfambg();
            }
          }
        });
        }
      }

      openedit(x,y){
        if (y=='Mother'||y=='Father') {
          this.openDialog2(x)
        }
        else if (y=='Brother/Sister'||y=='Guardian'||y=='Cousin'||y=='Uncle/Aunt'||y=='Grand Parent'||y=='StepFather'||y=='StepMother'||y=='Spouse'){
          this.openDialogguardian(x)
        }else{
          this.openDialogfamilymember(x)
        }
      }

      cForm137A=false
      cForm138=false
      otr=false
      cnso=false
      marriageContract=false
      tableArr2
      g=0

      studinfo
      userdemog
      userinfo
  keyDownFunction(event){

  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
  	if (this.id != '') {
                      
    this.global.activeid=this.id 
    this.global.swalLoading('Loading Student Information');
    this.http.get(this.global.api+'Student/'+this.id+'/'+this.global.syear+'/'+this.global.domain,this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.http.get(this.global.api+'Student/PersonInfo/'+this.id,this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.userinfo = res.data
            if (res.data!=null) {
              this.lrno=res.data.lrNumber;
            }
          });
          this.global.swalClose();
          if (res.message=="Student found.") {
            if (res.data.level=='denied') {
                this.global.swalAlert('ID Number: '+this.id+' is not a '+this.global.domain+' student','','warning')
              // code...
            }else{
              this.hidden=false
              this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
              this.checkId=res.data.idNumber;
              this.fname=res.data.firstName;
              this.mname=res.data.middleName;
              this.lname=res.data.lastName;
              this.suffix=res.data.suffixName;
              this.gender=res.data.gender;
              this.cstatus=res.data.civilStatus;
              this.bdate=res.data.dateOfBirth;
              this.placeob=res.data.placeOfBirth;

                this.http.get(this.global.api+'Student/Demography/'+this.id+'/'+this.global.syear,this.global.option)
                .map(response => response.json())
                .subscribe(res => {
                  if (res.message=="Student demographical information found.") {
                    this.userdemog=res.data
                    this.religion=res.data.religion;
                    this.nationality=res.data.nationality;
                    this.cForm137A=res.data.cForm137A
                    this.cForm138=res.data.cForm138
                    this.otr=res.data.otr
                    this.cnso=res.data.cnso
                    this.marriageContract=res.data.marriageContract

                    this.tno=res.data.telNo;
                    this.cno=res.data.mobileNo;
                    this.email=res.data.emailAdd;
                    this.homeaddress = res.data.homeAddress;
                    this.street = res.data.permNoStreet;
                    this.boardingaddress=res.data.currentAddress;
                    this.street2=res.data.currNoStreet;
                    this.permPSGC=res.data.permPSGC;
                    this.currPSGC=res.data.currPSGC;

                    this.nearestneighbor=res.data.nearestNeighbor
                    this.medicaladvise=res.data.medicalAdvise
                    this.healthproblems=res.data.healthProblem
                    this.pdefects=res.data.physicalDefect
                    this.contest=res.data.contestToJoin
                    this.sabilities=res.data.skillTalent
                    this.birthorder=res.data.birthOrder
                    this.nofamily=res.data.numberOfSibling

                    this.form137A=(res.data.form137A =="True")
                    this.form137E=(res.data.form137E =="True")
                    this.nso = (res.data.nso =="True")
                    this.reportCard=(res.data.reportCard =="True")
                    this.baptism=res.data.baptism
                    this.confession=res.data.confession
                    this.communion=res.data.communion
                    this.religiousInstruction=res.data.religiousInstruction
                    this.confirmation=res.data.confirmation

                    if (res.data.sgfName==null)
                      res.data.sgfName=''
                    if (res.data.lsaName==null)
                      res.data.lsaName=''

                    if (res.data.sgfid==null)
                      res.data.sgfid=''
                    if (res.data.lsaid==null)
                      res.data.lsaid=''

                    this.sgfId=res.data.sgfid.toString()
                    this.sgfsy=res.data.sgfsy
                    this.sgfName=res.data.sgfName
                    this.sgfAddress=res.data.sgfAddress
                    this.lsaName=res.data.lsaName

                    this.myControl.setValue(res.data.sgfName);
                    this.myControl2.setValue(res.data.lsaName);

                    this.lsaAddress=res.data.lsaAddress
                    this.slaId=res.data.lsaid.toString()
                    this.slaSy=res.data.lsasy
                    this.average=res.data.average

                    if (this.global.checkaccess(':Student:EnrollmentHistoryGet')) {
                      this.http.get(this.global.api+'Student/EnrollmentHistory/'+this.checkId,this.global.option)
                          .map(response => response.json())
                          .subscribe(res => {
                            this.tableArr2=res.data;this.g=0
                            if(this.global.domain=="HIGHSCHOOL"){
                               this.http.get(this.global.api+'Student/'+this.checkId+'/'+this.global.checknosemester(this.global.syear)+'/'+this.global.domain,this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  console.log(res)
                                  this.studinfo = res.data
                                  this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
                                })
                            }
                          },Error=>{this.g=0
                              this.global.swalAlertError(Error);
                          });
                    }
                  }else{
                  this.clear();
                  }
                },Error=>{
                  this.global.swalAlertError(Error);
                });

                this.loadeducbg();
                this.loadfambg();
           }
          }else{
          this.global.swalAlert(res.message,'','warning')
          this.clear();

          }
          
        },Error=>{
          this.global.swalAlert("Invalid ID Number","",'warning');
        });
      }
    }
  }

getformat(a){
     var x='';
     if (a.substring(6)!='') {
       if (a.substring(6)=='1')
       x="1st Semester";
     else if (a.substring(6)=='2')
       x="2nd Semester";
     else
       x="Summer";
     }
     
     var y = parseInt(a.substring(0,4)) + 1;

     a = x +' SY '+ a.substring(0,4) + "-" + y
        return a
      }
      
  getindex(x){
    var index = this.options.indexOf(x);
    if (this.arrayschool[index].address == null) {
      this.sgfAddress = ''
    }else
      this.sgfAddress = this.arrayschool[index].address
    this.sgfId = this.arrayschool[index].companyID
  }
  getindex2(x){
    var index = this.options2.indexOf(x);
    if (this.arrayschool[index].address == null) {
      this.lsaAddress = ''
    }else
      this.lsaAddress = this.arrayschool[index].address
    this.slaId = this.arrayschool[index].companyID
  }
  
  sibling
  loadfambg(){
    this.http.get(this.global.api+'Student/FamilyBG/'+this.id,this.global.option)
    .map(response => response.json())
    .subscribe(res => {
      this.familyarray=res.data 
      this.sibling=[]
      for (var i = 0; i < res.data.length; ++i) {
        if(res.data[i].relDesc=='Sibling')
          this.sibling.push(res.data[i])
      }
    });
  }
  loadeducbg(){
    this.http.get(this.global.api+'Student/EducBG/'+this.id,this.global.option)
      .map(response => response.json())
      .subscribe(res => {
        this.educarray=res.data
      });
  }

  quickSaveBasicInfo(){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }
    else{
    this.global.swalLoading('Updating Basic Info');
    let date = new Date(this.bdate).toLocaleString();
    //console.log(JSON.stringify(date));
    this.http.put(this.global.api+'Student/BasicInfo?idNumber='+this.checkId ,{
           "gender": this.gender,
      "civilStatus": this.cstatus,
      "nationality": this.nationality,
      "religion": this.religion,
      "dateOfBirth": date,
      "placeOfBirth": this.placeob
    },this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.global.swalSuccess(res.message);
        },Error=>{
          this.global.swalAlertError(Error);
        });
    }
  }

  quickSaveContactInfo(){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }
    else{
    this.global.swalLoading('Updating Basic Info');
    this.http.put(this.global.api+'Student/ContactInfo?idNumber='+this.checkId ,{
            "mobileNo": this.cno,
            "telNo": this.tno,
            "emailAddress": this.email,
            "permAddressNoStreet": this.street,
            "permAddressPSGC": this.permPSGC,
            "currAddressNoStreet": this.street2,
            "currAddressPSGC": this.currPSGC,
            "landLordLady": '',
            "boardingPhoneNo": ''
          },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message);
              },Error=>{
                this.global.swalAlertError(Error);
              });
    }
  }

  quickSaveCollegeEnrollmentRequirement(){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }else{
         this.http.put(this.global.api+'Student/CollegeEnrollmentRequirement/'+this.checkId ,{
              "form137A": this.cForm137A,
              "form138": this.cForm138,
              "nso": this.cnso,
              "otr": this.otr,
              "marriageContract": this.marriageContract
          },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message);
              },Error=>{
                this.global.swalAlertError(Error);
              });
     }
  }

  form137A=false
  form137E=false
  nso = false
  reportCard=false
  quickSaveEnrollmentRequirement(){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }else{
      this.global.swalLoading('')
         this.http.put(this.global.api+'Student/EnrollmentRequirement/'+this.checkId+'/'+this.global.syear ,{
                "reportCard": this.reportCard,
                "nso": this.nso,
                "form137A": this.form137A,
                "form137E": this.form137E
          },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message);
              },Error=>{
                this.global.swalAlertError(Error);
              });
     }
  }

  baptism=false
  confession=false
  communion=false
  religiousInstruction=false
  confirmation=false
  quickSaveSacramentsReceivedPut(){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }else{
         this.http.put(this.global.api+'Student/SacramentsReceived/'+this.checkId ,{
              "baptism": this.baptism,
              "confession":  this.confession,
              "communion":  this.communion,
              "confirmation":  this.confirmation,
              "instruction":  this.religiousInstruction
          },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message);
              },Error=>{
                this.global.swalAlertError(Error);
              });
     }    
  }

  sgfId=''
  sgfName=''
  sgfsy=''
  slaId=''
  slaSy=''
  lsaAddress=''
  lsaName=''

  average=''
  sgfAddress=''
 quickSaveEducationalBGHSPut(){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }else{
      if (this.average==''||this.average==null) {
       this.average='0'
      }
      if (this.myControl.value=='') {
        this.sgfAddress=''
        this.sgfId=''
      }
      if (this.myControl2.value=='') {
        this.lsaAddress=''
        this.slaId=''
      }
      if (this.sgfsy==null) {
       this.sgfsy=''
      }
      if (this.slaSy==null) {
       this.slaSy=''
      }
         this.http.put(this.global.api+'Student/EducBGHS/'+this.checkId ,{
              "sgfId": this.sgfId,
              "sgfSy": this.sgfsy,
              "sgfAv": this.average,
              "slaId": this.slaId,
              "slaSy": this.slaSy
          },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message);
              },Error=>{
                this.global.swalAlertError(Error);
              });
     }    
 }

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  options: string[] =[]


  myControl2 = new FormControl();
  filteredOptions2: Observable<string[]>;
  options2: string[] =[]


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter2(value: string): string[] {
    const filterValue2 = value.toLowerCase();
    return this.options2.filter(option => option.toLowerCase().includes(filterValue2));
  }


  arrayschool

  ngOnInit() {
    this.http.get(this.global.api+'PublicAPI/Schools',this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {
                        this.arrayschool =res
                        for (var i = 0; i < this.arrayschool.length; ++i) {
                            this.options.push(this.arrayschool[i].companyName)
                            this.options2.push(this.arrayschool[i].companyName)
                        }
                        if (this.global.activeid!='') {
                        this.id=this.global.activeid
                        this.keyDownFunction('onoutfocus')
                        }
                      });

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    this.filteredOptions2 = this.myControl2.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter2(value))
      );



  }
deletefamily(id){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }else
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Delete Family Member Info','Family Member Info has been Removed','deletefamily',id);
}
deleteeduc(id){
    if (this.checkId!=this.id||this.id=='') {
      this.global.swalAlert("Please Check the ID number of the Student","",'warning');
    }else
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Delete Educational Background','Educational Background has been Removed','deleteeb',id);
}
  swalConfirm(title,text,type,button,successm,remove,id){
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
          if (remove=='deletefamily') {
          this.global.swalLoading('');
            this.http.delete(this.global.api+'Student/FamilyMember/'+this.checkId+'/'+id,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(successm);
                this.loadfambg();
              },Error=>{
                this.global.swalAlertError(Error);
              });
          }
          else 
          if (remove=='deleteeb') {
          this.global.swalLoading('');
            this.http.delete(this.global.api+'Student/EducBG/'+id+'/'+this.checkId,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(successm);
                this.loadeducbg();
              },Error=>{
                this.global.swalAlertError(Error);
              });
          }
        }
      })
  }



Getdatab4pdf(){
  this.global.swalLoading('')
 
  if(this.familyarray.length!=0)
    this.getfamilydetails(0,this.familyarray[0].relDesc)
  else
    this.generatePDF()
}
nonull(x){
  if (x==null||undefined==x)
    return ''
  return x
}
getgrade(x){
  return x+6
}
getwordgender(x){
  if(x=="M")
    return 'Male'
  return 'Female'
}
getfamilydetails(x,rel){
  if(x<this.familyarray.length){
   this.http.get(this.global.api+'Student/Parent?parentId='+this.familyarray[x].memberIdNumber,this.global.option)
    .map(response => response.json())
    .subscribe(res => {
      if(rel!=undefined&&res.data!=null){
        if(rel.toLowerCase()=='father'){
          this.father={
              parentName: res.data.parentName,
              cellphoneNo: res.data.cellphoneNo,
              landlineNo: res.data.landlineNo,
              occupation: res.data.occupation,
              officeAddress: res.data.officeAddress,
              relID: res.data.relID,
              ofw:res.data.ofw,
              status:res.data.status
            }
        }else
        if(rel.toLowerCase()=='mother'){
          this.mother={
              parentName: res.data.parentName,
              cellphoneNo: res.data.cellphoneNo,
              landlineNo: res.data.landlineNo,
              occupation: res.data.occupation,
              officeAddress: res.data.officeAddress,
              relID: res.data.relID,
              ofw:res.data.ofw,
              status:res.data.status
            }
        }
        else{
          this.guardian={
              parentName: res.data.parentName,
              cellphoneNo: res.data.cellphoneNo,
              landlineNo: res.data.landlineNo,
              occupation: res.data.occupation,
              officeAddress: res.data.officeAddress,
              relID: res.data.relID,
              ofw:res.data.ofw,
              status:rel
            }
        }
      }
      console.log(this.familyarray[x+1])
      if(this.familyarray[x+1]==undefined)
       this.getfamilydetails(x+1,'')
      else
       this.getfamilydetails(x+1,this.familyarray[x+1].relDesc)
   },Error=>{
       this.global.swalAlertError(Error);
   });
  }else{
    this.generatePDF()
  }
}


father={
  parentName: null,
  cellphoneNo: null,
  landlineNo: null,
  occupation: null,
  officeAddress: null,
  ofw:null,
  relID: null,
  status:null
}
mother={
  parentName: null,
  cellphoneNo: null,
  landlineNo: null,
  occupation: null,
  officeAddress: null,
  ofw:null,
  relID: null,
  status:null
}
guardian={
  parentName: null,
  cellphoneNo: null,
  landlineNo: null,
  occupation: null,
  officeAddress: null,
  ofw:null,
  relID: null,
  status:null
}

fields=[]
generatePDF(){
    this.global.swalClose()
    //place this block of codes inside a function
    var SY = this.global.syDisplay(this.global.syear);
    var status
    if(this.tableArr2.length==1)
        status = {
            text: '√',
            absolutePosition: { x: 414, y: 110 },
            bold:true,fontSize:13,
          } 
    else 
      status = {
          text: '√',
          absolutePosition: { x: 363, y: 110 },
          bold:true,fontSize:13,
        } 
    if(this.studinfo.enrollmentType==2)
      status = {
          text: '√',
          absolutePosition: { x: 493, y: 110 },
          bold:true,fontSize:13,
        } 

    let reportcard 
    if(this.userdemog.reportCard=='True')
        reportcard = {
            text: '√',
            absolutePosition: { x: 257, y: 134 },
            bold:true,fontSize:13,
          } 
    else
        reportcard = {
            text: '√',
            absolutePosition: { x: 292, y: 134 },
            bold:true,fontSize:13,
          } 
    let nso
    if(this.userdemog.nso=='False')
        nso = {
            text: '√',
            absolutePosition: { x: 319, y: 146 },
            bold:true,fontSize:13,
          } 
    else
        nso = {
            text: '√',
            absolutePosition: { x: 285, y: 146 },
            bold:true,fontSize:13,
          } 

    let gender
    if(this.studinfo.gender=='F')
        gender = {
            text: '√',
            absolutePosition: { x: 473, y: 146 },
            bold:true,fontSize:13,
          } 
    else
        gender = {
            text: '√',
            absolutePosition: { x: 408, y: 146 },
            bold:true,fontSize:13,
          } 
    let elemschool
    let yeargrad
    let average
    let companyID
    for (var i2 = 0; i2 < this.educarray.length; ++i2) {
     if(this.educarray[i2].programName=='Primary Education'){
       elemschool=this.educarray[i2].schoolName
       yeargrad=this.educarray[i2].yearGraduated
       average=this.educarray[i2].otherInfo
       companyID=this.educarray[i2].companyID
     }
    }
    var bday:any = new Date(this.userinfo.dateOfBirth);
        var dd = String(bday.getDate()-1).padStart(2, '0');
        var mm = String(bday.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = bday.getFullYear();
        bday = mm + '/' + dd + '/' + yyyy;

    let fatherstatus
    if(this.father.status!=null){
      if(this.father.status=='S'){
        fatherstatus = {
            text: '√',
            absolutePosition: { x: 335, y: 380 },
            bold:true,fontSize:13,
          } 
      }
      if(this.father.status=='P'){
        fatherstatus = {
            text: '√',
            absolutePosition: { x: 115, y: 380 },
            bold:true,fontSize:13,
          } 
      }
      if(this.father.status=='A'){
        fatherstatus = {
            text: '√',
            absolutePosition: { x: 234, y: 380 },
            bold:true,fontSize:13,
          } 
      }
      if(this.father.status=='W'){
        fatherstatus = {
            text: '√',
            absolutePosition: { x: 380, y: 368 },
            bold:true,fontSize:13,
          } 
      }
      if(this.father.status=='X'){
        fatherstatus = {
            text: '√',
            absolutePosition: { x: 235, y: 368 },
            bold:true,fontSize:13,
          } 
      }
    }
    var fatherofw
      if(this.father.ofw){
        fatherofw = {
            text: '√',
            absolutePosition: { x: 90, y: 368 },
            bold:true,fontSize:13,
          } 
      }

      let motherstatus
    if(this.mother.status!=null){
      if(this.mother.status=='S'){
        motherstatus = {
            text: '√',
            absolutePosition: { x: 335, y: 451 },
            bold:true,fontSize:13,
          } 
      }
      if(this.mother.status=='P'){
        motherstatus = {
            text: '√',
            absolutePosition: { x: 115, y: 451 },
            bold:true,fontSize:13,
          } 
      }
      if(this.mother.status=='A'){
        motherstatus = {
            text: '√',
            absolutePosition: { x: 234, y: 451 },
            bold:true,fontSize:13,
          } 
      }
      if(this.mother.status=='W'){
        motherstatus = {
            text: '√',
            absolutePosition: { x: 380, y: 439 },
            bold:true,fontSize:13,
          } 
      }
      if(this.mother.status=='X'){
        motherstatus = {
            text: '√',
            absolutePosition: { x: 235, y: 439 },
            bold:true,fontSize:13,
          } 
      }
    }
    var motherofw
      if(this.mother.ofw){
        motherofw = {
            text: '√',
            absolutePosition: { x: 90, y: 439 },
            bold:true,fontSize:13,
          } 
      }
    var married
      if((this.mother.status=='M'&&this.father.status=='M')){
        married = {
            text: '√',
            absolutePosition: { x: 180, y: 473 },
            bold:true,fontSize:13,
          } 
      }else{
        married = {
            text: '√',
            absolutePosition: { x: 222, y: 473 },
            bold:true,fontSize:13,
          } 
      }
     var baptism
     if(this.userdemog.baptism){
         baptism = {
            text: '√',
            absolutePosition: { x: 218, y: 531 },
            bold:true,fontSize:13,
          } 
     }
     var confession
     if(this.userdemog.confession){
         confession = {
            text: '√',
            absolutePosition: { x: 312, y: 531 },
            bold:true,fontSize:13,
          } 
     }
      var  holyCommunion
      if(this.userdemog.communion){
         holyCommunion = {
            text: '√',
            absolutePosition: { x: 427, y: 531 },
            bold:true,fontSize:13,
          } 
     }
      var  confirmation
      if(this.userdemog.confirmation){
         confirmation = {
            text: '√',
            absolutePosition: { x: 521, y: 531 },
            bold:true,fontSize:13,
          } 
     }
      var  instruction
      if(this.userdemog.religiousInstruction){
         instruction = {
            text: '√',
            absolutePosition: { x: 303, y: 543 },
            bold:true,fontSize:13,
          } 
     }else 
         instruction = {
            text: '√',
            absolutePosition: { x: 337, y: 543 },
            bold:true,fontSize:13,
          } 

      var sibling=[]
      var lastdigit=543
      for (var i5 = 0; i5 < this.sibling.length; ++i5) {
        if(i5==0){
          lastdigit+=26
          sibling.push( {
              text: 'IDNumber: _____________ Name:_______________________________________',
              absolutePosition: { x: 240, y: lastdigit }
            })
          sibling.push( {
              text: '\u200B\t                       '+this.sibling[i5].memberIdNumber +'                            '+this.sibling[i5].fullName ,
              absolutePosition: { x: 240, y: lastdigit },
              fontSize:8
            })
        }
        else if(i5%2===1){
          lastdigit+=12
          sibling.push( {
              text: 'IDNumber: ________ Name:____________________________',
              absolutePosition: { x: 50, y: lastdigit }
            })
          sibling.push( {
              text: '\u200B\t                    '+this.sibling[i5].memberIdNumber +'                    '+this.sibling[i5].fullName ,
              absolutePosition: { x: 50, y: lastdigit },
              fontSize:8
            })
        }else {
          sibling.push( {
              text: 'IDNumber: ________ Name:_______________________________',
              absolutePosition: { x: 300, y: lastdigit }
            })
          sibling.push( {
              text: '\u200B\t                   '+this.sibling[i5].memberIdNumber +'                  '+this.sibling[i5].fullName ,
              absolutePosition: { x: 305, y: lastdigit },
              fontSize:8
            })
        }
      }
    this.fields=[
         {
          text: this.nonull(this.global.requestid()),
          absolutePosition: { x: 90, y: 98 },
          bold:true
        },
         {
          text: this.nonull(this.userinfo.lrNumber),
          absolutePosition: { x: 220, y: 98 },
          bold:true
        },
         {
          text: this.nonull(this.global.serverdate),
          absolutePosition: { x: 380, y: 98 },
          bold:true
        },
         {
          text: this.nonull(this.getgrade(this.studinfo.yearOrGradeLevel)),
          absolutePosition: { x: 90, y: 113 },
          bold:true
        },
        status,
        reportcard,
         {
          text: this.nonull(this.userdemog.generalAverage),
          absolutePosition: { x: 418, y: 134 },
          bold:true
        },
         {
          text: this.nonull(this.userdemog.neatScore),
          absolutePosition: { x: 530, y: 134 },
          bold:true
        },
        nso,
        gender,
        {
          text: this.nonull(this.studinfo.lastName),
          absolutePosition: { x: 85, y: 166 },
          bold:true
        },
        {
          text: this.nonull(this.studinfo.firstName),
          absolutePosition: { x:230, y: 166 },
          bold:true
        },
        {
          text: this.nonull(this.studinfo.middleName),
          absolutePosition: { x:440, y: 166 },
          bold:true
        },
        {
          text: this.nonull(bday),
          absolutePosition: { x:113, y: 193 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.placeOfBirth),
          absolutePosition: { x:305, y: 193 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.homeAddress),
          absolutePosition: { x:170, y: 205 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.currentAddress),
          absolutePosition: { x:170, y: 216 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.boardingPhone),
          absolutePosition: { x:424, y: 228 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.sgfName),
          absolutePosition: { x:212, y: 264 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.sgfsy),
          absolutePosition: { x:110, y: 275 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.sgfAddress),
          absolutePosition: { x:290, y: 275 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.lsaName),
          absolutePosition: { x:150, y: 299 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.lsasy),
          absolutePosition: { x:110, y: 310 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.lsaAddress),
          absolutePosition: { x:290, y: 310 },
          bold:true
        },

        {
          text: this.nonull(this.father.parentName),
          absolutePosition: { x:90, y: 334 },
          bold:true
        },
        {
          text: this.nonull(this.father.cellphoneNo),
          absolutePosition: { x:420, y: 334 },
          bold:true
        },
        {
          text: this.nonull(this.father.landlineNo),
          absolutePosition: { x:440, y: 345},
          bold:true
        },
        {
          text: this.nonull(this.father.occupation),
          absolutePosition: { x:115, y: 357 },
          bold:true
        },
        {
          text: this.nonull(this.father.officeAddress),
          absolutePosition: { x:380, y: 357 },
          bold:true
        },

        {
          text: this.nonull(this.mother.parentName),
          absolutePosition: { x:90, y: 403 },
          bold:true
        },
        {
          text: this.nonull(this.mother.cellphoneNo),
          absolutePosition: { x:420, y: 403 },
          bold:true
        },
        {
          text: this.nonull(this.mother.landlineNo),
          absolutePosition: { x:440, y: 416},
          bold:true
        },
        {
          text: this.nonull(this.mother.occupation),
          absolutePosition: { x:115, y: 428 },
          bold:true
        },
        {
          text: this.nonull(this.mother.officeAddress),
          absolutePosition: { x:380, y: 428 },
          bold:true
        },
        fatherstatus,
        fatherofw,
        motherstatus,
        motherofw,
        married,
         {
          text: this.nonull(this.guardian.parentName),
          absolutePosition: { x:260, y: 486 },
          bold:true
        },
        {
          text: this.nonull(this.guardian.status),
          absolutePosition: { x:490, y: 486},
          bold:true
        },
        {
          text: this.nonull(this.guardian.cellphoneNo),
          absolutePosition: { x:430, y: 498 },
          bold:true
        },
        {
          text: this.nonull(this.guardian.officeAddress),
          absolutePosition: { x:100, y: 498 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.numberOfSibling),
          absolutePosition: { x:205, y: 521 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.birthOrder),
          absolutePosition: { x:340, y: 521 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.religion),
          absolutePosition: { x:445, y: 521 },
          bold:true
        },
        baptism,
        confession,
        holyCommunion,
        confirmation,
        instruction,


        {
          text: this.nonull(this.userdemog.ethnicity),
          absolutePosition: { x:458, y: 544 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.languageSpoken),
          absolutePosition: { x:140, y: 556 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.motherTongue),
          absolutePosition: { x:390, y: 556 },
          bold:true
        },
        sibling,

        {
          text: this.nonull(this.userdemog.skillTalent),
          absolutePosition: { x:210, y: 591 },
          bold:true
        },


        {
          text: this.nonull(this.userdemog.contestToJoin),
          absolutePosition: { x:165, y: 603 },
          bold:true
        },

        {
          text: this.nonull(this.userdemog.physicalDefect),
          absolutePosition: { x:145, y: 615 },
          bold:true
        },

        {
          text: this.nonull(this.userdemog.healthProblem),
          absolutePosition: { x:135, y: 626 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.medicalAdvise),
          absolutePosition: { x:392, y: 626 },
          bold:true
        },
        {
          text: this.nonull(this.userdemog.nearestNeighbor),
          absolutePosition: { x:265, y: 638 },
          bold:true
        },


    ]
    var header = {text:'UNIVERSITY OF SAINT LOUIS\nTuguegarao City\nSENIOR HIGH SCHOOL DEPARTMENT\nENROLLMENT FORM\n',bold:true,fontSize:10,alignment:'center'}
    if(this.studinfo.yearOrGradeLevel<5){
      header = {text:'UNIVERSITY OF SAINT LOUIS\nTuguegarao City\nJUNIOR HIGH SCHOOL DEPARTMENT\nENROLLMENT FORM\n',bold:true,fontSize:10,alignment:'center'}
    }
var doc = {
    pageSize:'FOLIO',
    pageMargins: [ 50, 30, 50, 20 ],
    content: [
    header,
    {text:['School Year ',{text:SY+'\n\n',bold:true,decoration:'underline',alignment:'center'}],bold:true,alignment:'center'},
    {text:'I.D. No.: ___________________  LRN No.: __________________               Date: ____________________________________________'},
    {text:'Grade:                                                                                                         Old (      )   New (      )   Transferee (      )'},
    {text:'Curriculum/Strand: '+this.studinfo.curriculum},
    {text:'Report Card or its equivalent submitted:    Yes (   )  No (   )              General Average: ________      NEAT Score: ________'},
    {text:'Photocopy of NSO Birth Certificate submitted:    Yes (   )  No (   )   Gender:  Male (      )   Female (      )'+"\n\n"},
    {text:'_________________________________________________________________________________________________________________'},
    {text:'\u200B\t            (Last Name)                                              (First Name)                                                  (Middle Name)'},
    {text:'Date of Birth: ___________________________ Place of Birth: _________________________________________________________'},
    {text:'Complete Home Address: _______________________________________________________________________________________'},
    {text:'Boarding House Address: _______________________________________________________________________________________'},
    {text:'Name of Landlord/Landlady: __________________________________________ Phone No.: ______________________________\n\n\n'},
    
    {text:'Elementary School Graduated from: _____________________________________________________________________________'},
    {text:'School Year: ______________________________  Address: ___________________________________________________________'},
    {text:'For Transferees only:',bold:true,decoration:'underline'},
    {text:'School Last Attended: __________________________________________________________________________________________'},
    {text:'School Year: ______________________________  Address: ___________________________________________________________\n\n'},
    
    {text:'Father: _______________________________________________________________ C.P. No.:_________________________________'},
    {text:'\u200B\t                                                 (Full Name)                                                       Landline No.: ____________________________'},
    {text:'Occupation: _________________________________________   Office Address: __________________________________________\n'},
    {text:'\u200B\tOFW (      )                               Deceased (      )                   Widow/Widower (      )'},
    {text:'\u200B\tSeparated (      )                       Annulled (      )                    Single (      )\n\n'},
    {text:'Mother: _______________________________________________________________ C.P. No.:_________________________________'},
    {text:'\u200B\t                                                 (Full Name)                                                        Landline No.: ____________________________'},
    {text:'Occupation: _________________________________________   Office Address: __________________________________________\n'},

    {text:'\u200B\tOFW (      )                               Deceased (      )                   Widow/Widower (      )'},
    {text:'\u200B\tSeparated (      )                       Annulled (      )                    Single (      )\n\n'},
    {text:'Parents living together: Yes (      )  No (      )'},
    {text:'Guardian other than Parents supporting you: _______________________________________ Relationship:________________'},
    {text:'Address: ____________________________________________________________   Phone No.: ______________________________\n'},
    {text:'  '},
    {text:'Number of Children in the family: ____________   Your Birth Order: ____________    Religion: __________________________'},
    {text:'Sacraments received:          Baptism  (      )      Confession  (      )     Holy Communion  (      )     Confirmation (      ) '},
    {text:'Received Religious Instruction during Elementary:     Yes (   )  No (   )                          Ethnicity: ______________________'},
    {text:'Language Spoken: ______________________________________    Mother Tongue: _____________________________________'},
    {text:'Brothers/Sisters studying in this school:'},
    {text:'  '},
    {text:'Special Abilities/Experties/Talents: ______________________________________________________________________________'},
    {text:'Contest you want to join: ________________________________________________________________________________________'},
    {text:'Physical Difficulties: ____________________________________________________________________________________________'},
    {text:'Health Problems: _______________________________________     Medical Advice: _____________________________________'},
    {text:'Nearest neighbor who is studying in this school: _________________________________________________________________\n\n'},
    {text:'\u200B\t    I, with the guidance of my parents/guardian declare that all the information provided is COMPLETE, ACCURATE, and TRUE. I certify that, to date, I understand that any information I have misrepresented, concealed or falsely given on my enrollment be a ground basis to invalidate and cancel my admission/enrollment in the USL, and the forfeiture of any down payment made by me in favor of USL, I also promise to comply with all the guidelines, requirements and instructions, and special conditions.',alignment: 'justify'},
    {alignment: 'justify',text:'\u200B\t    My registration in this school is considered as expression of my willingness to abide with all the standing rules and regulations of USL and whatsoever may be prescribed by the School Authorities from time to time.'},
    {alignment: 'justify',text:['\u200B\t    I hereby agree to pay all assessed fees and obligations before the end of the School Year. Should I drop/withdraw my studies, I agree to pay the assessed fees according to the provisions sanctioned by Dept. Ed. and stipulated in the USL Handbook which states, ',
    {alignment: 'justify',text: "\"A student dropping from the school after enrollment shall be charged for his/her fees in accordance with the Manual Regulations for Private Schools, Article XIII, Section 66. When a student registers in a school, it is understood he/she is enrolling for the whole school year. A student who withdraws in writing within the first week of classes may be charged 10% of the total amount due or 20% if within the second week of classes regardless of whether or not he/she has actually attended classes. The student may be charged all the fees in full if he/she withdraws any time after the second week of classes. However, if the withdrawal is due to justifiable reason (i.e. serious illness) he/she should be charged the pertinent fees only up to the last month of attendance.\"", fontSize: 9,italics: true,bold: true,}]},
   
    {text:'\n\nFather\'s/Mother\'s Signature: __________________________                   Guardian\'s Signature: __________________________  \n\n'},
    {text:'Student\'s Signature: _________________________        Principal\'s/Representative\'s Signature: ________________________  '},
          {
          image: 'data:image/png;base64,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', 
          width: 200,
          opacity: 0.3,
          absolutePosition: { x: 210, y: 370 },
        },
         {
          image: this.image.changingThisBreaksApplicationSecurity,
          width: 80,
          opacity: 1,
          absolutePosition: { x: 500, y: 20 },
        },
        this.fields
      ],
      footer:function(currentPage, pageCount, pageSize) {
          return [
              {text:'',alignment:'right',fontSize:9,margin:[0,0,40,0]}//currentPage+' of '+pageCount
          ]
      },
      defaultStyle: {
        fontSize: 10
      }
      
    }
    pdfMake.createPdf(doc).open();
   }
}
