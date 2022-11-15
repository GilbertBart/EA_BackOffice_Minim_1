import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/interfaces/booking.interface';
import { Complaint } from 'src/app/interfaces/complaint.interface';
import { Route } from 'src/app/interfaces/route.interface';
import { User } from 'src/app/interfaces/user.interface';
import { BookingService } from 'src/app/services/booking.service';
import { ComplaintService } from 'src/app/services/complaint.service';
import { RouteService } from 'src/app/services/route.service';
import { UsersService } from 'src/app/services/user.service';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent implements OnInit {
  selectedValue!: String;
  complaint!: Complaint;
  users!: User[];
  

  constructor(private complaintSrv: ComplaintService, private usrSrv: UsersService, private routeSrv: RouteService, private route: ActivatedRoute, private router: Router ) { }

  complaintForm = new FormGroup({
    explanation: new FormControl('', Validators.required),
    date: new FormControl('',[Validators.required,Validators.email]),
  })

  ngOnInit(): void {
    const data: any = this.route.snapshot.data;
    if (data.bookingData.status == 200) {
      this.complaint = data.complaintData.body.complaint;
      this.getUsers();

    }
  }


  getUsers(): void{
    this.usrSrv.getUsers().subscribe(
      res => {
        if(res.status == 200 ){
          this.users = res.body!;
        }
      }
    )
  }

}
