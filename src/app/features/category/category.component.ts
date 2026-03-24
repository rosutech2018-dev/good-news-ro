import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { Article, Category } from '../../core/models/article.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleCardComponent],
  template: `
    <div class="category-page">
      <div class="category-hero" *ngIf="category()">
        <div class="container">
          <div class="category-hero__inner">
            <span class="category-icon">{{category()!.icon}}</span>
            <div>
              <h1>{{category()!.label}}</h1>
              <p>{{category()!.description}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container section">
        <div class="grid-3" *ngIf="articles().length > 0">
          @for (article of articles(); track article.id) {
            <app-article-card [article]="article" />
          }
        </div>
        <div class="empty-state" *ngIf="articles().length === 0">
          <p>Nu am găsit știri în această categorie momentan.</p>
          <a routerLink="/" class="btn btn--primary">Înapoi acasă</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .category-hero { background: linear-gradient(135deg, #f0faf4 0%, #fafaf8 100%); padding: 48px 0; border-bottom: 1px solid var(--color-border);
      &__inner { display: flex; align-items: center; gap: 24px; }
    }
    .category-icon { font-size: 3rem; }
    h1 { font-size: 2.2rem; margin-bottom: 8px; }
    p { color: var(--color-text-muted); font-size: 1.05rem; max-width: 600px; }
    .empty-state { text-align: center; padding: 80px 20px; color: var(--color-text-muted); display: flex; flex-direction: column; align-items: center; gap: 20px; }
  `]
})
export class CategoryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  articles = signal<Article[]>([]);
  category = signal<Category | undefined>(undefined);

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug') || '';
        this.content.getCategories().subscribe(cats => this.category.set(cats.find(c => c.slug === slug)));
        return this.content.getArticlesByCategory(slug);
      })
    ).subscribe(a => this.articles.set(a));
  }
}
