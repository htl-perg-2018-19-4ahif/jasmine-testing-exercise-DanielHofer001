import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {

  constructor(private vatCategoriesService: VatCategoriesService) {
  }

  public CalculatePriceExclusiveVat(priceInclusiveVat: number, vatPercentage: number): number {
    // REPLACE the next line with the necessary code
    return priceInclusiveVat / (1 + vatPercentage / 100);
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    // REPLACE the next line with the necessary code
    const ret: InvoiceLineComplete[] = [];
    const e: Invoice =  { invoiceLines: ret, totalPriceInclusiveVat: 0, totalPriceExclusiveVat: 0, totalVat: 0 };
    for (const item of invoiceLines) {
      const priceExclVat = this.CalculatePriceExclusiveVat(item.priceInclusiveVat, this.vatCategoriesService.getVat(item.vatCategory));
      e.totalPriceExclusiveVat += priceExclVat;
      e.totalPriceInclusiveVat += item.priceInclusiveVat;
      e.totalVat += item.priceInclusiveVat - priceExclVat;
      ret.push({
        product: item.product, priceInclusiveVat: item.priceInclusiveVat,
        vatCategory: item.vatCategory, priceExclusiveVat: priceExclVat
      });
    }
    return e;
  }
}
