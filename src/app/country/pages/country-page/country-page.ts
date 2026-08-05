import {  Component, inject, resource } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';
import { NotFound } from '../../../shared/components/not-found/not-found';
import { CountryInformation } from './country-information/country-information';

@Component({
  selector: 'app-country-page',
  imports: [NotFound, CountryInformation],
  templateUrl: './country-page.html',
})
export class CountryPage {
    constructor(){
      console.log(this.countryCode)

    }
  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios de Angular inyectados ()
    countryCode = inject(ActivatedRoute).snapshot.paramMap.get("code")

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios propios inyectados
    countryService = inject(CountryService)

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Async reactivity with resources

    countryResource = resource({

      // The params value recomputes whenever any read signals change.

        params: () => ({code: this.countryCode }),

        loader: async({params})=>{

          if(!params.code ) throw new Error('No se recibió código')

          return await firstValueFrom(this.countryService.searchCountryByAlphaCode(params.code))

        }


    } )



}
