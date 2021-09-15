import { Component, OnInit } from '@angular/core';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MessengerService } from 'src/app/services/messenger.service';
import { UserAuthService } from 'src/app/services/user-authorization.services';
import { UtilityService } from 'src/app/services/utility.services';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  rowDataConfiguration: any;
  private apiConiguration: GridApi;
  private columnApiConfigurtion: ColumnApi;
  socialUser: any;

  constructor(private apiUserAuthService: UserAuthService, private cookieService:CookieService, private toastrService: ToastrService,private msgService :MessengerService, private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.rowDataConfiguration = this.apiUserAuthService.getAllUserAuthoriation();
    this.socialUser = this.cookieService.get('userId')?.toString();
    this.msgService.sendClearProductSearch();
  }

  columnDefsConfiguration = [
    { headerName: 'UserId', field: 'userId', sortable: true, filter: true, editable: false },
    { headerName: 'Is User Admin', field: 'isAdmin', sortable: true, filter: true, editable: true },
    { headerName: 'Updated By', field: 'modifiedBy', sortable: true, filter: true, editable: false },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true, editable: false }]

    onGridReadyConfiguration(params: any): void {
      this.apiConiguration = params.api;
      this.columnApiConfigurtion = params.columnApi;
      this.apiConiguration.sizeColumnsToFit();
      // temp fix until AG-1181 is fixed
      this.apiConiguration.hideOverlay();
    }

    onCellValueChangedConfiguration(params: any) {
      if (params.oldValue === params.newValue) return;

      if(params.newValue === 'true' || params.newValue === 'false')
      {
        if (this.utilityService.ConfirmUserAuthDialog()) {

        }
        else{
          this.rowDataConfiguration = this.apiUserAuthService.getAllUserAuthoriation()
          return;
        }
         
      }
      else{
        alert('Is User Admin can only be true or false')
        this.rowDataConfiguration = this.apiUserAuthService.getAllUserAuthoriation()
        return;
      }
      params.data.modifiedBy = this.socialUser;

      this.apiUserAuthService.updateUserAuthorization(JSON.stringify(params.data), params.data._id).subscribe((response) =>
        (this.toastrService.success('User Authorization updated successfully!', 'Confirmation Msg!'), this.rowDataConfiguration = this.apiUserAuthService.getAllUserAuthoriation()),
       error => (this.toastrService.error('User Authorization failed!', 'Confirmation Msg!'), console.log('error'))
      )
  
    }

   
}


