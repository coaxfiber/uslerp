import { Component, OnInit,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Router  } from '@angular/router';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActiveConfigurationComponent } from './../control-panel/active-configuration/active-configuration.component';
import { ChangePasswordComponent } from './../main/change-password/change-password.component';

import Swal from 'sweetalert2';
const swal = Swal;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
		panelOpenState: boolean = false;
    
    image:any = 'assets/noimage.jpg';
    id:any;
    name:any;
    x=1

    constructor(private elRef:ElementRef,public dialog: MatDialog,private cookieService: CookieService,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http,private route: ActivatedRoute, private router: Router) {

    }

   ngAfterViewInit() {
       let loader = this.elRef.nativeElement.querySelector('#loaderinside'); 
       //loader.style.display = "none"; //hide loader
       document.getElementById("loaderinside").style.display = "none";
    }

    openDialog(x=null): void {
        const dialogRef = this.dialog.open(ActiveConfigurationComponent, {
              width: '700px', disableClose: true , data:{x:x}
            });

            dialogRef.afterClosed().subscribe(result => {
              //console.log(result)
              if (result!=undefined) {
                if (result.result=='save') {
                }
              }
            });
        }
  openDialogchangepassword(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',data:{id:this.global.requestid}, disableClose: false });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }  
  checkdomainvalue=''

  ngOnInit() {
     this.router.navigate(['../main',{outlets:{div:'home'}}], { skipLocationChange: true });
     if (localStorage.getItem('sy')!=null) {
       if (this.global.requestid()!=localStorage.getItem('idno')) {
         this.x=0;
       }
       else{
         this.global.sysetting(localStorage.getItem('domain'),localStorage.getItem('sy'))
       }
      
     }else
      {  
         this.global.displayyear = "No Active School Year.";
         this.x=0;
      }
     this.id = this.global.requestid();
     this.global.swalLoading('Loading User Information.');

     this.http.get(this.global.api+'Auth/UserRoles',this.global.option)
         .map(response => response.json())
         .subscribe(res2 => {
           if (res2.data!=null) {
             this.global.getaccess(res2.data)

               this.http.get(this.global.api+'PublicAPI/Departments',this.global.option)
                   .map(response => response.json())
                   .subscribe(res2 => {
                     this.global.departments=res2
                      this.http.get(this.global.api+'PublicAPI/ProgramLevels',this.global.option)
                       .map(response => response.json())
                       .subscribe(res2 => {
                         this.global.programlevels=res2
                         this.http.get(this.global.api+'Access/'+this.global.requestid(),this.global.option)
                             .map(response => response.json())
                            .subscribe(res => {
                                this.global.roles=res.roles
                             },Error=>{
                                this.global.logout()
                              });
                       },Error=>{
                          this.global.logout()
                        });
                   },Error=>{
                      this.global.logout()
                    });
           }
         },Error=>{
            this.global.logout()
          });
     this.http.get(this.global.api+'PublicAPI/SYOptionsList',this.global.option)
         .map(response => response.json())
         .subscribe(res2 => {
           this.global.allsyoptions=res2.data
         });
     this.http.get(this.global.api+'Auth/UserViewDomains',this.global.option)
         .map(response => response.json())
         .subscribe(res2 => {
           this.global.getdomain(res2.data)
            if (
              this.global.checkdomain('0001')||
              this.global.checkdomain('0002')||
              this.global.checkdomain('0003')||
              this.global.checkdomain('0004')||
              this.global.checkdomain('0005')||
              this.global.checkdomain('0006')) {
              this.checkdomainvalue=this.checkdomainvalue+'COLLEGE'
            }
            if(
              this.global.checkdomain('0009')){
              this.checkdomainvalue=this.checkdomainvalue+'HIGHSCHOOL'
            }
            if(
              this.global.checkdomain('0008')){
              this.checkdomainvalue=this.checkdomainvalue+'GRADUATE SCHOOL'
            }
            if(
              this.global.checkdomain('0071')||
              this.global.checkdomain('0072')||
              this.global.checkdomain('0073')){
              this.checkdomainvalue=this.checkdomainvalue+'ELEMENTARY'
            }

            if (this.checkdomainvalue.includes(this.global.domain)) {
            }else{
               this.openDialog(0) 
               this.x=1
            }

            this.http.get(this.global.api+'Auth/UserInfo',this.global.option)
         .map(response => response.json())
         .subscribe(res2 => {this.global.swalClose();
          //console.log(this.global.domain)
          if (this.x==0) {
            //this.global.swalAlert('Warning!','Please Set the Active School Year','warning');
            this.openDialog(0)
           }
            this.image = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+res2.data.idPicture);
            this.name = res2.data.name;
            this.global.fullname = res2.data.name;
            if (res2.data.lockoutEnabled==1) {
             let timerInterval
                swal.fire({
                  allowOutsideClick: false,
                  title: 'Account has been disabled!',
                  html: 'Contact your System Administrator<br><br>You will be logged out in <strong></strong> seconds.',
                  timer: 10000,
                  onBeforeOpen: () => {
                    swal.showLoading()
                    timerInterval = setInterval(() => {
                      swal.getContent().querySelector('strong')
                        .textContent = (~~(swal.getTimerLeft()/1000)).toString()
                    }, 100)
                  },
                  onClose: () => {
                    clearInterval(timerInterval)
                  }
                }).then((result) => {
                  if (
                    /* Read more about handling dismissals below */
                    result.dismiss === swal.DismissReason.timer
                  ) {
                    this.global.logout()
                  }
                })
            }
          },Error=>{
            //console.log(Error);
            this.global.swalAlertError();
            console.log(Error)
            this.global.logout()
          });
            //console.log(this.global.viewdomain)
         });
  }
  logout(){
      swal.fire({
      title: 'USL-ERP',
      text: "You are about to sign out!",
      type: 'info',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.global.logout();
      }
    })
  }
}
