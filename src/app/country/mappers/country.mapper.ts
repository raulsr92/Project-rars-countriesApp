import type { Country } from "../interfaces/country.interface";
import type { RESTCountry } from "../interfaces/rest-countries.interfaces";
import { Capital } from '../interfaces/rest-countries.interfaces';

export class CountryMapper{

  //✦✦✦✦✦✦✦✦✦✦✦✦Método que convierte un obj RESTCountry (viene de la API) a uno Country (de nuestra interface)

      static mapRESTCountryToCountry (objRESTCountry:RESTCountry):Country{

        //Obtener array de capitales

            const capitales:string[] = [];

            if (objRESTCountry.capitals && objRESTCountry.capitals.length > 0) {
              for (let i = 0; i < objRESTCountry.capitals.length; i++) {
                  capitales.push(objRESTCountry.capitals[i]?.name ?? "")
              }
            }

            console.log(capitales)
            console.log(objRESTCountry.names.translations["spa"].common ?? "No tiene nombre en español disponible")
            console.log(objRESTCountry.capitals[0]?.name)

        return {
            code: objRESTCountry.codes.alpha_2,
            icon: objRESTCountry.flag.emoji,
            flag: objRESTCountry.flag.url_png,
            flagDescription: objRESTCountry.flag["description"],
            name: objRESTCountry.names.translations["spa"].common ?? "No tiene nombre en español disponible",
            nameOficial: objRESTCountry.names.translations["spa"]?.official ?? "No tiene nombre oficial en español disponible",
            capital: capitales.length > 0 ? capitales.join(" / ") : "Sin capital",
            continent: objRESTCountry.subregion?.trim() || "No registrado",
            population: objRESTCountry.population?? 0,
            area: objRESTCountry.area.kilometers?? 0,
            currency: objRESTCountry.currencies[0]?.name ?? "Sin moneda",
            currencySymbol: objRESTCountry.currencies[0]?.symbol  ?? ""
        }
      }

  //✦✦✦✦✦✦✦✦✦✦✦✦Método que convierte un array de objs RESTCountry (viene de la API) a uno de objs Country (de nuestra interface)

      static mapRESTCountriesToCountryArray(RestCountries: RESTCountry[]):Country[]{

         return  RestCountries.map(this.mapRESTCountryToCountry)

      }
}
