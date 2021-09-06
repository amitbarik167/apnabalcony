import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  rowDataOrders: any;
  private apiOrder: GridApi;
  private columnApiOrder: ColumnApi;
  socialUser: any;
  orderItems = [] as any;
  customerDetails=[] as any;
  requirement:string =''

  constructor(private apiOrderService: OrderService, private cookieService:CookieService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.rowDataOrders = this.apiOrderService.getAllOrders();
    this.socialUser = this.cookieService.get('userId')?.toString();
  }

  columnDefsOrders = [
    { headerName: 'Order No', field: 'orderNo', sortable: true, filter: true, editable: false },
    { headerName: 'Customer EmailId', field: 'userId', sortable: true, filter: true, editable: false },
    { headerName: 'Status', field: 'status', sortable: true, filter: true, editable: true },
    { headerName: 'Expected Total Price', field: 'expectedTotalPrice', sortable: true, filter: true, editable: false },
    { headerName: 'Requirement', field: 'requirement', tooltipField: 'requirement', sortable: true, filter: true, editable: false },
    { headerName: 'Updated By', field: 'modifiedBy', sortable: true, filter: true, editable: false },
    { headerName: 'Created At', field: 'createdAt', sortable: true, filter: true, editable: false },
    { headerName: 'Updated At', field: 'updatedAt', sortable: true, filter: true, editable: false }]

    onGridReadyOrders(params: any): void {
      this.apiOrder = params.api;
      this.columnApiOrder = params.columnApi;
      this.apiOrder.sizeColumnsToFit();
      // temp fix until AG-1181 is fixed
      this.apiOrder.hideOverlay();
    }

    onCellValueChangedOrder(params: any) {
      if (params.oldValue === params.newValue) return;

      if(params.newValue === 'Cancelled' || params.newValue === 'WIP' || params.newValue === 'Completed'  )
      {
      
      }
      else{
        alert('Order status can only be Cancelled or WIP or Completed')
        this.rowDataOrders = this.apiOrderService.getAllOrders()
        return;
      }
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
