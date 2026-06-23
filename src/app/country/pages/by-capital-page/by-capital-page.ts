import { Component } from '@angular/core';
import { SearchInput } from "../../components/search-input/search-input";

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInput],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {

  logValue(value:string){

    console.log('Se recibió el valor: '+value+" en el padre")

  }


}
