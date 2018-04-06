import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { StockAlert } from '../shared/stock-alert.model';

@Component({
    templateUrl: `stock-alert.component.html`
})

export class StockAlertComponent implements OnInit {
    static URL = 'stock-alert';

    constructor(){  
    }

    ngOnInit(): void {
        //this.synchronize();
    }

    synchronize() {

    }

    edit(StockAlert: StockAlert) {

    }

    delete(StockAlert: StockAlert) {

    }
    read(StockAlert: StockAlert) {

    }
    create() {

    }
}
