import { Component, inject, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios inyectados

    countryService = inject(CountryService)

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Signals: etapas en petición

  isLoading = signal(false)

  isError = signal<string|null>(null)

  countries = signal<Country[]>([])

  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Métodos

    logValue(query:string){
      console.log('Se recibió el valor: '+query+" en el padre")

      //●●●●●●●●●●●●●●●●●●●●●●●●●●●●● Indicar que se está cargando la petición
        if (this.isLoading()) return
        this.isLoading.set(true)

      //●●●●●●●●●●●●●●●●●●●●●●●●●●●●● Indicar que se está cargando la petición
        this.isError.set(null)

      //●●●●●●●●●●●●●●●●●●●●●●●●●●●●● Acceder al servicio y su método de búsqueda por capital

        this.countryService.searchByCapital(query)
        .subscribe((countries)=>{

          //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Indicar que la carga de la petición finalizó
            this.isLoading.set(false)

          //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Guardar el array de países resultante de la búsqueda
            this.countries.set(countries)

            console.log(this.countries())
        })

    }


}
