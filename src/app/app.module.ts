import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { GlobalService } from './global.service';
import { HttpModule } from '@angular/http';
import { StorageServiceModule } from 'angular-webstorage-service';
import { RoleUpdateComponent } from './control-panel/user-management/role-update/role-update.component';
import { RoleAddComponent } from './control-panel/user-management/role-add/role-add.component';
import { UserRoleManagementComponent } from './control-panel/user-management/user-role-management/user-role-management.component';
import { UpdatePersonalInformationComponent } from './hris/employee-information/update-personal-information/update-personal-information.component';
import { AddressLookupComponent } from './academic/student-information/address-lookup/address-lookup.component';
import { CookieService } from 'ngx-cookie-service';
import { FamilyBackgroundComponent } from './academic/student-information/family-background/family-background.component';
import { EducationalBackgroundComponent } from './academic/student-information/educational-background/educational-background.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ActiveConfigurationComponent } from './control-panel/active-configuration/active-configuration.component';
import { ManageSyComponent } from './control-panel/school-year-setting/manage-sy/manage-sy.component';
import { UpdateComponent } from './control-panel/school-year-setting/manage-sy/update/update.component';
import { LookupCodeComponent } from './academic/enrollment-manager/lookup-code/lookup-code.component';
import { ShowGradeComponent } from './academic/lookup/show-grade/show-grade.component';
import { ChildrenComponent } from './hris/employee-information/children/children.component';
import { UpdateChildrenComponent } from './hris/employee-information/update-children/update-children.component';
import { EducationalbackgroundAddComponent } from './hris/employee-information/educationalbackground-add/educationalbackground-add.component';
import { EducationalbackgroundUpdateComponent } from './hris/employee-information/educationalbackground-update/educationalbackground-update.component';
import { AddEligComponent } from './hris/employee-information/eligibility/add-elig/add-elig.component';
import { UpdateEligComponent } from './hris/employee-information/eligibility/update-elig/update-elig.component';
import { AddSaTComponent } from './hris/employee-information/seminars-trainings/add-sa-t/add-sa-t.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { UpdateSaTComponent } from './hris/employee-information/seminars-trainings/update-sa-t/update-sa-t.component';
import { AddWeComponent } from './hris/employee-information/work-experience/add-we/add-we.component';
import { UpdateWeComponent } from './hris/employee-information/work-experience/update-we/update-we.component';
import { ConfirmationDialogComponent } from './hris/confirmation-dialog/confirmation-dialog.component';
import { AddResearchComponent } from './hris/employee-information/research/add-research/add-research.component';
import { UpdateResearchComponent } from './hris/employee-information/research/update-research/update-research.component';
import { AddComExtComponent } from './hris/employee-information/community-extension/add-com-ext/add-com-ext.component';
import { UpdateComExtComponent } from './hris/employee-information/community-extension/update-com-ext/update-com-ext.component';
import { PrintComponent } from './academic/enrollment-manager/print/print.component';
import { AddSetsComponent } from './academic/sets-manager/add-sets/add-sets.component';
import { AssignSetsComponent } from './academic/sets-manager/assign-sets/assign-sets.component';
import { AddPorgComponent } from './hris/employee-information/professional-organization/add-porg/add-porg.component';
import { UpdatePorgComponent } from './hris/employee-information/professional-organization/update-porg/update-porg.component';
import { ChangePasswordComponent } from './main/change-password/change-password.component';
import { FamilyBackgroundGuardianComponent } from './academic/student-information/family-background-guardian/family-background-guardian.component';
import { EditLeaveComponent } from './hris/leave-management/edit-leave/edit-leave.component';
import { StudentLookupComponent } from './academic/lookup/student-lookup/student-lookup.component';
import { EmployeeLookupComponent } from './academic/lookup/employee-lookup/employee-lookup.component';
import { AlternativeCodeComponent } from './academic/enrollment-manager/alternative-code/alternative-code.component';
import {PurgeServicesService} from './academic/purging/purge-services.service';
import { FamilyBackgroundFamilymemberComponent } from './academic/student-information/family-background-familymember/family-background-familymember.component';
import { AddCurriculumComponent } from './academic/curriculum/add-curriculum/add-curriculum.component';
import { RetentionPolicyComponent } from './academic/curriculum/retention-policy/retention-policy.component';
import { LookUpCurriculumComponent } from './academic/curriculum/look-up-curriculum/look-up-curriculum.component';
import { PersonLookupComponent } from './academic/lookup/person-lookup/person-lookup.component';
import { AddUpdateSubjectsComponent } from './academic/curriculum/subjects/add-update-subjects/add-update-subjects.component';
import { PreRequisitesComponent } from './academic/curriculum/subjects/pre-requisites/pre-requisites.component';
import { OtherPreRequisitesComponent } from './academic/curriculum/subjects/other-pre-requisites/other-pre-requisites.component';
import { CoRequisitesComponent } from './academic/curriculum/subjects/co-requisites/co-requisites.component';
import { AddUpdateRetentionPolicyComponent } from './academic/curriculum/retention-policy/add-update-retention-policy/add-update-retention-policy.component';
import { ItemModalComponent } from './hris/hris-maintenance/modals/item-modal/item-modal.component';
import { PositionModalComponent } from './hris/hris-maintenance/modals/position-modal/position-modal.component';
import { RankModalComponent } from './hris/hris-maintenance/modals/rank-modal/rank-modal.component';
import { DepartmentModalComponent } from './hris/hris-maintenance/modals/department-modal/department-modal.component';
import {ExcelService} from './academic/curriculum/excel.service';
import { AppointmentsComponent } from './hris/employee-information/employee-records/appointments/appointments.component';
import { ContractsComponent } from './hris/employee-information/employee-records/contracts/contracts.component';
import { RankRecordsComponent } from './hris/employee-information/employee-records/rank-records/rank-records.component';
import { MappingComponent } from './academic/student-evaluation/mapping/mapping.component';
import { UpdateMappingComponent } from './academic/student-evaluation/update-mapping/update-mapping.component';
import { GradeLastSyComponent } from './academic/student-registration/grade-last-sy/grade-last-sy.component';
import { EnrollmentHistoryComponent } from './academic/student-registration/enrollment-history/enrollment-history.component';
import { CurriculumSubjectTypeComponent } from './academic/curriculum/curriculum-subject-type/curriculum-subject-type.component';
import { CurriculumSubjectTypeAddComponent } from './academic/curriculum/curriculum-subject-type/curriculum-subject-type-add/curriculum-subject-type-add.component';

import { SelectSetOptionsComponent } from './academic/enrollment-manager/select-set-options/select-set-options.component';
import { AddUpdateAppComponent } from './control-panel/app-manager/add-update-app/add-update-app.component';
import { GenderComponent } from './reports/academic/student/gender/gender.component';
import { HomePlaceComponent } from './reports/academic/student/home-place/home-place.component';
import { ReligionComponent } from './reports/academic/student/religion/religion.component';
import { AgeComponent } from './reports/academic/student/age/age.component';
import { PersonInfoCheckComponent } from './general/person-information/person-info-check/person-info-check.component';
import { CVComponent } from './hris/employee-information/cv/cv.component';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import { AwardsComponent } from './hris/employee-information/awards/awards.component';
import { SpeakingEngagementComponent } from './hris/employee-information/speaking-engagement/speaking-engagement.component';

import { AddupdateCompanyComponent } from './academic/maintenance/company/addupdate-company/addupdate-company.component';
import { DatePipe } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
import { HeadofofficeComponent } from './hris/leave-management/headofoffice/headofoffice.component';
import { ValidationServiceService } from './hris/hrisServices/validation-service.service';
import { SharedServicesService } from './reports/shared-services.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    UpdatePersonalInformationComponent,
    RoleUpdateComponent,
    RoleAddComponent,
    UserRoleManagementComponent,
    AddressLookupComponent,
    FamilyBackgroundComponent,
    EducationalBackgroundComponent,
    ActiveConfigurationComponent,
    ManageSyComponent,
    UpdateComponent,
    LookupCodeComponent,
    ShowGradeComponent,
    ChildrenComponent,
    UpdateChildrenComponent,
    EducationalbackgroundAddComponent,
    EducationalbackgroundUpdateComponent,
    AddEligComponent,
    UpdateEligComponent,
    AddSaTComponent,
    UpdateSaTComponent,
    AddWeComponent,
    UpdateWeComponent,
    ConfirmationDialogComponent,
    AddResearchComponent,
    UpdateResearchComponent,
    AddComExtComponent,
    UpdateComExtComponent,
    PrintComponent,
    AddSetsComponent,
    AddPorgComponent,
    UpdatePorgComponent,
    AssignSetsComponent,
    ChangePasswordComponent,
    FamilyBackgroundGuardianComponent,
    EditLeaveComponent,
    StudentLookupComponent,
    EmployeeLookupComponent,
    AlternativeCodeComponent,
    FamilyBackgroundFamilymemberComponent,
    AddCurriculumComponent,
    RetentionPolicyComponent,
    LookUpCurriculumComponent,
    PersonLookupComponent,
    AddUpdateSubjectsComponent,
    PreRequisitesComponent,
    OtherPreRequisitesComponent,
    CoRequisitesComponent,
    AddUpdateRetentionPolicyComponent,
    ItemModalComponent,
    PositionModalComponent,
    RankModalComponent,
    DepartmentModalComponent,
    AppointmentsComponent,
    ContractsComponent,
    RankRecordsComponent,
    MappingComponent,
    UpdateMappingComponent,
    GradeLastSyComponent,
    EnrollmentHistoryComponent,
    CurriculumSubjectTypeComponent,
    CurriculumSubjectTypeAddComponent,
    SelectSetOptionsComponent,
    AddUpdateAppComponent,
    GenderComponent,
    HomePlaceComponent,
    ReligionComponent,
    AgeComponent,
    PersonInfoCheckComponent,
    CVComponent,
    SpeakingEngagementComponent,
    AddupdateCompanyComponent,
    AwardsComponent,
    SpeakingEngagementComponent,
    HeadofofficeComponent,
    
  ],
   entryComponents: [
     RoleUpdateComponent,
     RoleAddComponent,
     UserRoleManagementComponent,
     UpdatePersonalInformationComponent,
     AddressLookupComponent,
     FamilyBackgroundComponent,
     EducationalBackgroundComponent,
     ActiveConfigurationComponent,
     ManageSyComponent,
     UpdateComponent,
     LookupCodeComponent,
     ShowGradeComponent,
     ChildrenComponent,
     UpdateChildrenComponent,
     EducationalbackgroundAddComponent,
     EducationalbackgroundUpdateComponent,
     AddEligComponent,
     UpdateEligComponent,
     AddSaTComponent,
     UpdateSaTComponent,
     AddWeComponent,
     UpdateWeComponent,
     ConfirmationDialogComponent,
     AddResearchComponent,
     UpdateResearchComponent,
     AddComExtComponent,
     UpdateComExtComponent,
     PrintComponent,
     AddSetsComponent,
     AddPorgComponent,
     UpdatePorgComponent,
     AssignSetsComponent,
    ChangePasswordComponent,
    EditLeaveComponent,
    StudentLookupComponent,
    EmployeeLookupComponent,
    AlternativeCodeComponent,
    FamilyBackgroundFamilymemberComponent,
    FamilyBackgroundGuardianComponent,
    AddCurriculumComponent,
    RetentionPolicyComponent,
    LookUpCurriculumComponent,
    PersonLookupComponent,
    AddUpdateSubjectsComponent,
    PreRequisitesComponent,
    OtherPreRequisitesComponent,
    CoRequisitesComponent,
    AddUpdateRetentionPolicyComponent,
    ItemModalComponent,
    PositionModalComponent,
    RankModalComponent,
    DepartmentModalComponent,
    AppointmentsComponent,
    ContractsComponent,
    RankRecordsComponent,
    MappingComponent,
    UpdateMappingComponent,
    GradeLastSyComponent,
    EnrollmentHistoryComponent,
    CurriculumSubjectTypeComponent,
    CurriculumSubjectTypeAddComponent,
    SelectSetOptionsComponent,
    AddUpdateAppComponent,
    PersonInfoCheckComponent,
    CVComponent,
    AwardsComponent,
    SpeakingEngagementComponent,
    AddupdateCompanyComponent,
    AwardsComponent,
    SpeakingEngagementComponent,
    HeadofofficeComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,StorageServiceModule,NgxPaginationModule,
    AmazingTimePickerModule,
    HttpClientModule
  ],
  providers: [SharedServicesService,ExcelService,PurgeServicesService,GlobalService,CookieService,{provide: LocationStrategy, useClass: HashLocationStrategy},DatePipe,ValidationServiceService],


  bootstrap: [AppComponent]
})
export class AppModule { }
