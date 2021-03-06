import { Component, ViewChild, OnInit } from '@angular/core';
import { GraficYearAreaComponent } from './grafic-year-area.component';
import { GraficMonthsColumnComponent } from './grafic-months-colum.component';
import { GraficMonthsAreaComponent } from './grafic-months-area.component';
import { TicketService } from '../shared/ticket.service';
import { CashierService } from '../shared/cashier.service';
import { FormatDate } from './format-date';
import { MatSnackBar } from '@angular/material';
declare let google: any;

@Component({
    templateUrl: `statistics.component.html`,
    styleUrls: [`statistics.component.css`]
})
export class StatisticsComponent implements OnInit {
    static URL = 'statistics';
    date = FormatDate.months;
    years = FormatDate.years();
    constructor(private cashierService: CashierService, private ticketService: TicketService, public snackBar: MatSnackBar) {
        google.charts.load('current', { 'packages': ['corechart'] });
    }
    graficYearArea = new GraficYearAreaComponent(this.cashierService, this.snackBar);
    graficMonthColum = new GraficMonthsColumnComponent(this.cashierService, this.snackBar);
    graficMonthArea = new GraficMonthsAreaComponent(this.ticketService, this.snackBar);

    ngOnInit(): void {
        this.graficYearArea.init();
        this.graficMonthColum.init();
        this.graficMonthArea.init();
    }

    graficAreaYear(dateI: number, dateF: number) {
        this.graficYearArea.search(dateI, dateF);
    }

    graficColumMonth(dateI: number, dateF: number) {
        this.graficMonthColum.search(dateI, dateF);
    }
    graficCode(code: string) {
        this.graficMonthArea.search(code);
    }
}
