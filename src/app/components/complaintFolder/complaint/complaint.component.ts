import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/interfaces/booking.interface';
import { BookingService } from 'src/app/services/booking.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { Complaint } from 'src/app/interfaces/complaint.interface'
import { ComplaintService } from 'src/app/services/complaint.service';
@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  complaint!: Complaint;
  constructor(private complaintSrv: ComplaintService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

    const data: any = this.route.snapshot.data;
    if (data.complaintData.status == 200) {
      this.complaint = data.complaintData.body.complaint;
      console.log(this.complaint);
    }

  }

  delete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { _id: this.complaint._id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.complaintSrv.deleteOne(this.complaint._id).subscribe(
          response => {
            if (response.status == 200) {
              this.router.navigate(['/complaints/']);
            }
          });
      }
    });

  }
}
