import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MesssageService {

  constructor(private http:HttpClient) {}

  sendMessage(message:string){
    console.log(message)
    // this.http.post<any>(`http://localhost:3000/send`,{message})
    this.http.get<any>(`http://localhost:3000/hello`)
  }
}
