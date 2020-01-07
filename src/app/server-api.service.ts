import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerApiService {

  constructor(private http: HttpClient) { }

  getStock(symbol: string) {
    const result = this.http.get(`http://localhost:8080/practicaFinal/api/stock?symbol=${symbol}&ng=1`);
    // result.toPromise().then(data => console.log(data));
    return result;
  }

  getNews(symbol: string) {
    return this.http.get(`http://localhost:8080/practicaFinal/api/news?symbol=${symbol}&ng=1`);
  }

  getScore(symbol: string, newId: string) {
    return this.http.get(`http://localhost:8080/practicaFinal/api/score?symbol=${symbol}&id=${newId}&ng=1`);
  }

  getData(symbol: string) {
    return this.http.get(`http://localhost:8080/practicaFinal/api/data?symbol=${symbol}&ng=1`);
  }

  getTranslation(symbol: string, newId: string) {
    return this.http.get(`http://localhost:8080/practicaFinal/api/translate?symbol=${symbol}&id=${newId}&ng=1`);
  }
}
