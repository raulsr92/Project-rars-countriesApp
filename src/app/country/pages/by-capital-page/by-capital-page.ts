import { Component, inject } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios inyectados

    countryService = inject(CountryService)


  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Métodos

    logValue(query:string){

      console.log('Se recibió el valor: '+query+" en el padre")

      this.countryService.searchByCapital(query)
      .subscribe((resp)=>{
        console.log(resp)
      })

    }


}
