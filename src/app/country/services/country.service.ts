import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RESTCountryResponse } from '../interfaces/rest-countries.interfaces';

const API_URL = 'https://api.restcountries.com/countries/v5';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Environments
  envs = environment

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Inyección cliente Http
  private http = inject(HttpClient);
  // This service can now make HTTP requests via `this.http`.

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.envs.restCountriesApiKey}`
  });

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Métodos

    searchByCapital(query:string){

      query = query.toLowerCase();

      console.log(this.headers)
      console.log(`${API_URL}/capitals?q=${query}`)

      return this.http.get<RESTCountryResponse>(`${API_URL}/capitals?q=${query}`,{
        headers: this.headers
      })
    }

}
