import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { EmployeeLookupComponent } from './../../academic/lookup/employee-lookup/employee-lookup.component';
import { StudentLookupComponent } from './../../academic/lookup/student-lookup/student-lookup.component';
import { UserRoleManagementComponent } from './../user-management/user-role-management/user-role-management.component';

@Component({
  selector: 'app-user-management-student',
  templateUrl: './user-management-student.component.html',
  styleUrls: ['./user-management-student.component.scss']
})
export class UserManagementStudentComponent implements OnInit {

  image2:any = 'assets/noimage.jpg';
  name2:any='';
  position2:any='';
  id2:string='';
  checkid2:string='';
  pword2:string='';
  cpword2:string='';
  disabledpword2:boolean = false;
  submit2:boolean = false;
  isChecked2:boolean = false;
  @ViewChild('pword2') namefield: ElementRef;
      
      userroles
      ngOnInit() {
        this.default2()
        this.http.get(this.global.api+'Access/'+this.global.requestid(),this.global.option)
                 .map(response => response.json())
                .subscribe(res => {
                  this.userroles = res.roles;
                });
      }
  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http) {
  }
  openDialogManageRole2(): void {
    //console.log(this.checkid)
    const dialogRef = this.dialog.open(UserRoleManagementComponent, {
      width: '700px',data:{name:this.name2,position:this.position2,id:this.checkid2,image:this.image2,indicator:1}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
onSubmit2(rr){
  this.checkid2=this.checkid2.replace(" ", "")
  this.id2=this.id2.replace(" ", "")
  if (this.id2!=this.checkid2) {
    this.global.swalAlert('Account Registration failed!','ID Number did not match with the searched Person. Please Check the inputed ID number.','error')
  }else{
      if (this.id2!=''&&this.cpword2!=''&&this.pword2!='') {
        if (this.cpword2!=this.pword2) {
          this.global.swalAlert('Password does not match the confirm password.','','warning');
        }else
        {
          if (this.name2 == '') {
            this.global.swalAlert('Must Enter A valid ID!','','warning');
          }else
          {
           this.http.post(this.global.api+'Account/registeruser' ,{
              'username':this.id2,
              'password':this.pword2,
              'confirmPassword':this.cpword2,
            },this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.disabledpword2 = false;
                this.isChecked2 = false;
                this.default2()
                //this.updatelock2()
                if (this.submitword2=='Register') {
                  this.http.get(this.global.api+'Access/'+this.id2,this.global.option)
                     .map(response => response.json())
                     .subscribe(res => {
                        var userId = res.userId;
                         this.http.post(this.global.api+'Access/',{
                              userId:userId,
                              userName:this.id2,
                              roles: ["Student"]
                            },this.global.option)
                                 .map(response => response.json())
                                .subscribe(res => {
                                  this.updatelock2()
                                },Error=>{
                                  //this.global.swalSuccess('Account Registered!')
                                  this.submitword2='Reset'
                                  this.indicatorload=2
                                  this.global.swalAlertError();
                                });
                       },Error=>{
                      this.global.swalAlertError();
                    });
                }
                this.checkaccreg(2,res.message)
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
          
      }else
          this.global.swalAlert('Fill all the required fields','','warning');
        
      }
    }

   submitword2 = ''
   indicatorload=0
   checkaccreg(check,x=null){
     var id=''
       id=this.id2;

     this.indicatorload=1
     if (id!='') {
       this.http.get(this.global.api+'Access/'+id,this.global.option)
         .map(response => response.json())
        .subscribe(res => {
          if (res.message == 'User not found.') {
               this.submitword2 = 'Register';
          }else{
               this.submitword2 = 'Reset'
          }
          if (x!=null) {
            this.global.swalSuccess(x);
          }
          this.indicatorload=2
        },Error=>{
          this.indicatorload=0
          this.global.swalAlertError();
        });
     }
        
   }
  default2(){
    if (this.disabledpword2==true){
      this.disabledpword2 = false;
      this.isChecked2 = false;
      this.pword2 = '';
      this.cpword2 = '';
    }
    else{
      this.disabledpword2 = true;
      this.isChecked2 = true;
      this.pword2 = 'usl';
      this.cpword2 = 'usl';
    }
  }
  clear2(){
  this.disabledpword2 = false;
  this.isChecked2 = false;
  this.image2 = 'assets/noimage.jpg';
  this.name2 = '';
  this.position2 = '';
  this.submit2 = false;
  this.disabledpword2 = false;

      this.pword2 = '';
      this.cpword2 = '';
      this.id2 = '';

  }
bday=''
keyDownFunction2(event) {
  if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
     if (this.id2 != '') {
     this.global.swalLoading('Loading Person Information');
     this.http.get(this.global.api+'Student/'+this.id2+'/'+this.global.syear+'/'+this.global.domain,this.global.option)
                               .map(response => response.json())
                              .subscribe(res => {
                                this.global.swalClose();
                                if (res.message!=undefined&&res.message=='Student found.') {
                                  // if (res.data.course+" - "+res.data.yearOrGradeLevel==' - 0') {
                                  //   this.global.swalAlert("Warning!","The person with ID number:"+this.id2+" is not a student.","warning")
                                  // }else{
                                  this.image2 = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res.data.idPicture);
                                  this.submit2 = true;
                                  if (res.data.suffixName==null) {
                                    res.data.suffixName=''
                                  }
                                  this.name2 = res.data.firstName+" "+res.data.middleName+" "+res.data.lastName+""+res.data.suffixName;
                                  this.position2 = res.data.course+" - "+res.data.yearOrGradeLevel;
                                  this.checkid2=res.data.idNumber
                                  this.bday=res.data.dateOfBirth
                                  this.checkaccreg(0) 
                                  //} 
                                }else 
                                {
                                  this.global.swalAlert(res.message,'','warning');
                                }
                              },Error=>{
                                  this.global.swalAlertError();
                              });
    // rest of your code
    }
    // code...
  }
}

  

   studlookup(): void {
        const dialogRef = this.dialog.open(StudentLookupComponent, {
          width: '600px', disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
         if (result!=undefined) { 
          if (result.result!='cancel') {
            this.id2 = result.result;
            this.keyDownFunction2('onoutfocus')
          }
         }
        });
      }

      updatelock2(){
        this.http.put(this.global.api+'Account/LockUnlock/'+this.checkid2+'/0',{},this.global.option)
               .map(response => response.json())
              .subscribe(res => {
          });
      }


}