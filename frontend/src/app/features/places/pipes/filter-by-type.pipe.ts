import { Pipe, PipeTransform } from '@angular/core';
import { IPlace } from "../models/IPlace";

@Pipe({
  name: 'filterByType'
})
export class FilterByTypePipe implements PipeTransform {

  transform(value: IPlace[], type: string): IPlace[] {
    if (type.includes("Filter by type...")) {
      return value;
    }
    return value.filter((place)=> place.type == type)
  }
}
