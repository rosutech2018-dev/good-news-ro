import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { ArticleCardComponent } from '../../shared/article-card/article-card.component';
import { Article, Category } from '../../core/models/article.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ArticleCardComponent],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="container hero__inner">
        <div class="hero__text">
          <div class="hero__eyebrow">România care se construiește</div>
          <h1>Știri care aduc <span class="hero__highlight">speranță</span> și <span class="hero__highlight">progres</span></h1>
          <p>Documentăm soluțiile care funcționează, oamenii care fac diferența și progresul real din educație, sănătate, infrastructură și mai mult.</p>
          <div class="hero__actions">
            <a routerLink="/harta-binelui" class="btn btn--primary">Harta Binelui →</a>
            <a routerLink="/modele-bune" class="btn btn--outline">Modele Bune</a>
          </div>
          <div class="hero__stats">
            <div><strong>7</strong><span>domenii</span></div>
            <div><strong>41</strong><span>județe</span></div>
            <div><strong>100%</strong><span>verificat</span></div>
          </div>
        </div>
        <div class="hero__featured" *ngIf="featured()[0]">
          <div class="card hero__card">
            <img [src]="featured()[0].image" [alt]="featured()[0].imageAlt">
            <div class="hero__card-body">
              <span class="badge badge--{{featured()[0].category}}">{{featured()[0].categoryLabel}}</span>
              <h2><a [routerLink]="['/articol', featured()[0].slug]">{{featured()[0].title}}</a></h2>
              <p>{{featured()[0].summary}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="section categories-section">
      <div class="container">
        <div class="categories-grid">
          @for (cat of categories(); track cat.slug) {
            <a [routerLink]="['/categorie', cat.slug]" class="category-chip">
              <span class="category-chip__icon">{{cat.icon}}</span>
              <span>{{cat.label}}</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- LATEST NEWS -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Cele mai recente știri bune</h2>
        <p class="section-subtitle">Progres documentat, surse verificate, oameni reali.</p>
        <div class="grid-3">
          @for (article of latest(); track article.id) {
            <app-article-card [article]="article" />
          }
        </div>
        <div class="section-cta">
          <a routerLink="/categorie/educatie" class="btn btn--outline">Vezi toate știrile →</a>
        </div>
      </div>
    </section>

    <!-- GOOD MODELS BANNER -->
    <section class="models-banner">
      <div class="container models-banner__inner">
        <div>
          <h2>Modele care funcționează</h2>
          <p>Soluții replicabile din toată România — documentate pas cu pas, pentru orice comunitate care vrea să facă la fel.</p>
          <a routerLink="/modele-bune" class="btn btn--accent">Descoperă modelele →</a>
        </div>
        <div class="models-banner__icons">
          <div>🏫 Educație</div>
          <div>🏥 Sănătate</div>
          <div>🌱 Mediu</div>
          <div>⚡ Energie</div>
        </div>
      </div>
    </section>

    <!-- HARTA BINELUI TEASER -->
    <section class="section">
      <div class="container">
        <div class="map-teaser">
          <div class="map-teaser__text">
            <h2 class="section-title">Harta Binelui</h2>
            <p>Fiecare județ din România are povești de succes. Găsește-le pe ale tale și inspiră-te din ce funcționează în comunități ca a ta.</p>
            <a routerLink="/harta-binelui" class="btn btn--primary">Explorează harta →</a>
          </div>
          <div class="map-teaser__visual">
            <div class="map-placeholder">
              <span>🗺️</span>
              <p>41 de județe<br>sute de povești</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER -->
    <section class="newsletter-section">
      <div class="container newsletter-inner">
        <div>
          <h2>Primești știri bune săptămânal</h2>
          <p>Alătură-te celor care aleg să fie informați cu ceea ce funcționează în România.</p>
        </div>
        <form class="newsletter-form" (submit)="$event.preventDefault()">
          <input type="email" placeholder="adresa ta@email.ro" aria-label="Email">
          <button type="submit" class="btn btn--accent">Abonează-mă</button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .hero { background: linear-gradient(135deg, #f0faf4 0%, #fafaf8 60%); padding: 80px 0;
      @media (max-width: 768px) { padding: 40px 0; }
      &__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
        @media (max-width: 900px) { grid-template-columns: 1fr; gap: 40px; }
      }
      &__eyebrow { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-primary); margin-bottom: 12px; }
      h1 { font-size: 3rem; margin-bottom: 20px; line-height: 1.15;
        @media (max-width: 768px) { font-size: 2rem; }
      }
      &__highlight { color: var(--color-primary); }
      p { font-size: 1.1rem; color: var(--color-text-muted); margin-bottom: 32px; line-height: 1.7; }
      &__actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
      &__stats { display: flex; gap: 32px;
        div { display: flex; flex-direction: column; }
        strong { font-size: 1.8rem; font-family: var(--font-display); color: var(--color-primary); line-height: 1; }
        span { font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
      }
      &__card { overflow: hidden;
        img { width: 100%; aspect-ratio: 16/10; object-fit: cover; }
        &-body { padding: 24px; display: flex; flex-direction: column; gap: 10px;
          h2 { font-size: 1.3rem; a { color: var(--color-text); &:hover { color: var(--color-primary); } } }
          p { color: var(--color-text-muted); font-size: 0.95rem; }
        }
      }
    }
    .categories-section { padding: 32px 0; background: white; border-bottom: 1px solid var(--color-border); }
    .categories-grid { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
    .category-chip { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 50px; background: var(--color-bg); border: 1px solid var(--color-border); color: var(--color-text); font-size: 0.9rem; font-weight: 500; transition: all 0.2s;
      &:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); }
      &__icon { font-size: 1.1rem; }
    }
    .section-cta { text-align: center; margin-top: 40px; }
    .models-banner { background: linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%); padding: 64px 0; color: white;
      &__inner { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;
        @media (max-width: 768px) { grid-template-columns: 1fr; }
      }
      h2 { font-size: 2rem; margin-bottom: 16px; }
      p { opacity: 0.85; margin-bottom: 28px; font-size: 1.05rem; line-height: 1.7; }
      &__icons { display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
        div { background: rgba(255,255,255,0.1); border-radius: var(--radius); padding: 16px; font-size: 1rem; font-weight: 500; text-align: center; }
      }
    }
    .map-teaser { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center;
      @media (max-width: 768px) { grid-template-columns: 1fr; }
      &__text p { color: var(--color-text-muted); margin-bottom: 24px; font-size: 1.05rem; line-height: 1.7; }
      &__visual { display: flex; justify-content: center; }
    }
    .map-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; width: 280px; height: 280px; border-radius: 50%; background: linear-gradient(135deg, #e8f5ee, #d1fae5); border: 4px solid var(--color-primary-light);
      span { font-size: 4rem; }
      p { text-align: center; color: var(--color-primary-dark); font-weight: 600; margin-top: 12px; }
    }
    .newsletter-section { background: #1A1A1A; padding: 64px 0; }
    .newsletter-inner { display: flex; justify-content: space-between; align-items: center; gap: 40px; flex-wrap: wrap;
      h2 { font-size: 1.8rem; color: white; margin-bottom: 8px; }
      p { color: #999; }
    }
    .newsletter-form { display: flex; gap: 12px; flex-wrap: wrap;
      input { padding: 12px 18px; border-radius: var(--radius); border: 1px solid #333; background: #2a2a2a; color: white; font-size: 0.95rem; min-width: 260px; &:focus { outline: none; border-color: var(--color-primary); } &::placeholder { color: #666; } }
    }
  `]
})
export class HomeComponent implements OnInit {
  private content = inject(ContentService);
  featured = signal<Article[]>([]);
  latest = signal<Article[]>([]);
  categories = signal<Category[]>([]);

  ngOnInit() {
    this.content.getFeaturedArticles().subscribe(a => this.featured.set(a));
    this.content.getArticles().subscribe(a => this.latest.set(a.slice(0, 6)));
    this.content.getCategories().subscribe(c => this.categories.set(c));
  }
}
