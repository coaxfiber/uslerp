import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

import * as XLSX from 'xlsx';
@Component({
  selector: 'app-enrollment-summary',
  templateUrl: './enrollment-summary.component.html',
  styleUrls: ['./enrollment-summary.component.css']
})
export class EnrollmentSummaryComponent implements OnInit {

  @ViewChild('table') table: ElementRef;

colors=['Red','Green','Blue','Orange','Violet'];
  constructor() { }

  ngOnInit() {
  }
  fireEvent()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, 'SheetJS.xlsx');

}

}
