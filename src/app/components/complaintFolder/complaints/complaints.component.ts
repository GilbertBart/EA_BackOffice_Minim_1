import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef,CellClickedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/interfaces/complaint.interface';
import { ComplaintService } from 'src/app/services/complaint.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  complaints!: Complaint[];
  constructor(private complaintSrv: ComplaintService,private router: Router) { }

  rowData$!: any;

  colDef: ColDef[] = [
    {field: '_id'},
    {field: 'dayOfComplaint'}
  ];

  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  onCellClicked( e: CellClickedEvent): void {
    this.router.navigate(['/bookings/', e.data._id]);
  }
  ngOnInit(): void {
    this.complaintSrv.getAll().subscribe(
      resp => {
        if(resp.status == 200){
          this.complaints = resp.body!
          this.rowData$ = this.complaints.map(({ _id, dayOfComplaint }) => ({ _id, dayOfComplaint }))
        }
      }
    );
  } 
}
