import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../global.service';

import { AddSetsComponent } from './add-sets/add-sets.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
const swal = Swal;

import { AssignSetsComponent } from './assign-sets/assign-sets.component';

import {ExcelService} from './../../academic/curriculum/excel.service';

@Component({
  selector: 'app-sets-manager',
  templateUrl: './sets-manager.component.html',
  styleUrls: ['./sets-manager.component.scss']
})
export class SetsManagerComponent implements OnInit {

	 sylist=[]
setarray
setarray2
sy=''
filter=''
search=''
  constructor(private excelService:ExcelService,public global: GlobalService,private http: Http,public dialog: MatDialog) { }

run(){
       this.http.get(this.global.api+'Maintenance/SYOptionsList',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            if (res.data==null) {
              this.global.swalAlert('Invalid School Year!','','warning');
              this.sy = '';
            }else{
              this.sylist=res.data
              this.sy=this.global.syear
              this.getsets()
            }
          },Error=>{
             this.global.swalAlertError();
          });

     }
  ngOnInit() {
    this.run()
  }
 activate(x){
this.sy=x
this.getsets()
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
getstat(status){
  if (status==="False") {
   return "Inactive"
  }
   return "Active"
}
keyDownFunction(event){
   if(event.keyCode == 13 || event.keyCode == 9 || event == 'onoutfocus') {
     this.setarray2=[]
      if (this.search!='') {
        for (var i = 0; i < this.setarray.length; ++i) {
          if (this.filter=='') {
            if (this.setarray[i].setDescription.toLowerCase().replace(/\s/g, "").includes(this.search.toLowerCase().replace(/\s/g, ""))) {
              this.setarray2.push(this.setarray[i])
            }
          }else
          if (this.filter=='1') {
            if (this.setarray[i].setDescription.toLowerCase().replace(/\s/g, "").includes(this.search.toLowerCase().replace(/\s/g, ""))&&this.setarray[i].status=='True') {
              this.setarray2.push(this.setarray[i])
            }
          }else
          if (this.filter=='0') {
            if (this.setarray[i].setDescription.toLowerCase().replace(/\s/g, "").includes(this.search.toLowerCase().replace(/\s/g, ""))&&this.setarray[i].status=='False') {
              this.setarray2.push(this.setarray[i])
            }
          }
        }
      }else{
        this.setarray2= this.setarray
      }
   }
}
onchangefilter(x){
  this.setarray2=[]
  if (x=='1') {
    for (var i = 0; i < this.setarray.length; ++i) {
      if (this.setarray[i].status=="True"&&this.setarray[i].setDescription.toLowerCase().replace(/\s/g, "").includes(this.search.toLowerCase().replace(/\s/g, ""))) {
        this.setarray2.push(this.setarray[i])
      }
    }
  }else if (x=='0') {
    for (var i = 0; i < this.setarray.length; ++i) {
      if (this.setarray[i].status=="False"&&this.setarray[i].setDescription.toLowerCase().replace(/\s/g, "").includes(this.search.toLowerCase().replace(/\s/g, ""))) {
        this.setarray2.push(this.setarray[i])
      }
    }
  }else{
    for (var i = 0; i < this.setarray.length; ++i) {
      if (this.setarray[i].setDescription.toLowerCase().replace(/\s/g, "").includes(this.search.toLowerCase().replace(/\s/g, ""))) {
        this.setarray2.push(this.setarray[i])
      }
    }
  }
}

getsets(xy=null){
  if (xy==null) {
    this.filter=''
    this.search=''
  }
  this.http.get(this.global.api+'Code/SetHeaders/'+this.sy+'/0',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.setarray = res.data;
              this.http.get(this.global.api+'Code/SetHeaders/'+this.sy+'/1',this.global.option)
                      .map(response => response.json())
                      .subscribe(res => {
                        this.setarray2 = this.setarray.concat(res.data);
                        this.setarray=this.setarray2
                        if (xy!=null) {
                          if (this.search!='') {
                            this.keyDownFunction('onoutfocus')
                          }else if (this.filter!='') {
                            this.onchangefilter(this.filter)
                          } 
                          
                        }
                      },Error=>{
                        //console.log(Error);
                        this.setarray=[]
                        console.log(Error)
                     });  
          },Error=>{
            //console.log(Error);
            this.setarray=[]
            console.log(Error)
         });  

}


openDialog(x): void {
    const dialogRef = this.dialog.open(AddSetsComponent, {
          width: '700px', disableClose: false, data:{data:x,syear:this.sy}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {

            if (result.result=='save') {
              this.sy=result.val;
              this.getsets(1);
            }
          }
        });
    }

openDialogAssignSetsComponent(x,test=null): void {
    const dialogRef = this.dialog.open(AssignSetsComponent, {
          width: '90%', disableClose: false, data:{x:x,syear:this.sy,indi:test}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='save') {
              this.sy=result.val;
              this.getsets();
            }
          }
        });
    }

    openDialog2(x,y): void {
    const dialogRef = this.dialog.open(AddSetsComponent, {
          width: '700px', disableClose: false, data:{data:x,set:y,syear:this.sy}
        });

        dialogRef.afterClosed().subscribe(result => {
          //console.log(result)
          if (result!=undefined) {
            if (result.result=='update') {
              this.getsets(1);
            }
          }
        });
    }
   removeset(id){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove set','Set has been Removed','','sy',id);
  }
  
  swalConfirm(title,text,type,button,d1,d2,remove,id)
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
            this.http.delete(this.global.api+'Code/SetHeader/'+id,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.global.swalSuccess(res.message)
                this.getsets()
              },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
                console.log(Error)
              });
          }
        }
      })
  }
  array
  Exporttoexcel(x){
    this.global.swalLoading("")
    this.http.get(this.global.api+'Code/SetDetails/'+x.headerId,this.global.option)
                  .map(response => response.json())
                  .subscribe(res => {
                    this.array=res.data
                     var arr=[]
                        for (var i = 0; i < this.array.length; ++i) {
                          arr.push(
                             {
                               "Code No": this.array[i].codeNo,
                               "Subject ID": this.array[i].subjectId,
                               "Subject Title": this.array[i].subjectTitle,
                               "Day": this.array[i].day,
                               "Time": this.array[i].time,
                               "Room": this.array[i].roomNumber,
                               "Units": this.array[i].units,
                               "CLass Size": this.array[i].classSize,
                               "OE": this.array[i].oe,
                               "Res": this.array[i].res,
                               "Available Slots": this.array[i].availableSlot,
                             }
                          )
                        }

                    this.global.swalClose()
                    this.excelService.exportAsExcelFile(arr, x.setDescription);
                },Error=>{
                //console.log(Error);
                this.global.swalAlertError();
              });
    
  }
}
