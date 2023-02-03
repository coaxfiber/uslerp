import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { AddressLookupComponent } from './../../../academic/student-information/address-lookup/address-lookup.component';

@Component({
  selector: 'app-update-personal-information',
  templateUrl: './update-personal-information.component.html',
  styleUrls: ['./update-personal-information.component.scss']
})
export class UpdatePersonalInformationComponent implements OnInit {
  array;
  civilS:any='';
  permPSGC:any='';
  homeaddress:any='';
  currPSGC:any='';
  curraddress:any='';
  emailAdd:any='';
  telno:any='';
  telno2:any='';
  street1:any='';
  street2:any='';
  tin:any='';
  sssNo:any='';
  philHealthNo:any='';
  pagIbigNo:any='';
  civilstatus:any='';
  spouse:any='';
  dateofmarriage:any='';
  nameOfChurch:any='';
  occupation:any='';
  dateofbirth:any='';
  religion:any='';
  nationality:any='';
  SID:any='';
  idpicture:any='';
  signature:any='';

  CedNo = '';
  PlaceIssued = '';
  DateIssued:any='';
  PTRNo = '';
  constructor(public dialogRef: MatDialogRef<UpdatePersonalInformationComponent>,@Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private global: GlobalService,private http: Http) { 
    
  }

  ngOnInit() {
    this.array = this.data.selectedData;
    this.idpicture=this.data.selectedData.idPicture;
    this.signature=this.data.selectedData.signature;
    this.homeaddress=this.data.selectedData.permanentaddress;
    this.curraddress=this.data.selectedData.currentaddress;
    this.emailAdd=this.data.selectedData.emailAdd
    this.telno=this.data.selectedData.telno
    this.telno2=this.data.selectedData.mobileno
    this.street1=this.data.selectedData.street1
    this.street2=this.data.selectedData.street2
    this.tin=this.data.selectedData.tin
    this.sssNo=this.data.selectedData.sssNo
    this.philHealthNo=this.data.selectedData.philHealthNo
    this.pagIbigNo=this.data.selectedData.pagIbigNo
    this.civilstatus=this.data.selectedData.civilstatus
    this.spouse=this.data.selectedData.spouse
    this.dateofmarriage=this.data.selectedData.dateofmarriage
    this.nameOfChurch=this.data.selectedData.nameOfChurch
    this.occupation=this.data.selectedData.occupation
    this.dateofbirth=this.data.selectedData.dateofbirth
    this.religion=this.data.selectedData.religion
    this.nationality=this.data.selectedData.nationality
    this.SID = this.data.selectedID
    this.currPSGC = this.data.selectedData.psgC2
    this.permPSGC = this.data.selectedData.psgC1

    this.CedNo = this.data.selectedData.cedulaNo;
    this.PlaceIssued = this.data.selectedData.cedula_PlacedIssued;
    this.DateIssued = this.data.selectedData.cedula_DateIssued;
    this.PTRNo = this.data.selectedData.ptrOtrNo;

    console.log(this.array)
    //console.log(this.SID)
  }
  onNoClick(): void {
    this.dialogRef.close(0);
  }
  save(): void {

    this.dialogRef.close({result:1,data:this.array});
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
              //console.log(result.data+"--"+result.result);
            }else{
              this.currPSGC = result.data;
              this.curraddress = result.result;
              
            }
            //console.log(result)
          }
        });

      }

    savePersonalInfo(){
      // console.log("home address: "+this.permPSGC+"--"+this.homeaddress);
      // console.log("current address: "+this.currPSGC+"--"+this.curraddress);
      
      this.global.swalLoading('Updating Personal Info');
      this.http.put(this.global.api+'Employee/PersonalInfo/'+this.SID,{
              "IDPicture": this.idpicture,
              "Signature": this.signature,
              "sss": this.sssNo,
              "tin": this.tin,
              "pagibig": this.pagIbigNo,
              "philhealth": this.philHealthNo,
              "dob": this.dateofbirth,
              "civilstatus": this.civilstatus,
              "spouse": this.spouse,
              "occupation": this.occupation,
              "church": this.nameOfChurch,
              "dom": this.dateofmarriage,
              "nationality": this.nationality,
              "religion": this.religion,
              "telno1": this.telno,
              "telno2": this.telno2,
              "street1": this.street1,
              "psgc2": this.currPSGC,
              "street2": this.street2,
              "psgc1": this.permPSGC,
              "emailAdd": this.emailAdd,
              "CedulaNo": this.CedNo,
              "PrtOtrNo": this.PTRNo,
              "CedulaPlacedIssued": this.PlaceIssued,
              "CedulaDateIssued": this.DateIssued,
            },this.global.option)
                                .map(response => response.json())
                                .subscribe(res => {
                                  // console.log(res)
                                  this.global.swalAlert(res.message,"",'success');
                                  this.dialogRef.close({result:"update success"});    
                                },Error=>{
                                  this.global.swalAlertError();
                                  console.log(Error)
                                });
                            
    }
}
