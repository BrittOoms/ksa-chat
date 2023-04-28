import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MesssageService {

  constructor(private http:HttpClient) {}

  sendMessage(message:string){
    this.http.post<any>(`http://localhost:3000/send`,{data:message}).subscribe()
  }
}
