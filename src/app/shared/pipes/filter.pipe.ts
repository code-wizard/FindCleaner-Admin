import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterColumn?: any, filterSearch?: any): any {
    if (!filterSearch) {
      return value;
    }
    if (filterColumn === "Date" && filterSearch) {
      return value.data.filter(item => {
        return item.service_deliver_on === filterSearch;
      });
    }
  }
}
