import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Shopping } from '../shared/shopping.model';
import { Ticket } from '../shared/ticket.model';
import { TicketService } from '../shared/ticket.service';
import { VoucherService } from '../shared/voucher.service';
import { InvoiceService } from '../shared/invoice.service';
import { Invoice } from '../shared/invoice.model';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { PaymentDialogComponent } from './payment-dialog.component';

@Component({
  selector: 'app-edit-ticket-dialog',
  templateUrl: './edit-ticket-dialog.component.html',
  styleUrls: ['./edit-ticket-dialog.component.css']
})
export class EditTicketDialogComponent {
  ticket: Ticket;
  invoice: Invoice;
  displayedColumns = ['ind', 'description', 'retailPrice', 'amount', 'discount', 'total', 'committed'];
  dataSource: MatTableDataSource<Shopping>;

  reserva: number;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialog: MatDialog, private dialogRef: MatDialogRef<EditTicketDialogComponent>,
    private ticketService: TicketService, private voucheService: VoucherService, private invoiceService: InvoiceService,
    private userService: UserService) {

    this.dataSource = new MatTableDataSource<Shopping>(data.ticket.shoppingList);
    this.ticket = data.ticket;
    this.invoice = data.invoice;
    this.reserva = this.totalNotCommited() - this.ticket.debt;
  }

  private total(): number {
    let total = 0;
    this.ticket.shoppingList.forEach(element => total += element.total);
    return total;
  }

  private totalNotCommited(): number {
    let notCommitValue = 0;
    this.ticket.shoppingList.forEach(element => {
      if (!element.committed) {
        notCommitValue += element.total;
      }
    });
    return notCommitValue;
  }

  private round(value: number) {
    return Math.round(value * 100) / 100;
  }

  private updateTotal(shopping: Shopping): number {
    return this.round(shopping.retailPrice * shopping.amount * (1 - shopping.discount / 100));
  }

  decreaseAmount(shopping: Shopping) {
    const totalOld = shopping.total;
    shopping.amount -= 1;
    if (shopping.amount === 0) {
      shopping.committed = true;
    }
    shopping.total = this.updateTotal(shopping);
    this.ticket.debt -= totalOld - shopping.total;
  }

  changeCommitted(shopping: Shopping) {
    shopping.committed = !shopping.committed;
  }

  invoiceId() {
    if (this.invoice) {
      return this.invoice.id;
    }
  }

  mobile(): number {
    if (this.ticket.user) {
      return this.ticket.user.mobile;
    } else {
      return null;
    }
  }

  updateUser(user: User) {
    this.ticket.user = user;
  }

  acceptTicket() {
    if (this.ticket.debt < 0) {
      this.voucheService.create({ value: -this.ticket.debt }).subscribe(
        () => {
          this.ticket.debt = 0;
          this.updateTicket();
        }
      );
    } else {
      if ((this.totalNotCommited() - this.ticket.debt) < this.reserva) {
        const advised = this.ticket.debt - (this.totalNotCommited() - this.reserva);
        this.dialog.open(PaymentDialogComponent, {
          data: {
            debt: this.ticket.debt,
            minimum: this.ticket.debt - this.totalNotCommited(),
            advised: advised,
          }
        }).afterClosed().subscribe(
          ticketCreation => {
            if (ticketCreation) {
              this.ticket.debt -= (ticketCreation.cash + ticketCreation.card + ticketCreation.voucher);
              this.ticket.note = ticketCreation.note;
              this.updateTicket();
            }
          }
        );
      } else {
        this.updateTicket();
      }
    }
  }

  updateTicket() {
    this.ticketService.updateTicket(this.ticket).subscribe(
      () => this.dialogRef.close()
    );
  }

}

