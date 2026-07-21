import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";
import { Capital } from '../interfaces/rest-countries.interfaces';

export class CountryMapper{

  //✦✦✦✦✦✦✦✦✦✦✦✦Método que convierte un obj RESTCountry (viene de la API) a uno Country (de nuestra interface)

      static mapRESTCountryToCountry (objRESTCountry:RESTCountry):Country{

        //Obtener array de capitales

            const capitales = [];
            for (let i = 0; i < objRESTCountry.capitals.length; i++) {
                capitales.push(objRESTCountry.capitals[i].name)
            }
            console.log(capitales)

        return {
            code: objRESTCountry.codes.alpha_2,
            icon: objRESTCountry.flag.emoji,
            flag: objRESTCountry.flag.url_svg,
            name: objRESTCountry.names.translations["spa"].common ?? "No tiene nombre en español disponible",
            capital: capitales.join(" / "),
            continent: objRESTCountry.subregion,
            population: objRESTCountry.population,
        }
      }

  //✦✦✦✦✦✦✦✦✦✦✦✦Método que convierte un array de objs RESTCountry (viene de la API) a uno de objs Country (de nuestra interface)

      static mapRESTCountriesToCountryArray(RestCountries: RESTCountry[]):Country[]{

         return  RestCountries.map(this.mapRESTCountryToCountry)

      }
}
