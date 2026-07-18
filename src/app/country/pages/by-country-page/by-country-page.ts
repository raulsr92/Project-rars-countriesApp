import { Component, inject, resource, signal } from '@angular/core';
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

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios inyectados
    countryService = inject(CountryService)

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Async reactivity with resources

  query = signal<string>("");

  countryResource = resource({

    params: ()=>({ query: this.query() }),

    loader: async({params })=>{

      //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 1: query vacío
        if (params.query ===  '') return [];

      //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 2: query con data
        return await firstValueFrom(
          this.countryService.searchByCountry(params.query)
        )
    }
  })
}
