import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { DomSanitizer } from '@angular/platform-browser';
import { ViewChild,ElementRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RoleUpdateComponent } from './../user-management/role-update/role-update.component';
import { RoleAddComponent } from './../user-management/role-add/role-add.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import Swal from 'sweetalert2';
import { UserRoleManagementComponent } from './../user-management/user-role-management/user-role-management.component';
const swal = Swal;

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {


  dataSource;
  tableArr:Array<any>;
  locked = true
  disabledlock = false

      displayedColumns = ['name','action'];
      @ViewChild(MatSort) sort: MatSort;
       @ViewChild('paginator') paginator: MatPaginator;
      userroles
      ngOnInit() {
        this.createTable();
        this.http.get(this.global.api+'Access/'+this.global.requestid(),this.global.option)
                 .map(response => response.json())
                .subscribe(res => {
                  this.userroles = res.roles;
                });
      }
   ngAfterViewInit() {            
        
    }

    createTable() {
        this.http.get(this.global.api+'Role/Roles',this.global.option)
          .map(response => response.json())
          .subscribe(res => {
            this.tableArr=res;
            this.dataSource = new MatTableDataSource(this.tableArr);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          },Error=>{
            //console.log(Error);
            console.log(Error)
          });
      }

  constructor(public dialog: MatDialog,private domSanitizer: DomSanitizer,public global: GlobalService,private http: Http) {
     
  }
applyFilter(filterValue: string) {
  this.dataSource.filterPredicate = (data:
  {name: string}, filterValue: string) =>
  data.name.trim().toLowerCase().indexOf(filterValue) !== -1;

    this.dataSource.filter = filterValue.trim().toLowerCase();
}
openDialog(): void {
    const dialogRef = this.dialog.open(RoleAddComponent, {
      width: '500px', disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
        if (result==1) {
          this.createTable();
        }
      }
    });
  }


openDialogUpdate(id): void {
    const dialogRef = this.dialog.open(RoleUpdateComponent, {
      width: '99%',data:{id:id}, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
     if (result!=undefined) {
        if (result==1) {
          this.createTable();
        }
      }
    });
  }

  removeRole(id){
    this.swalConfirm("Are you sure?","You won't be able to revert this!",'warning','Remove Role','Role has been Removed','','role',id);
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
          if (remove=='role') {
            this.http.delete(this.global.api+'Role/'+id,this.global.option)
              .map(response => response.json())
              .subscribe(res => {
                this.createTable();
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