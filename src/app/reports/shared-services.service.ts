import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common'; 

//import * as Excel from 'exceljs/dist/exceljs.min.js'; 

//import * as Excel from "exceljs/dist/exceljs"
//import * as Excel from 'exceljs'; 
//import * as Excel from 'exceljs';
import * as ExcelJS from "exceljs/dist/exceljs"
import * as fs from 'file-saver';

//import {Row, Workbook, Worksheet} from 'exceljs';



//import {Row, Workbook, Worksheet} from 'exceljs';


declare const ExcelJS: any;

@Injectable()
export class SharedServicesService {


    constructor(private datePipe: DatePipe) {}

    async generateExcel(data,CLData,tchr) { 

        const header = ['ID NUMBER', "STUDENT'S NAME", 'GENDER', 'CRSE & YR',"LEARNING MODALITY"];  
        // Create workbook and worksheet  
        var workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet();    
        var FileName = "Officially enrolled class list" 

        let Code = worksheet.addRow(['Code:',CLData[0].Code]);
        let Subject = worksheet.addRow(['Subject ID:',CLData[0].SubjectID]);
        let Descriptive = worksheet.addRow(['Descriptive Title:',CLData[0].DescriptiveTitle]);
        let Lecture = worksheet.addRow(['Lecture Units:',CLData[0].LectureUnits]);
        let Laboratory = worksheet.addRow(['Laboratory Units:',CLData[0].LaboratorylabUnits]);
        
        Code.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Subject.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Descriptive.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Lecture.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Laboratory.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };

        worksheet.getCell('B1').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B2').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B3').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B4').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B5').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.addRow(['']);
        let Instructor = worksheet.addRow(['Instructor:',tchr]);
        Instructor.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        worksheet.getCell('B6').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.addRow(['']);

        const headerRow = worksheet.addRow(header);  
        headerRow.eachCell((cell, number) => {  
            cell.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                },  
                bgColor: {  
                    argb: 'FFFFFFFF'  
                },  
            };  
            cell.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: true  
            }  
            cell.border = {  
                top: {  
                    style: 'thin'  
                },  
                left: {  
                    style: 'thin'  
                },  
                bottom: {  
                    style: 'thin'  
                },  
                right: {  
                    style: 'thin'  
                }  
            };  
        });
        //console.table(data)  
        

        data.forEach((element) => {
          let eachRow = [];
          header.forEach((headers) => {
            eachRow.push(element[headers])
          })
          if (element.isDeleted === "Y") {
            let deletedRow = worksheet.addRow(eachRow);
            deletedRow.eachCell((cell, number) => {
              cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
            })
          } else {
            const row = worksheet.addRow(eachRow);
            row.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                }  
            };  
            row.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: false  
            }
            row.eachCell((cell, number) => {  
                cell.border = {  
                    top: {  
                        style: 'thin'  
                    },  
                    left: {  
                        style: 'thin'  
                    },  
                    bottom: {  
                        style: 'thin'  
                    },  
                    right: {  
                        style: 'thin'  
                    }  
                };  
            });  
          }
        })
        // console.table(worksheet.columns)  
        worksheet.getColumn(1).width = 20;  
        worksheet.getColumn(2).width = 40;  
        worksheet.getColumn(3).width = 10;  
        worksheet.getColumn(4).width = 40;  
        worksheet.getColumn(5).width = 40;  
        workbook.xlsx.writeBuffer().then((data: any) => {  
            const blob = new Blob([data], {  
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  
            });  
            fs.saveAs(blob, FileName + '.xlsx');  
        });  
    }

      async generateAdmittedExcel(data,CLData,tchr) { 

        const header = ['ID NUMBER', "STUDENT'S NAME", 'GENDER', 'CRSE & YR',"LEARNING MODALITY"];
        // const header = ['ID NUMBER', "STUDENT'S NAME", 'CRSE & YR',"LEARNING MODALITY"];  
        // Create workbook and worksheet  
        var workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet();    
        var FileName = "Admitted class list"

        let Code = worksheet.addRow(['Code:',CLData[0].Code]);
        let Subject = worksheet.addRow(['Subject ID:',CLData[0].SubjectID]);
        let Descriptive = worksheet.addRow(['Descriptive Title:',CLData[0].DescriptiveTitle]);
        let Lecture = worksheet.addRow(['Lecture Units:',CLData[0].LectureUnits]);
        let Laboratory = worksheet.addRow(['Laboratory Units:',CLData[0].LaboratorylabUnits]);
        
        Code.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Subject.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Descriptive.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Lecture.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Laboratory.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };

        worksheet.getCell('B1').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B2').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B3').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B4').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B5').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.addRow(['']);
        let Instructor = worksheet.addRow(['Instructor:',tchr]);
        Instructor.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        worksheet.getCell('B6').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.addRow(['']);


        const headerRow = worksheet.addRow(header);  
        headerRow.eachCell((cell, number) => {  
            cell.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                },  
                bgColor: {  
                    argb: 'FFFFFFFF'  
                },  
            };  
            cell.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: true  
            }  
            cell.border = {  
                top: {  
                    style: 'thin'  
                },  
                left: {  
                    style: 'thin'  
                },  
                bottom: {  
                    style: 'thin'  
                },  
                right: {  
                    style: 'thin'  
                }  
            };  
        });
        //console.table(data)  
        

        data.forEach((element) => {
          let eachRow = [];
          header.forEach((headers) => {
            eachRow.push(element[headers])
          })
          if (element.isDeleted === "Y") {
            let deletedRow = worksheet.addRow(eachRow);
            deletedRow.eachCell((cell, number) => {
              cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
            })
          } else {
            const row = worksheet.addRow(eachRow);
            row.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                }  
            };  
            row.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: false  
            }
            row.eachCell((cell, number) => {  
                cell.border = {  
                    top: {  
                        style: 'thin'  
                    },  
                    left: {  
                        style: 'thin'  
                    },  
                    bottom: {  
                        style: 'thin'  
                    },  
                    right: {  
                        style: 'thin'  
                    }  
                };  
            });  
          }
        })
        // console.table(worksheet.columns)  
        worksheet.getColumn(1).width = 20;  
        worksheet.getColumn(2).width = 40;  
        worksheet.getColumn(3).width = 10;  
        worksheet.getColumn(4).width = 40;  
        worksheet.getColumn(5).width = 40;  
        workbook.xlsx.writeBuffer().then((data: any) => {  
            const blob = new Blob([data], {  
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  
            });  
            fs.saveAs(blob, FileName + '.xlsx');  
        });  
    }
  async generateAllExcel(OfficiallyStuds,AdmittedStuds,CLData,tchr) { 

        const header = ['ID NUMBER', "STUDENT'S NAME", 'GENDER', 'CRSE & YR',"LEARNING MODALITY"];  
        // const header = ['ID NUMBER', "STUDENT'S NAME", 'CRSE & YR',"LEARNING MODALITY"];  
        // Create workbook and worksheet  
        var workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet();    
        var FileName = "Admitted and officially enrolled class list" 
        
        let Code = worksheet.addRow(['Code:',CLData[0].Code]);
        let Subject = worksheet.addRow(['Subject ID:',CLData[0].SubjectID]);
        let Descriptive = worksheet.addRow(['Descriptive Title:',CLData[0].DescriptiveTitle]);
        let Lecture = worksheet.addRow(['Lecture Units:',CLData[0].LectureUnits]);
        let Laboratory = worksheet.addRow(['Laboratory Units:',CLData[0].LaboratorylabUnits]);
        
        Code.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Subject.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Descriptive.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Lecture.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Laboratory.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };

        worksheet.getCell('B1').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B2').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B3').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B4').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B5').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.addRow(['']);
        let Instructor = worksheet.addRow(['Instructor:',tchr]);
        Instructor.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        worksheet.getCell('B6').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.addRow(['']);
        let Title1 = worksheet.addRow(['OFFICIALLY ENROLLED STUDENTS']);
        Title1.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };

        const headerRow = worksheet.addRow(header);  
        headerRow.eachCell((cell, number) => {  
            cell.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                },  
                bgColor: {  
                    argb: 'FFFFFFFF'  
                },  
            };  
            cell.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: true  
            }  
            cell.border = {  
                top: {  
                    style: 'thin'  
                },  
                left: {  
                    style: 'thin'  
                },  
                bottom: {  
                    style: 'thin'  
                },  
                right: {  
                    style: 'thin'  
                }  
            };  
        });
        //console.table(data)  
        

        OfficiallyStuds.forEach((element) => {
          let eachRow = [];
          header.forEach((headers) => {
            eachRow.push(element[headers])
          })
          if (element.isDeleted === "Y") {
            let deletedRow = worksheet.addRow(eachRow);
            deletedRow.eachCell((cell, number) => {
              cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
            })
          } else {
            const row = worksheet.addRow(eachRow);
            row.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                }  
            };  
            row.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: false  
            }
            row.eachCell((cell, number) => {  
                cell.border = {  
                    top: {  
                        style: 'thin'  
                    },  
                    left: {  
                        style: 'thin'  
                    },  
                    bottom: {  
                        style: 'thin'  
                    },  
                    right: {  
                        style: 'thin'  
                    }  
                };  
            });  
          }
        })


        let titleRow1 = worksheet.addRow(['']);
        let Title = worksheet.addRow(['ADMITTED STUDENTS']);
        Title.font = { name: 'Calibri', family: 4, size: 11,bold: true, strike: false };

        const headerRow1 = worksheet.addRow(header);  
        headerRow1.eachCell((cell, number) => {  
            cell.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                },  
                bgColor: {  
                    argb: 'FFFFFFFF'  
                },  
            };  
            cell.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: true  
            }  
            cell.border = {  
                top: {  
                    style: 'thin'  
                },  
                left: {  
                    style: 'thin'  
                },  
                bottom: {  
                    style: 'thin'  
                },  
                right: {  
                    style: 'thin'  
                }  
            };  
        });


        AdmittedStuds.forEach((element) => {
          let eachRow = [];
          header.forEach((headers) => {
            eachRow.push(element[headers])
          })
          if (element.isDeleted === "Y") {
            let deletedRow = worksheet.addRow(eachRow);
            deletedRow.eachCell((cell, number) => {
              cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
            })
          } else {
            const row = worksheet.addRow(eachRow);
            row.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                }  
            };  
            row.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: false  
            }
            row.eachCell((cell, number) => {  
                cell.border = {  
                    top: {  
                        style: 'thin'  
                    },  
                    left: {  
                        style: 'thin'  
                    },  
                    bottom: {  
                        style: 'thin'  
                    },  
                    right: {  
                        style: 'thin'  
                    }  
                };  
            });  
          }
        })

        // console.table(worksheet.columns)  
        worksheet.getColumn(1).width = 20;  
        worksheet.getColumn(2).width = 40;  
        worksheet.getColumn(3).width = 10;  
        worksheet.getColumn(4).width = 40;  
        worksheet.getColumn(5).width = 40;

        workbook.xlsx.writeBuffer().then((AdmittedStuds: any) => {  
            const blob = new Blob([AdmittedStuds], {  
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  
            });  
            fs.saveAs(blob, FileName + '.xlsx');  
        });  
    }

    async generateHRISemployeeProfileExcel(data,dept){

        // console.log(data)
           const header = [
           "EMPLOYEE ID",
           "NAME",
           "GENDER",
           "DATE OF BIRTH",
           "AGE",
           "DATE OF RETIREMENT",
           "RETIREMENT YEAR",
           "DATE HIRED",
           "YEARS OF SERVICE",
           "EMPLOYMENT STATUS",
           "RANK",
           "POSITION",
           "CLASSIFICATION",
           "ELIGIBILITY",
           "BACHELOR'S DEGREE",
           "MASTERAL DEGREE",
           "DOCTORATE",
           "CEDULA NO",
           "PLACE ISSUED",
           "DATE ISSUED",
           "PTR NO"];

        var workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet();    
        var FileName = "Employee Profile"

        worksheet.addRow(['']);
        let Title1 = worksheet.addRow(['EMPLOYEE PROFILE']);
        Title1.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };

        const headerRow = worksheet.addRow(header);  
        headerRow.eachCell((cell, number) => {  
            cell.fill = {  
                type: 'pattern',  
                pattern: 'solid',  
                fgColor: {  
                    argb: 'FFFFFFFF'  
                },  
                bgColor: {  
                    argb: 'FFFFFFFF'  
                },  
            };  
            cell.font = {  
                color: {  
                    argb: '00000000',  
                },  
                bold: true  
            }  
            cell.border = {  
                top: {  
                    style: 'thin'  
                },  
                left: {  
                    style: 'thin'  
                },  
                bottom: {  
                    style: 'thin'  
                },  
                right: {  
                    style: 'thin'  
                }  
            };  
        });



        data.forEach((element) => {
              let eachRow = [];
              header.forEach((headers) => {
                eachRow.push(element[headers])
              })
              if (element.isDeleted === "Y") {
                let deletedRow = worksheet.addRow(eachRow);
                deletedRow.eachCell((cell, number) => {
                  cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
                })
              } else {
                const row = worksheet.addRow(eachRow);
                row.fill = {  
                    type: 'pattern',  
                    pattern: 'solid',  
                    fgColor: {  
                        argb: 'FFFFFFFF'  
                    }  
                };  
                row.font = {  
                    color: {  
                        argb: '00000000',  
                    },  
                    bold: false  
                }
                row.eachCell((cell, number) => {  
                    cell.border = {  
                        top: {  
                            style: 'thin'  
                        },  
                        left: {  
                            style: 'thin'  
                        },  
                        bottom: {  
                            style: 'thin'  
                        },  
                        right: {  
                            style: 'thin'  
                        }  
                    };  
                });  
              }
            })

            // console.table(worksheet.columns)  
            worksheet.getColumn(1).width = 20; // "EMPLOYEE ID", 
            worksheet.getColumn(2).width = 40;     // "NAME",
            worksheet.getColumn(3).width = 10;  // "GENDER",
            worksheet.getColumn(4).width = 20;  // "DATE OF BIRTH",
            worksheet.getColumn(5).width = 10;// "AGE",
            worksheet.getColumn(6).width = 20;  // "DATE OF RETIREMENT",
            worksheet.getColumn(7).width = 20;  // "RETIREMENT YEAR"
            worksheet.getColumn(8).width = 10;  // "DATE HIRED",
            worksheet.getColumn(9).width = 10;  // "YEARS OF SERVICE",
            worksheet.getColumn(10).width = 40;// "EMPLOYMENT STATUS",
            worksheet.getColumn(11).width = 20;  // "RANK",
            worksheet.getColumn(12).width = 40;  // "POSITION",
            worksheet.getColumn(13).width = 30;  // "CLASSIFICATION",
            worksheet.getColumn(14).width = 40;   // "ELIGIBILITY",
            worksheet.getColumn(15).width = 40; // "BACHELOR'S DEGREE",
            worksheet.getColumn(16).width = 40;  // "MASTERAL DEGREE",
            worksheet.getColumn(17).width = 40;  // "DOCTORATE",
            worksheet.getColumn(18).width = 20;  // "CEDULA NO",
            worksheet.getColumn(19).width = 20;  // "PLACE ISSUED",
            worksheet.getColumn(20).width = 20;// "DATE ISSUED",
            worksheet.getColumn(21).width = 20;// "PTR NO"

             workbook.xlsx.writeBuffer().then((data: any) => {  
                const blob = new Blob([data], {  
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  
                });  
                fs.saveAs(blob, FileName + '.xlsx');  
            });  

    }

    async generateHRISemployeeProfileExcelSolo(dataArr){

        var workbook = new ExcelJS.Workbook();

        const worksheet = workbook.addWorksheet();    
        var FileName = "Employee Profile"

        worksheet.addRow(['']);
        let Title1 = worksheet.addRow(['EMPLOYEE PROFILE']);
        Title1.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false }; 

        
        let idnumber = worksheet.addRow(['ID Number:', dataArr.employeeId]);
        let name = worksheet.addRow(['Name:', dataArr.name]);
        let GenderDobAge = worksheet.addRow(['Gender:', dataArr.gender,'Date of Birth:',dataArr.dateOfBirth,'Age:',dataArr.age]);
        let dhYosRy = worksheet.addRow(['Date Hired:', dataArr.dateHired,'Years of Service:',dataArr.yearsOfService,'Retirement Year:',dataArr.retirementYear]);
        let dorESRank = worksheet.addRow(['Date of Retirement:', dataArr.dateOfRetirement,'Employment Status:',dataArr.employmentStatus,'Rank:',dataArr.rank]);
        let PostClass = worksheet.addRow(['Position:', dataArr.position,'Classification:', dataArr.classification]);
        let eligibility = worksheet.addRow(['Eligibility:', dataArr.eligibility]);
        
        worksheet.addRow(['']);
        let EducAttainment = worksheet.addRow(['Educational Attainment']);
        let BD = worksheet.addRow(['Bachelors Degree:', dataArr.bachelorsDegree]);
        let MD = worksheet.addRow(['Masteral Degree:', dataArr.masteralDegree]);
        let DD = worksheet.addRow(['Doctorate:', dataArr.doctorate]);

        worksheet.addRow(['']);
        let govinfo = worksheet.addRow(['Government Issued Informations']);
        let Cedula = worksheet.addRow(['Cedula Number:', dataArr.cedulaNo]);
        let place = worksheet.addRow(['Place Issued:', dataArr.placeIssued]);
        let date = worksheet.addRow(['Date Issued:', dataArr.dateIssued]);
        let ptrno = worksheet.addRow(['PTR Number:', dataArr.ptrNo]);

        idnumber.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        name.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        GenderDobAge.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        dhYosRy.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        dorESRank.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        PostClass.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        eligibility.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };

        EducAttainment.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        BD.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        MD.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        DD.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };

        govinfo.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        Cedula.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        place.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        date.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };
        ptrno.font = { name: 'Calibri', family: 4, size: 11, bold: true, strike: false };


        worksheet.getCell('B3').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B4').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B5').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('D5').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('F5').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false,};
        worksheet.getCell('F5').alignment = {horizontal: 'left'}

        worksheet.getCell('B6').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('D6').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('D6').alignment = {horizontal: 'left'}
        
        worksheet.getCell('F6').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.getCell('B7').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('D7').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('F7').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.getCell('B8').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('D8').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B9').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        
        worksheet.getCell('B12').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B13').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B14').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };

        worksheet.getCell('B17').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B18').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B19').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };
        worksheet.getCell('B20').font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: false };


        worksheet.getColumn(1).width = 30;
        worksheet.getColumn(2).width = 30;
        worksheet.getColumn(3).width = 30;
        worksheet.getColumn(4).width = 30;
        worksheet.getColumn(5).width = 30;
        worksheet.getColumn(6).width = 30;

        workbook.xlsx.writeBuffer().then((data: any) => {  
                const blob = new Blob([data], {  
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  
                });  
                fs.saveAs(blob, FileName + '.xlsx');  
            });  
    }

}
