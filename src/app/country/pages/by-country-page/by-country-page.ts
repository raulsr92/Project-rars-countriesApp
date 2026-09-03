import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
    /*
    logValue(value:string){

      console.log('Se recibió el valor: '+value+" en el padre")

    }
    */

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios propios
    countryService = inject(CountryService)

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios de Angular

    activatedRoute = inject(ActivatedRoute)
    router = inject(Router)

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Capturar query parameter

    queryParam = this.activatedRoute.snapshot.queryParamMap.get("query") ?? "" ;
    query = linkedSignal<string>(()=>this.queryParam);

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Async reactivity with resources


  countryResource = resource({

    params: ()=>({ query: this.query() }),

    loader: async({params })=>{

      console.log({query: params.query})

      //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 1: query vacío
        if (params.query ===  '') return [];

        this.router.navigate(["/country/by-country"],
          {
            queryParams:{
              query: params.query
            }
          })

      //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 2: query con data
        return await firstValueFrom(
          this.countryService.searchByCountry(params.query)
        )
    }
  })
}
