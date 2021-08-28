import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class InvoiceService {
  getInvoice() {
    return of({
      paymentNo: '741037024',
      clientName: 'Chris Wood',
      clientEmail: 'chris.wood@gmail.com',
      clientAddress: ['4183 Forest Avenue', 'New York City', '10011', 'USA'],
      amount: 268,
      currency: 'USD',
      merchantName: 'Valor Software LLC',
      merchantEmail: 'sales@valor-software.com',
      merchantAddress: ['Kharkiv', 'Ukraine'],
      date: new Date(2018, 9, 2, 15, 45),
      lines: [
        { desc: 'ValorLaunchpad', qty: 2, amount: 150 },
        { desc: 'Monthly Subscription', qty: 3, amount: 25 },
        { desc: 'Additional Service', qty: 1, amount: 100 },
      ],
      subtotal: 375,
      shipping: 8,
      discount: 0.05,
      total: 268.85,
    })
  }
}
