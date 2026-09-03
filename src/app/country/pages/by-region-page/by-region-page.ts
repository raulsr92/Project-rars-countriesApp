import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { Region } from '../../types/region.types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {

    //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios propios
      countryService = inject(CountryService)

    //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios de Angular

      activatedRoute = inject(ActivatedRoute)

      router = inject(Router)

    //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Capturar query parameter
      queryParam = this.activatedRoute.snapshot.queryParamMap.get("query")

      query = linkedSignal<Region|null>(()=>this.queryParam as Region);

    //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Array de Regiones

      public regions: Region[] = [
          'Africa',
          'Americas',
          'Asia',
          'Europe',
          'Oceania',
          'Antarctic',
        ];
    //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Async reactivity with resources


      countryResource = resource({

        params: ()=>({query: this.query()}),
        loader: async({params})=>{

            //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 1: query vacío
              if (params.query ===  null ) return [];

            //☆☆☆☆ Antes de impactar la API, hacemos la navegación a otra URL con query parameter

              this.router.navigate(["/country/by-region"],
                {
                  queryParams:{
                    query: params.query
                  }
                }
              )

            //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 2: query con data
              return await firstValueFrom(this.countryService.searchByRegion(params.query))

        }
      })


}
