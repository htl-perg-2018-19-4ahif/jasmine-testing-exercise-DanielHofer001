import { Injectable } from '@angular/core';

export enum VatCategory {
  Food,
  Drinks
}

@Injectable({
  providedIn: 'root'
})
export class VatCategoriesService {

  constructor() { }

  public getVat(category: VatCategory): number {
    // REPLACE the next line with the necessary code
    if (category === VatCategory.Drinks) {
      return 10;
    }
    if (category === VatCategory.Food) {
      return 20;
    }
    return NaN;
  }
}
