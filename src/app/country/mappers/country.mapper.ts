import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interfaces";

export class CountryMapper{

  //✦✦✦✦✦✦✦✦✦✦✦✦Método que convierte un obj RESTCountry (viene de la API) a uno Country (de nuestra interface)

      static mapRESTCountryToCountry (objRESTCountry:RESTCountry):Country{

        return {
            id: objRESTCountry.uuid,
            icon: objRESTCountry.flag.emoji,
            flag: objRESTCountry.flag.url_svg,
            name: objRESTCountry.names.common,
            capital: objRESTCountry.capitals[0].name,
            continent: objRESTCountry.subregion,
            population: objRESTCountry.population,
        }
      }

  //✦✦✦✦✦✦✦✦✦✦✦✦Método que convierte un array de objs RESTCountry (viene de la API) a uno de objs Country (de nuestra interface)

      static mapRESTCountriesToCountryArray(RestCountries: RESTCountry[]):Country[]{

         return  RestCountries.map(this.mapRESTCountryToCountry)

      }
}
