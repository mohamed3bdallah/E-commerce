import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform( products:any[] , term:string ): unknown {
    return products.filter((item)=> item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()));
  }

}
