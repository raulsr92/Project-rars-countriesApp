import {Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html'
})
export class SearchInput {
  //Event output
    inputValue = output<string>();

  //Inputs signals properties

    placeholderInput = input.required<string>()
    debounceTime = input<number>(1000)

    initialValue = input<string>()

  //Signals
    //---De la caja de texto
      inputValor = linkedSignal<string>( ()=>this.initialValue() ?? "" )



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
