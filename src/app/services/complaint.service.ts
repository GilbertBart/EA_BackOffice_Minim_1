import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../interfaces/booking.interface';
import { Complaint } from '../interfaces/complaint.interface';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private apiURL = 'http://localhost:5432/api/complaints/';
  constructor(private http: HttpClient) { }

   getAll(): Observable<HttpResponse<Complaint[]>>{
      return this.http.get<Complaint[]>(this.apiURL, {observe: 'response'});
  } 
  
  getOne(complaintId: String): Observable<HttpResponse<Complaint>>{
    return this.http.get<Complaint>(this.apiURL + complaintId, {observe: 'response'});
  }
  deleteOne(complaintId: string):Observable<HttpResponse<Complaint>>{
    return this.http.delete<Complaint>(this.apiURL+'cancel/'+ complaintId, {observe: 'response'})
  }

  addOne(complaint: Complaint):Observable<HttpResponse<Complaint>>{
    return this.http.post<Complaint>(this.apiURL+'create/', complaint, {observe: 'response'})
  }

  
}
