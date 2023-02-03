import { NgModule } from '@angular/core';
 import { AfterLoginRouteModule } from './after-login-route.module';
 import { PersonInformationComponent } from './../../general/person-information/person-information.component';
 import { UpdatePersonComponent } from './../../general/update-person/update-person.component';
import { MaterialModule } from './../../material.module';
import { CommonModule } from '@angular/common';
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
import { NgxPaginationModule} from 'ngx-pagination';
import { OnlineRegistrationComponent } from './../../academic/online-registration/online-registration.component';
import { OnlineRegistrationUpdateComponent } from './../../academic/online-registration/online-registration-update/online-registration-update.component';
import { ApplicantSummaryComponent } from './../../reports/academic/applicant-summary/applicant-summary.component';
import { PersonAssignApplicantComponent } from './../../general/person-information/person-assign-applicant/person-assign-applicant.component';
import { PlacementManagerComponent } from './../../academic/placement-manager/placement-manager.component';
import { EntranceExamScheduleManagerComponent } from './../../academic/maintenance/entrance-exam-schedule-manager/entrance-exam-schedule-manager.component';
import { ModifyScheduleComponent } from './../../hris/schedule/pop-ups/modify-schedule/modify-schedule.component';
import { PopUpComponent } from './../../academic/maintenance/entrance-exam-schedule-manager/pop-up/pop-up.component';
import { StudentEnrollmentStatisticComponent } from './../../reports/academic/student/student-enrollment-statistic/student-enrollment-statistic.component';
import { StudentEnrollmentSummaryComponent } from './../../reports/academic/student/student-enrollment-summary/student-enrollment-summary.component';
import { G9ElectiveComponent } from './../../academic/g9-elective/g9-elective.component';
import { G9ElectiveUpdateComponent } from './../../academic/g9-elective/g9-elective-update/g9-elective-update.component';
import { ModalityComponent } from './../../academic/modality/modality.component';
import { SectionManagerComponent } from './../../academic/section-manager/section-manager.component';
import { UploadSectionComponent } from './../../academic/section-manager/upload-section/upload-section.component';
import { HsClassScheduleComponent } from './../../academic/hs-class-schedule/hs-class-schedule.component';
import { ReportModalitiesComponent } from './../../reports/academic/report-modalities/report-modalities.component';
import { SesPopupComponent } from './../../reports/academic/student/student-enrollment-summary/ses-popup/ses-popup.component';
import { OnlineRegistrationVerifyComponent } from './../../academic/online-registration/online-registration-verify/online-registration-verify.component';
import { PlacementReportcardComponent } from './../../academic/placement-manager/placement-reportcard/placement-reportcard.component';
import { OGSComponent } from './../../academic/ogs/ogs.component';
import { AdmittedDialogComponent } from './../../reports/academic/faculty/class-list/admitted-dialog/admitted-dialog.component';

import { EmployeeProfileComponent } from './../../reports/hris/employee-profile/employee-profile.component';

import { SharedServicesService } from './../../reports/shared-services.service';

import { CollegePreenrollmentComponent } from './../../academic/college-preenrollment/college-preenrollment.component';
import { CollegePreenrollmentPopupComponent } from './../../academic/college-preenrollment/college-preenrollment-popup/college-preenrollment-popup.component';

import { EmployeeProfileDetailsComponent } from './../../reports/hris/employee-profile/employee-profile-details/employee-profile-details.component';
import { CollegePreenrolmentstatDepartmentComponent } from './../../reports/academic/pre-enrolment/college/college-preenrolmentstat-department/college-preenrolmentstat-department.component';
import { CollegePreenrolmentstatCourseComponent } from './../../reports/academic/pre-enrolment/college/college-preenrolmentstat-course/college-preenrolmentstat-course.component';
import { ApplicantListReportRecommendedComponent } from './../../reports/academic/pre-enrolment/applicant-list-report-recommended/applicant-list-report-recommended.component';
import { ApplicantTextBlastComponent } from './../../academic/online-registration/applicant-text-blast/applicant-text-blast.component';

import { LoadingApplicantTextBlastComponent } from './../../academic/online-registration/applicant-text-blast/loading-applicant-text-blast/loading-applicant-text-blast.component';
@NgModule({
  imports: [
    CommonModule,
    AfterLoginRouteModule,
    MaterialModule,
    NgxPaginationModule
  ],
  declarations: [
    PersonInformationComponent,
    UpdatePersonComponent,
    HomeComponent,
    ApplicationManagerComponent,
    EmployeeInformationComponent,
    LeaveManagementComponent,
    UserManagementComponent,
    StudentInformationComponent,
    AdmissionComponent,
    SchoolYearSettingComponent,
    EnrollmentManagerComponent,
    StudentRegistrationComponent,
    SetsManagerComponent,
    PurgingComponent,
    CurriculumComponent ,
    SubjectsComponent,
    DepartmentsComponent,
    PositionsComponent,
    RanksComponent,
    ItemsComponent,
    StudentEvaluationComponent,
    UserManagementStudentComponent,
    RoleManagementComponent,
    CodeProjectionComponent,
    PlacementSummaryComponent,
    EnrolmentListComponent,
    EnrolmentSummaryComponent,
    NstpComponent,
    ClassListComponent,
    CodeSummaryComponent,
    AppManagerComponent,
    EnrollmentSummaryComponent,
    ExamScheduleComponent,
    StudentEnrollmentListComponent,
    ScheduleManagerComponent,
    CompanyComponent,
    OnlineRegistrationComponent,
    OnlineRegistrationUpdateComponent,
    ApplicantSummaryComponent,
    PersonAssignApplicantComponent,
    PlacementManagerComponent,
    EntranceExamScheduleManagerComponent,
    ModifyScheduleComponent,
    PopUpComponent,
    StudentEnrollmentStatisticComponent,
    G9ElectiveComponent,
    StudentEnrollmentSummaryComponent,
    G9ElectiveUpdateComponent,
    ModalityComponent,
    SectionManagerComponent,
    UploadSectionComponent,
    HsClassScheduleComponent,
    ReportModalitiesComponent,
    SesPopupComponent,
    OnlineRegistrationVerifyComponent,
    PlacementReportcardComponent,
    OGSComponent,
    AdmittedDialogComponent,
    EmployeeProfileComponent,
    CollegePreenrollmentComponent,
    CollegePreenrollmentPopupComponent,
    EmployeeProfileDetailsComponent,
    CollegePreenrolmentstatDepartmentComponent,
    CollegePreenrolmentstatCourseComponent,
    ApplicantListReportRecommendedComponent,
    ApplicantTextBlastComponent,
    LoadingApplicantTextBlastComponent
  ],
   entryComponents: [
    ScheduleManagerComponent,
    LeaveManagementComponent,
    OnlineRegistrationUpdateComponent,
    PersonAssignApplicantComponent,
    ModifyScheduleComponent,
    PopUpComponent,
    G9ElectiveUpdateComponent,
    UploadSectionComponent,
    SesPopupComponent,
    OnlineRegistrationVerifyComponent,
    PlacementReportcardComponent,
    AdmittedDialogComponent,
    CollegePreenrollmentPopupComponent,
    EmployeeProfileDetailsComponent,
    ApplicantTextBlastComponent,
    LoadingApplicantTextBlastComponent
   ]
})
export class AfterLoginModule { }