import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {  RESTCountryResponse } from '../interfaces/rest-countries.interfaces';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
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

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Caché de búsquedas

  private queryCacheCapital = new Map<string, Country[]>()

  private headers = new HttpHeaders({
    Authorization: `Bearer ${this.envs.restCountriesApiKey}`
  });

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Métodos

    //∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞ Método para buscar por el nombre de su capital

    searchByCapital(query:string):Observable<Country[]>{

      query = query.toLowerCase();

      //Verificar si ya existe la búsqueda en caché

          if(this.queryCacheCapital.has(query)){

            //retornamos el valor al que le corresponde esa key (que es la query) como un observable

            return of(this.queryCacheCapital.get(query)!)
          }

          console.log(`Llegando al servidor por ${query}`)

      //console.log(this.headers)
      //console.log(`${API_URL}/capitals?q=${query}`)

      //console.log(`Emitiendo valor ${query}`)
      //return of([]);

      return this.http.get<RESTCountryResponse>(`${API_URL}/capitals?q=${query}`,{
        headers: this.headers
      }).pipe(

          map( resp => resp.data.objects),
          map( (respCountries)=> CountryMapper.mapRESTCountriesToCountryArray(respCountries)),
          tap(
              countries =>{
                  this.queryCacheCapital.set(query,countries)

                  console.log(this.queryCacheCapital)
              }
          ),
          catchError(error =>{
            console.log('Error fetching', error)
            return throwError(()=> new Error('No se pudo obtener países con ese query'))
          }),

      )
    }

    //∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞ Método para buscar por el nombre del país


    searchByCountry(query:string):Observable<Country[]>{

      query = query.toLowerCase();

      console.log(this.headers)

      return this.http.get<RESTCountryResponse>(`${API_URL}/names.common?q=${query}`,{
        headers: this.headers
      }).pipe(

          map( resp => resp.data.objects),
          map( (respCountries)=> CountryMapper.mapRESTCountriesToCountryArray(respCountries)),
          delay(1000),
          catchError(error =>{
            console.log('Error fetching', error)
            return throwError(()=> new Error('No se pudo obtener países con ese query'))
          }),

      )
    }

    //∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞ Método para traer la infomación de un país

    searchCountryByAlphaCode(code: string){

      const URL = `${API_URL}/codes.alpha_2/${code}`

      return this.http.get<RESTCountryResponse>(URL,{
        headers: this.headers
      }).pipe(
          map( resp => resp.data.objects),
          map( (respCountries)=> CountryMapper.mapRESTCountriesToCountryArray(respCountries)),
          map( (countries)=>countries.at(0)),
          delay(1000),
          catchError(error =>{
            console.log('Error fetching', error)
            return throwError(()=> new Error(`No se pudo obtener países con ese código:  ${code}`))
          }),

      )
    }


}


