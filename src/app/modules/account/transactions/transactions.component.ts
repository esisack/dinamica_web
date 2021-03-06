import { Component, OnInit } from '@angular/core';
import { TransactionService } from "src/app/services/transaction.service";
import { Transaction } from 'src/app/model/Transaction';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[];
  dataSource = new MatTableDataSource<Transaction>(this.transactions);
  displayedColumns: string[] = ['transactionId', 'transactionDate', 'transactionType', 'customer', 'amount'];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getSales();
  }

  public getSales() {
    let resp = this.transactionService.findAll();
    resp.subscribe(report => this.dataSource.data = report as Transaction[]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

