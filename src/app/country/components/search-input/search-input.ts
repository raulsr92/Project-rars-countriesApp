import {Component, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html'
})
export class SearchInput {

  //Signals

    inputValor = signal<string>('')

  //Event output

    inputValue = output<string>();

  //Inputs signals properties

    placeholderInput = input.required<string>()

    debounceTime = input<number>(300)

  //Método de búsqueda

      onSearch(value:string){

        //console.log(value)

        //emitir el event output

        this.inputValue.emit(value)

      }
  //Crear un efecto

      debounceEffect = effect((onCleanup)=>{

        const value = this.inputValor();

        const timeout = setTimeout(()=>{

          this.inputValue.emit(value)

        }, this.debounceTime())

        onCleanup(()=>{

          clearTimeout(timeout)

        })

      })

}
