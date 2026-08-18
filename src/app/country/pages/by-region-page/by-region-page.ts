import { Component, inject, resource, signal } from '@angular/core';
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { Region } from '../../types/region.types';

@Component({
  selector: 'app-by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {

    //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios inyectados

      countryService = inject(CountryService)


    //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Array de Regiones

      public regions: Region[] = [
          'Africa',
          'Americas',
          'Asia',
          'Europe',
          'Oceania',
          'Antartic',
        ];

    //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Async reactivity with resources

      query = signal<string>("");

      countryResource = resource({

        params: ()=>({query: this.query()}),
        loader: async({params})=>{

            //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 1: query vacío
              if (params.query ===  '') return [];

            //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 2: query con data
              return await firstValueFrom(this.countryService.searchByRegion(params.query))

        }
      })


}
