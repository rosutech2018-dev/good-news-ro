import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Article } from '../../core/models/article.model';

@Component({
  selector: 'app-article-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <article class="article-card card">
      <a [routerLink]="['/articol', article.slug]" class="article-card__image-link">
        <img [src]="article.image" [alt]="article.imageAlt" loading="lazy">
        <span class="badge badge--{{article.category}}">{{article.categoryLabel}}</span>
      </a>
      <div class="article-card__body">
        <div class="article-card__meta">
          <span class="tag">{{article.county}}</span>
          <span class="article-card__time">{{article.readingTime}} min citire</span>
        </div>
        <h3><a [routerLink]="['/articol', article.slug]">{{article.title}}</a></h3>
        <p>{{article.summary}}</p>
        <div class="article-card__footer">
          <span class="article-card__author">{{article.author}}</span>
          <span class="article-card__date">{{article.date | date:'d MMM yyyy'}}</span>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .article-card {
      display: flex; flex-direction: column;
      &__image-link { position: relative; display: block; overflow: hidden; aspect-ratio: 16/9;
        img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
        &:hover img { transform: scale(1.03); }
        .badge { position: absolute; top: 12px; left: 12px; }
      }
      &__body { padding: 20px; display: flex; flex-direction: column; flex: 1; gap: 10px; }
      &__meta { display: flex; align-items: center; gap: 8px; }
      &__time { font-size: 0.75rem; color: var(--color-text-muted); margin-left: auto; }
      h3 { font-size: 1.1rem; line-height: 1.35;
        a { color: var(--color-text); &:hover { color: var(--color-primary); } }
      }
      p { font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      &__footer { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--color-border); margin-top: auto; }
      &__author { font-size: 0.8rem; font-weight: 600; color: var(--color-text); }
      &__date { font-size: 0.8rem; color: var(--color-text-muted); }
    }
  `]
})
export class ArticleCardComponent {
  @Input() article!: Article;
}
