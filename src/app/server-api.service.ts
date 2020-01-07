import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  constructor(private http: HttpClient) { }

  getStock(symbol: string) {
    return this.http.get(`http://localhost:8080/practicaFinal/stock?symbol=${symbol}`);
  }

  getNews(symbol: string) {
    return this.http.get(`http://localhost:8080/practicaFinal/news?symbol=${symbol}`);
  }

  getScore(symbol: string, newId: string) {
    return this.http.get(`http://localhost:8080/practicaFinal/stock?symbol=${symbol}&id=${newId}`);
  }

  getData(symbol: string) {
    return this.http.get(`http://localhost:8080/practicaFinal/data?symbol=${symbol}`);
  }
}
