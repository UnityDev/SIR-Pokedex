import { Pipe, PipeTransform } from '@angular/core';

import { Pokemon } from './pokemon';

@Pipe({
    name: 'FilterPipe',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: Pokemon[], filter: Pokemon): Pokemon[] {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter((item: Pokemon) => this.applyFilter(item, filter));
    }

    /**
     * Perform the filtering.
     *
     * @param {Book} book The book to compare to the filter.
     * @param {Book} filter The filter to apply.
     * @return {boolean} True if book satisfies filters, false if not.
     */
    applyFilter(book: Pokemon, filter: Pokemon): boolean {
        if (filter.name && book.name.toLowerCase().indexOf(filter.name.toLowerCase()) === -1) {
            return false;
        }
        return true;
    }
}