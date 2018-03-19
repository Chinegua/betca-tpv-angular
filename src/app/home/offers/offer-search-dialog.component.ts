import { Component, OnInit } from '@angular/core';
import { Offer } from '../shared/offer.model';

@Component({
    templateUrl: 'offer-search-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
    
export class OfferSearchDialogComponent implements OnInit{
        
    offer : Offer;

    constructor() {
    }
    
    ngOnInit(): void {
        if (!this.offer) {
            this.offer = { code: undefined, percentage: undefined, expiration: undefined , description : undefined};
        }
    }

    searchOffer() : void {
        this.offer.percentage = 1;
        this.offer.description = "Muy bonito";
    }
}