import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonInformationComponent } from './../../general/person-information/person-information.component';
import { UpdatePersonComponent } from './../../general/update-person/update-person.component';
import { HomeComponent } from './../../home/home.component';
import { ApplicationManagerComponent } from './../../hris/application-manager/application-manager.component';
import { EmployeeInformationComponent } from './../../hris/employee-information/employee-information.component';
import { LeaveManagementComponent } from './../../hris/leave-management/leave-management.component';
import { UserManagementComponent } from './../../control-panel/user-management/user-management.component';
import { StudentInformationComponent } from './../../academic/student-information/student-information.component';
import { AdmissionComponent } from './../../academic/admission/admission.component';
import { SchoolYearSettingComponent } from './../../control-panel/school-year-setting/school-year-setting.component';
import { EnrollmentManagerComponent } from './../../academic/enrollment-manager/enrollment-manager.component';
import { StudentRegistrationComponent } from './../../academic/student-registration/student-registration.component';
import { SetsManagerComponent } from './../../academic/sets-manager/sets-manager.component';
import { PurgingComponent } from './../../academic/purging/purging.component';
import { CurriculumComponent } from './../../academic/curriculum/curriculum.component';
import { SubjectsComponent } from './../../academic/curriculum/subjects/subjects.component';
import { DepartmentsComponent } from './../../hris/hris-maintenance/departments/departments.component';
import { PositionsComponent } from './../../hris/hris-maintenance/positions/positions.component';
import { RanksComponent } from './../../hris/hris-maintenance/ranks/ranks.component';
import { ItemsComponent } from './../../hris/hris-maintenance/items/items.component';
import { StudentEvaluationComponent } from './../../academic/student-evaluation/student-evaluation.component';
import { UserManagementStudentComponent } from './../../control-panel/user-management-student/user-management-student.component';
import { RoleManagementComponent } from './../../control-panel/role-management/role-management.component';
import { CodeProjectionComponent } from './../../reports/academic/pre-enrolment/code-projection/code-projection.component';
import { PlacementSummaryComponent } from './../../reports/academic/pre-enrolment/placement-summary/placement-summary.component';
import { EnrolmentListComponent } from './../../reports/ched/enrolment-list/enrolment-list.component';
import { EnrolmentSummaryComponent } from './../../reports/ched/enrolment-summary/enrolment-summary.component';
import { NstpComponent } from './../../reports/ched/nstp/nstp.component';
import { ClassListComponent } from './../../reports/academic/faculty/class-list/class-list.component';
import { CodeSummaryComponent } from './../../reports/academic/faculty/code-summary/code-summary.component';
import { AppManagerComponent } from './../../control-panel/app-manager/app-manager.component';
import { EnrollmentSummaryComponent } from './../../academic/enrollment-summary/enrollment-summary.component';
import { ExamScheduleComponent } from './../../academic/exam-schedule/exam-schedule.component';
import { StudentEnrollmentListComponent } from './../../reports/academic/student/student-enrollment-list/student-enrollment-list.component';
import { ScheduleManagerComponent } from './../../hris/schedule/schedule-manager/schedule-manager.component';
import { CompanyComponent } from './../../academic/maintenance/company/company.component';
import { OnlineRegistrationComponent } from './../../academic/online-registration/online-registration.component';
import { ApplicantSummaryComponent } from './../../reports/academic/applicant-summary/applicant-summary.component';
import { PlacementManagerComponent } from './../../academic/placement-manager/placement-manager.component';
import { EntranceExamScheduleManagerComponent } from './../../academic/maintenance/entrance-exam-schedule-manager/entrance-exam-schedule-manager.component';
import { StudentEnrollmentStatisticComponent } from './../../reports/academic/student/student-enrollment-statistic/student-enrollment-statistic.component';
import { StudentEnrollmentSummaryComponent } from './../../reports/academic/student/student-enrollment-summary/student-enrollment-summary.component';
import { G9ElectiveComponent } from './../../academic/g9-elective/g9-elective.component';
import { ModalityComponent } from './../../academic/modality/modality.component';
import { SectionManagerComponent } from './../../academic/section-manager/section-manager.component';
import { HsClassScheduleComponent } from './../../academic/hs-class-schedule/hs-class-schedule.component';
import { ReportModalitiesComponent } from './../../reports/academic/report-modalities/report-modalities.component';
import { OGSComponent } from './../../academic/ogs/ogs.component';
import { EmployeeProfileComponent } from './../../reports/hris/employee-profile/employee-profile.component';
import { CollegePreenrollmentComponent } from './../../academic/college-preenrollment/college-preenrollment.component';
import { CollegePreenrolmentstatDepartmentComponent } from './../../reports/academic/pre-enrolment/college/college-preenrolmentstat-department/college-preenrolmentstat-department.component';
import { CollegePreenrolmentstatCourseComponent } from './../../reports/academic/pre-enrolment/college/college-preenrolmentstat-course/college-preenrolmentstat-course.component';
import { ApplicantListReportRecommendedComponent } from './../../reports/academic/pre-enrolment/applicant-list-report-recommended/applicant-list-report-recommended.component';

const routes: Routes = [

    { path: 'Applicant-List-Report-Recommended-Report', component: ApplicantListReportRecommendedComponent, outlet: 'div'  },
    { path: 'College-PreenrollmentStat-Department-Report', component: CollegePreenrolmentstatDepartmentComponent, outlet: 'div'  },
    { path: 'College-PreenrollmentStat-Course-Report', component: CollegePreenrolmentstatCourseComponent, outlet: 'div'  },
    { path: 'Electronic-Grading-Sheet', component: OGSComponent, outlet: 'div'  },
    { path: 'College-Preenrollment', component: CollegePreenrollmentComponent, outlet: 'div'  },
    { path: 'Learning-Modality-Report', component: ReportModalitiesComponent, outlet: 'div'  },
    { path: 'Hs-Class-Schedule-Uploader', component: HsClassScheduleComponent, outlet: 'div'  },
    { path: 'Section-Manager', component: SectionManagerComponent, outlet: 'div'  },
    { path: 'Modality', component: ModalityComponent, outlet: 'div'  },
    { path: 'Grade-9-Elective', component: G9ElectiveComponent, outlet: 'div'  },
    { path: 'Report-Enrollment-Summary', component: StudentEnrollmentSummaryComponent, outlet: 'div'  },
    { path: 'Report-Enrollment-Statistic', component: StudentEnrollmentStatisticComponent, outlet: 'div'  },
    { path: 'placement-manager', component: PlacementManagerComponent, outlet: 'div'  },
    { path: 'person-information', component: PersonInformationComponent, outlet: 'div'  },
    { path: 'applicant-summary', component: ApplicantSummaryComponent, outlet: 'div'  },
    { path: 'update-person', component: UpdatePersonComponent, outlet: 'div'  },
    { path: 'home', component: HomeComponent, outlet: 'div' },
    { path: 'application-manager', component: ApplicationManagerComponent, outlet: 'div' },
    { path: 'employee-information', component: EmployeeInformationComponent, outlet: 'div' },
    { path: 'user-management', component: UserManagementComponent, outlet: 'div' },
    { path: 'student-information', component: StudentInformationComponent, outlet: 'div' },
    { path: 'admission', component: AdmissionComponent, outlet: 'div' },
    { path: 'sy-setting', component: SchoolYearSettingComponent, outlet: 'div' },
    { path: 'Enrollment-Manager', component: EnrollmentManagerComponent, outlet: 'div' },
    { path: 'Student-Registration', component: StudentRegistrationComponent, outlet: 'div' },
    { path: 'Sets-Manager', component: SetsManagerComponent, outlet: 'div' },
    { path: 'leave-management', component: LeaveManagementComponent, outlet: 'div' },
    { path: 'purge-list', component: PurgingComponent, outlet: 'div' },
    { path: 'curriculum', component: CurriculumComponent, outlet: 'div' },
    { path: 'subjects', component: SubjectsComponent, outlet: 'div' },
    { path: 'hris-maintenance-departments', component: DepartmentsComponent, outlet: 'div' },
    { path: 'hris-maintenance-positions', component: PositionsComponent, outlet: 'div' },
    { path: 'hris-maintenance-ranks', component: RanksComponent, outlet: 'div' },
    { path: 'hris-maintenance-items', component: ItemsComponent, outlet: 'div' },
    { path: 'student-evaluation', component: StudentEvaluationComponent, outlet: 'div' },
    { path: 'user-management-student', component: UserManagementStudentComponent, outlet: 'div' },
    { path: 'role-management', component: RoleManagementComponent, outlet: 'div' },
    { path: 'report-code-projection', component: CodeProjectionComponent, outlet: 'div' },
    { path: 'report-placement-summary', component: PlacementSummaryComponent, outlet: 'div' },
    { path: 'ched/enrolment-summary', component: EnrolmentSummaryComponent, outlet: 'div' },
    { path: 'ched/enrolment-list', component: EnrolmentListComponent, outlet: 'div' },
    { path: 'ched/NSTP', component: NstpComponent, outlet: 'div' },
    { path: 'Faculty/Classlist', component: ClassListComponent, outlet: 'div' },
    { path: 'Faculty/Code-summary', component: CodeSummaryComponent, outlet: 'div' },
    { path: 'app-manager', component: AppManagerComponent, outlet: 'div' },
    { path: 'enrollment-summary', component: EnrollmentSummaryComponent, outlet: 'div' },
    { path: 'exam-schedule', component: ExamScheduleComponent, outlet: 'div' },
    { path: 'student/enrolment-list', component: StudentEnrollmentListComponent, outlet: 'div' },
    { path: 'hris-schedule-manager', component: ScheduleManagerComponent, outlet: 'div' },
    { path: 'academic-company', component: CompanyComponent, outlet: 'div' },
    { path: 'online-registration', component: OnlineRegistrationComponent, outlet: 'div' },
    { path: 'entrance-exam-schedule-manager', component: EntranceExamScheduleManagerComponent, outlet: 'div' },
    { path: 'Report-Employee-Profile', component: EmployeeProfileComponent, outlet: 'div' },
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AfterLoginRouteModule { }