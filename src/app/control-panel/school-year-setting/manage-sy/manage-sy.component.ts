import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import { UpdateComponent } from './update/update.component';
import Swal from 'sweetalert2';
const swal = Swal;

@Component({
  selector: 'app-manage-sy',
  templateUrl: './manage-sy.component.html',
  styleUrls: ['./manage-sy.component.scss']
})
export class ManageSyComponent implements OnInit {
  sylist

  constructor(public dialog: MatDialog,private http: Http,public global: GlobalService,public dialogRef: MatDialogRef<ManageSyComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) {
  	

  }

  run(){
      this.http.get(this.global.api+'Maintenance/SYOptionsList',this.global.option)
        .map(response => response.json())
        .subscribe(res => {
          this.sylist=res.data  
        },Error=>{
           this.global.swalAlertError();
        });
  }

  ngOnInit() {  
    this.run()
  }

  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel'});
  }

  display(x){
    var y = x.substring(0,4)
    var z = parseInt(y) + 1
    var a = y.toString() + " - " + z.toString();
    var b = x.substring(6,7)
    var c
    if (b==1)
      c="First Semester"
    else if (b==2)
      c="Second Semester"
    else
      c="Summer"
    return "School Year "+a + " " + c
  }

      openDialog(x): void {
        const dialogRef = this.dialog.open(UpdateComponent, {
          width: '500px', disableClose: false, data: {x:x,data:this.sylist}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result!=undefined) {
            if (result.result=='success') {
              this.run()
            }
          }
        });
      }

  removesy(sy){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove School year','School year has been Removed','','sy',sy);
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove,sy)
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
            this.http.delete(this.global.api+'Maintenance/SYSettings/'+sy,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.run()
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
}
