import { Component, inject, Query, resource, signal } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";
import { CountryList } from '../../components/country-list/country-list';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, isEmpty } from 'rxjs';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Servicios inyectados
    countryService = inject(CountryService)
  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Signals: etapas en petición
    //isLoading = signal(false)
    //isError = signal<string|null>(null)
    //countries = signal<Country[]>([])
  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Métodos
    /*
    logValue(query:string){
      console.log('Se recibió el valor: '+query+" en el padre")
      console.log(query)

      //●●●●●●●●●●●●●●●●●●●●●●●●●●●●● Indicar que se está cargando la petición
        if (this.isLoading()) return
        this.isLoading.set(true)

      //●●●●●●●●●●●●●●●●●●●●●●●●●●●●● Indicar que se está cargando la petición
        this.isError.set(null)

      //●●●●●●●●●●●●●●●●●●●●●●●●●●●●● Acceder al servicio y su método de búsqueda por capital

        this.countryService.searchByCapital(query)
        .subscribe({
          next: (countries)=>{
            //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Indicar que la carga de la petición finalizó
              this.isLoading.set(false)
            //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Guardar el array de países resultante de la búsqueda
              this.countries.set(countries)
              console.log(this.countries())

            //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Detectar array vacío (por la API que devuelve 200 en estos casos)
              if (this.countries().length === 0 ) {
                  this.isError.set(`No se encontró un país con la búsqueda:  ${query}`)
                  console.log(this.isError())
              }
            },
            error: (err)=>{
              console.log(err)
              //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Indicar que la carga de la petición finalizó
                 this.isLoading.set(false)
              //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Guardar un array vació
                  this.countries.set([])
              //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Establecer el error

                //~~~~~~~ Error por campo vacío
                  if (query.trim()==="") {
                    this.isError.set(`No ha introducido ningún término de búsqueda`)
                    console.log(this.isError())
                  } else{
                    this.isError.set(`Error en la petición: ${err.message}`)
                  }

            }
        })

    }

  */
  //✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦✦ Async reactivity with resources

  query = signal<string>("");

  countryResource = resource({

    params: ()=>({ query: this.query() }),

    loader: async({params })=>{

      //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 1: query vacío
        if (params.query ===  '') return [];

      //☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆☆ Camino 2: query con data
        return await firstValueFrom(
          this.countryService.searchByCapital(params.query)
        )
    }
  })

}
