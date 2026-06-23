import {Component, output } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html'
})
export class SearchInput {
  //Event output

  inputValue = output<string>();

  //Método de búsqueda

  onSearch(value:string){

    console.log(value)

    //emitir el event output

    this.inputValue.emit(value)

  }

}
