import { Pipe, PipeTransform } from '@angular/core';
import { IPlace } from "../models/IPlace";

@Pipe({
  name: 'filterByCountry'
})
export class FilterByCountryPipe implements PipeTransform {

  transform(value: IPlace[], countryIso: string): IPlace[] {
    if (countryIso.includes("Filter by country...")) {
      return value;
    }
    return value.filter((place)=> place.address.countryIso == countryIso)
  }
}
