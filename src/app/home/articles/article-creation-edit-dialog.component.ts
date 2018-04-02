import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Article } from '../shared/article.model';
import { Provider } from '../shared/provider.model';

import { ArticleService } from '../shared/article.service';
import { ProviderService } from '../shared/provider.service';

@Component({
    templateUrl: 'article-creation-edit-dialog.component.html',
    styles: [`.mat-dialog-content {
        display: flex;
        flex-direction: column;
    }`]
})
export class ArticleCreationEditDialogComponent implements OnInit {

    edit: boolean;
    article: Article;
    providers: Provider[];

    constructor(private dialogRef: MatDialogRef<ArticleCreationEditDialogComponent>,
        private articleService: ArticleService, private providerService: ProviderService) {
    }

    ngOnInit(): void {
        this.providerService.readAll().subscribe(
            (providers: Provider[]) => this.providers = providers
        );
        if (!this.article) {
            this.article = { code: '', description: '', retailPrice: undefined };
        }
    }

    isActionCompleted() {
        return this.article.code && this.article.description && this.article.retailPrice && this.article.provider;
    }

    create(): void {
        this.articleService.create(this.article).subscribe(
            data => this.dialogRef.close()
        );
    }

    save(): void {
        this.articleService.update(this.article).subscribe(
            data => this.dialogRef.close()
        );
    }
}
