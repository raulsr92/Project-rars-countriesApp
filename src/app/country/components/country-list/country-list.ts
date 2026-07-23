import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-list.html',
})
export class CountryList {

  //●●●●●●●●●●●●●●●●●●●●●●●●●●●●● Input signals properties

    countriesInput = input.required<Country[]>();


    errorMessage = input<string | unknown | null>();
    isLoading = input<boolean>(false);
    isEmpty = input<boolean>(false);


}
