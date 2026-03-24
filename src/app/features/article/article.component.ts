import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { Article } from '../../core/models/article.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  template: `
    @if (article()) {
      <div class="article-page">
        <div class="article-hero">
          <img [src]="article()!.image" [alt]="article()!.imageAlt">
        </div>
        <div class="container">
          <div class="article-layout">
            <article class="article-body">
              <div class="article-meta">
                <span class="badge badge--{{article()!.category}}">{{article()!.categoryLabel}}</span>
                <span class="tag">{{article()!.county}}</span>
                <span class="article-label label--{{article()!.label}}">✓ {{labelText(article()!.label)}}</span>
              </div>
              <h1>{{article()!.title}}</h1>
              <div class="article-byline">
                <span>De <strong>{{article()!.author}}</strong></span>
                <span>{{article()!.date | date:'d MMMM yyyy'}}</span>
                <span>{{article()!.readingTime}} min citire</span>
              </div>
              <p class="article-summary">{{article()!.summary}}</p>
              <div class="article-content" [innerHTML]="article()!.content"></div>
              @if (article()!.impact) {
                <div class="article-impact">
                  <h3>💡 Impactul real</h3>
                  <p>{{article()!.impact}}</p>
                </div>
              }
              @if (article()!.source) {
                <div class="article-source">
                  <strong>Sursa:</strong> {{article()!.source}}
                </div>
              }
              <div class="article-tags">
                @for (tag of article()!.tags; track tag) {
                  <span class="tag">{{tag}}</span>
                }
              </div>
            </article>
            <aside class="article-sidebar">
              <div class="sidebar-box">
                <h4>Distribuie</h4>
                <div class="share-buttons">
                  <button class="share-btn share-btn--fb">Facebook</button>
                  <button class="share-btn share-btn--wa">WhatsApp</button>
                  <button class="share-btn share-btn--tg">Telegram</button>
                </div>
              </div>
              @if (article()!.isGoodModel) {
                <div class="sidebar-box sidebar-box--model">
                  <h4>🏆 Model replicabil</h4>
                  <p>Această soluție poate fi aplicată și în comunitatea ta.</p>
                  <a routerLink="/modele-bune" class="btn btn--primary" style="width:100%;justify-content:center">Vezi ghidul →</a>
                </div>
              }
              <div class="sidebar-box">
                <h4>Înapoi la</h4>
                <a [routerLink]="['/categorie', article()!.category]" class="btn btn--outline" style="width:100%;justify-content:center">{{article()!.categoryLabel}}</a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .article-hero { max-height: 480px; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; } }
    .article-layout { display: grid; grid-template-columns: 1fr 300px; gap: 48px; padding: 48px 0;
      @media (max-width: 900px) { grid-template-columns: 1fr; }
    }
    .article-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
    .article-label { font-size: 0.75rem; font-weight: 600; color: var(--color-primary); background: rgba(46,125,82,0.08); padding: 3px 10px; border-radius: 20px; }
    h1 { font-size: 2.4rem; line-height: 1.2; margin-bottom: 16px; @media (max-width: 768px) { font-size: 1.8rem; } }
    .article-byline { display: flex; gap: 16px; font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 24px; flex-wrap: wrap; strong { color: var(--color-text); } }
    .article-summary { font-size: 1.15rem; line-height: 1.7; color: var(--color-text-muted); padding: 20px; background: rgba(46,125,82,0.05); border-left: 3px solid var(--color-primary); border-radius: 0 var(--radius) var(--radius) 0; margin-bottom: 32px; }
    .article-content { font-size: 1rem; line-height: 1.8; color: #333;
      p { margin-bottom: 20px; }
      h2, h3 { font-family: var(--font-display); margin: 32px 0 16px; }
      strong { color: var(--color-text); }
    }
    .article-impact { background: linear-gradient(135deg, #f0faf4, #e8f5ee); border-radius: var(--radius-lg); padding: 24px; margin: 32px 0; h3 { margin-bottom: 8px; } p { color: var(--color-text-muted); } }
    .article-source { font-size: 0.85rem; color: var(--color-text-muted); padding: 12px; border-top: 1px solid var(--color-border); margin-top: 24px; }
    .article-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 24px; }
    .article-sidebar { display: flex; flex-direction: column; gap: 20px; }
    .sidebar-box { background: white; border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm);
      h4 { font-family: var(--font-display); margin-bottom: 16px; font-size: 1rem; }
      &--model { background: linear-gradient(135deg, #f0faf4, #e8f5ee); p { font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 16px; } }
    }
    .share-buttons { display: flex; flex-direction: column; gap: 8px; }
    .share-btn { padding: 8px; border-radius: var(--radius); border: none; cursor: pointer; font-size: 0.85rem; font-weight: 500; transition: opacity 0.2s;
      &--fb { background: #1877F2; color: white; }
      &--wa { background: #25D366; color: white; }
      &--tg { background: #26A5E4; color: white; }
      &:hover { opacity: 0.85; }
    }
  `]
})
export class ArticleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private content = inject(ContentService);
  article = signal<Article | undefined>(undefined);

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.content.getArticleBySlug(params.get('slug') || ''))
    ).subscribe(a => this.article.set(a));
  }

  labelText(label: string): string {
    const map: Record<string, string> = {
      'verificat': 'Verificat editorial',
      'date-oficiale': 'Date oficiale',
      'contributie-comunitara': 'Contribuție comunitară',
      'model-replicabil': 'Model replicabil'
    };
    return map[label] || label;
  }
}
