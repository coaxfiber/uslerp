import { Component, OnInit } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './../../../global.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-address-lookup',
  templateUrl: './address-lookup.component.html',
  styleUrls: ['./address-lookup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddressLookupComponent implements OnInit {
	 provinces
  towncity
  barangay

  prov=''
  town=''
  bar=''
  bara=''
constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<AddressLookupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private global: GlobalService,private http: Http) { 
    this.http.get(this.global.api+'PublicAPI/Provinces',this.global.option)
    .map(response => response.json())
    .subscribe(res => {
     this.provinces = res
    },Error=>{
      this.global.swalAlertError();
    });
  } gettowncity(province){
  this.town = '';
  this.bar= '';
  this.http.get(this.global.api+'PublicAPI/TownsCities/'+province,this.global.option)
    .map(response => response.json())
    .subscribe(res => {
     this.towncity = res
    },Error=>{
      this.global.swalAlertError();
    });
  }

  getbarangay(province,town){
  this.bar = '';
  this.http.get(this.global.api+'PublicAPI/Barangays/'+province+'/'+town,this.global.option)
    .map(response => response.json())
    .subscribe(res => {
     this.barangay = res
    },Error=>{
      this.global.swalAlertError();
    });
  }


  onNoClick(): void {
    var x='';
    if (this.prov=='')
      x=x+"*Province is required!\n"
    if (this.town=='')
      x=x+"*Town/City is required!\n"
    if (this.bar=='')
      x=x+"*Barangay is required!"

    if (x=='') {
      var bar
      for (var i = 0; i < this.barangay.length; ++i) {
        if (this.bar == this.barangay[i].barangay) {
          bar = this.barangay[i].psgc
        }
        // code...
      }
      console.log({result:this.bar +", "+ this.town+", "+this.prov,data:bar})
       this.dialogRef.close({result:this.bar +", "+ this.town+", "+this.prov,data:bar});
    }else{
      alert(x)
    }

  }
  onNoClickclose(): void {
       this.dialogRef.close({result:'cancel',data:this.bar});
  }
  see(z){
    this.bara = z;
  }
  ngOnInit() {
  }
  check(x){
    console.log(x)
  }

}
