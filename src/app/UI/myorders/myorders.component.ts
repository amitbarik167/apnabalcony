import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss']
})
export class MyordersComponent implements OnInit {

  rowDataOrders: any;
  private apiOrder: GridApi;
  private columnApiOrder: ColumnApi;
  socialUser: any;
  orderItems = [] as any;
  customerDetails=[] as any;
  requirement:string =''

  constructor(private apiOrderService: OrderService, private cookieService:CookieService, private toastrService: ToastrService,private msgService :MessengerService) { }

  ngOnInit(): void {
    this.socialUser = this.cookieService.get('userId')?.toString();
    this.rowDataOrders = this.apiOrderService.getOrderByUserId(this.socialUser);
    this.msgService.sendClearProductSearch();
  }

  columnDefsOrders = [
    { headerName: 'Order No', field: 'orderNo', sortable: true, filter: true, editable: false,  resizable: true  },
    { headerName: 'Customer EmailId', field: 'userId', sortable: true, filter: true, editable: false ,  resizable: true },
    { headerName: 'Status', field: 'status', sortable: true, filter: true, editable: false ,  resizable: true },
    { headerName: 'Expected Total Price', field: 'expectedTotalPrice', sortable: true, filter: true, editable: false,  resizable: true  },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false ,  resizable: true },
]

    onGridReadyOrders(params: any): void {
      this.apiOrder = params.api;
      this.columnApiOrder = params.columnApi;
      this.apiOrder.sizeColumnsToFit();
      // temp fix until AG-1181 is fixed
      this.apiOrder.hideOverlay();
    }

    onCellValueChangedOrder(params: any) {
      if (params.oldValue === params.newValue) return;

      
      params.data.modifiedBy = this.socialUser;

      this.apiOrderService.updateOrder(JSON.stringify(params.data), params.data._id).subscribe((response) =>
        (this.toastrService.success('Order updated successfully!', 'Confirmation Msg!'), this.rowDataOrders = this.apiOrderService.getAllOrders()),
       error => (this.toastrService.error('Order update failed!', 'Confirmation Msg!'), console.log('error'))
      )
  
    }

    getOrderItems(params:any) {
      var selectedData = this.apiOrder.getSelectedRows();
      if (selectedData.length > 0) {
       
          this.apiOrderService.getOrderItemsByOrderId(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
          this.orderItems= response)

          this.apiOrderService.getCustomerDetailsByOrderId(selectedData.find(x => x._id)["_id"]).subscribe((response) =>
          this.customerDetails= response)

          this.requirement = selectedData[0].requirement
      }
      else {
        alert('Please select a row!');
      }
}
}