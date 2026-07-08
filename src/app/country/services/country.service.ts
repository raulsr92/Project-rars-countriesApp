import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {  RESTCountryResponse } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

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

    searchByCapital(query:string):Observable<Country[]>{

      query = query.toLowerCase();

      console.log(this.headers)
      console.log(`${API_URL}/capitals?q=${query}`)

      return this.http.get<RESTCountryResponse>(`${API_URL}/capitals?q=${query}`,{
        headers: this.headers
      }).pipe(

          map( resp => resp.data.objects),
          map( (respCountries)=> CountryMapper.mapRESTCountriesToCountryArray(respCountries)),

          catchError(error =>{
            console.log('Error fetching', error)
            return throwError(()=> new Error('No se pudo obtener países con ese query'))
          }),

      )
    }

}
