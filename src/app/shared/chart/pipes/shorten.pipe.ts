import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shorten"
})
export class ShortenPipe implements PipeTransform {
  transform(value: any, args: any): any {
    if (args === "currency") {
      if (value.length > 15) {
        return value.substr(0, 15) + " ...";
      }
      return value;
    } else if (args === "name") {
      if (value.length > 15) {
        return value.substr(0, 15) + " ...";
      }
      return value;
    } else if (args === "similarTransactions") {
      if (value.length > 25) {
        return value.substr(0, 25) + " ...";
      }
      return value;
    } else {
      if (value.length > 10) {
        return value.substr(0, 10) + " ...";
      }
      return value;
    }
  }
}
