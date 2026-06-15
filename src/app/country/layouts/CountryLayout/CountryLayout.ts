import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TopMenu } from "../../components/top-menu/top-menu";

@Component({
  selector: 'app-country-layout',
  imports: [RouterOutlet, TopMenu, RouterLink],
  templateUrl: './CountryLayout.html',
})
export class CountryLayout {}
