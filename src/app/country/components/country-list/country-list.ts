import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.html',
})
export class CountryList {

  //●●●●●●●●●●●●●●●●●●●●●●●●●●●●● Input signals properties

    countriesInput = input.required<Country[]>();



}
