import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSULTAR_PARQUEADEROS } from '../models/request.model';

@Injectable({
  providedIn: 'root'
})
export class SoapService {

  constructor(private http: HttpClient) { }

  private HEADERS = new HttpHeaders({
    'Content-Type': 'text/xml',
  });

  private SOAP = '/api/ws';

  public consultarParqueaderos() {
    return this.http.post(this.SOAP, CONSULTAR_PARQUEADEROS, {headers: this.HEADERS, responseType: 'text'});
  }

}
