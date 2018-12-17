import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecognitionService {
  constructor(private http: HttpClient) { }

  recognize(imgBytes: Object, changeCallback) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/upload"
      })
    };

    this.http.post('/dr-frontend/v1/recognize', imgBytes, httpOptions).subscribe(value =>{
        console.log('value:', value);

        changeCallback(value);
    },
    error => {
        console.log('error', error);
        changeCallback(error);
    });
  }
}
