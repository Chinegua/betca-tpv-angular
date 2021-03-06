import { Component } from '@angular/core';
import { CashierClosing } from '../../shared/cashier-closing.model';
import { CashierService } from '../../shared/cashier.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CashierMovementDialogComponent } from './cashier-movement-dialog.component';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'cashier-close-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class CashierCloseDialogComponent {
    cashierClosure: CashierClosing = { totalVoucher: undefined, finalCash: undefined, salesCard: undefined };
    withdrawal: number;

    constructor(private dialog: MatDialog, private dialogRef: MatDialogRef<CashierCloseDialogComponent>,
        private router: Router, private cashierService: CashierService) {

        this.cashierService.readTotals().subscribe(
            cashierClosure => this.cashierClosure = cashierClosure
        );
    }

    close() {
        this.cashierService.close(this.cashierClosure).subscribe(
            () => this.dialogRef.close()
        );
    }

    invalid() {
        return (!this.cashierClosure.finalCash && this.cashierClosure.finalCash !== 0)
            || (!this.cashierClosure.salesCard && this.cashierClosure.salesCard !== 0)
            || !this.cashierClosure.comment;
    }

    cashMovement() {
        this.dialog.open(CashierMovementDialogComponent).afterClosed().subscribe(
            () => this.cashierService.readTotals().subscribe(
                cashierClosure => this.cashierClosure.totalCash = cashierClosure.totalCash
            )
        );
    }
}
