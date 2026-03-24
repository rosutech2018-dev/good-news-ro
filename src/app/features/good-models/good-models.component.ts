import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { GoodModel } from '../../core/models/article.model';

@Component({
  selector: 'app-good-models',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div>
      <div class="models-hero">
        <div class="container">
          <div class="models-hero__eyebrow">Soluții dovedite</div>
          <h1>🏆 Modele Bune</h1>
          <p>Soluții care au funcționat în România, documentate pas cu pas pentru a fi replicate în orice comunitate. Fiecare model include resursele necesare și contactul direct.</p>
        </div>
      </div>

      <div class="container section">
        <div class="models-grid">
          @for (model of models(); track model.id) {
            <div class="model-card card">
              <div class="model-card__header">
                <div class="model-card__badges">
                  <span class="badge badge--{{model.category}}">{{model.categoryLabel}}</span>
                  <span class="scale-badge scale--{{model.scale}}">{{scaleLabel(model.scale)}}</span>
                </div>
                <span class="replicated" *ngIf="model.replicatedIn > 0">🔁 Replicat în {{model.replicatedIn}} {{model.replicatedIn === 1 ? 'locație' : 'locații'}}</span>
              </div>

              <h3>{{model.title}}</h3>
              <p class="model-card__summary">{{model.summary}}</p>

              <div class="model-card__impact">
                <strong>📊 Impact:</strong> {{model.impact}}
              </div>

              <div class="model-card__steps">
                <strong>Cum a funcționat:</strong>
                <ol>
                  @for (step of model.howItWorked; track $index) {
                    <li>{{step}}</li>
                  }
                </ol>
              </div>

              <div class="model-card__resources">
                <strong>Resurse necesare:</strong> {{model.resources}}
              </div>

              <div class="model-card__footer">
                <span class="tag">{{model.county}}</span>
                <a [routerLink]="['/articol', model.articleSlug]" class="btn btn--outline btn--sm">Citește povestea →</a>
              </div>
            </div>
          }
        </div>
      </div>

      <div class="models-contribute">
        <div class="container models-contribute__inner">
          <div>
            <h2>Ai un model de succes din comunitatea ta?</h2>
            <p>Documentează-l și ajută alte comunități să facă la fel.</p>
          </div>
          <a routerLink="/trimite-stire" class="btn btn--primary">Trimite modelul tău →</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .models-hero {
      background: linear-gradient(135deg, #1B5E38, #065F46);
      color: white; padding: 64px 0;
      &__eyebrow { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.7; margin-bottom: 8px; }
      h1 { font-size: 2.5rem; margin-bottom: 12px; }
      p { font-size: 1.05rem; opacity: 0.85; max-width: 680px; line-height: 1.7; }
    }
    .models-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 28px;
      @media (max-width: 768px) { grid-template-columns: 1fr; }
    }
    .model-card {
      padding: 28px; display: flex; flex-direction: column; gap: 14px;
      &__header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; }
      &__badges { display: flex; gap: 8px; flex-wrap: wrap; }
      h3 { font-size: 1.2rem; line-height: 1.3; }
      &__summary { color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; }
      &__impact { background: rgba(46,125,82,0.07); padding: 12px 14px; border-radius: var(--radius); font-size: 0.9rem; border-left: 3px solid var(--color-primary); }
      &__steps { font-size: 0.88rem;
        strong { display: block; margin-bottom: 8px; }
        ol { padding-left: 18px; display: flex; flex-direction: column; gap: 5px; color: var(--color-text-muted); li { line-height: 1.5; } }
      }
      &__resources { font-size: 0.85rem; color: var(--color-text-muted); padding: 10px 14px; background: var(--color-bg); border-radius: var(--radius); }
      &__footer { display: flex; justify-content: space-between; align-items: center; padding-top: 14px; border-top: 1px solid var(--color-border); margin-top: auto; }
    }
    .replicated { font-size: 0.78rem; color: var(--color-primary); font-weight: 600; }
    .scale-badge {
      font-size: 0.72rem; font-weight: 600; padding: 3px 8px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.04em;
      &.scale--localitate { background: #FEF9C3; color: #713F12; }
      &.scale--oras { background: #DBEAFE; color: #1D4ED8; }
      &.scale--judet { background: #EDE9FE; color: #5B21B6; }
      &.scale--national { background: #D1FAE5; color: #065F46; }
    }
    .models-contribute { background: linear-gradient(135deg, #f0faf4, #fafaf8); border-top: 1px solid var(--color-border); padding: 56px 0;
      &__inner { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
      h2 { font-size: 1.5rem; margin-bottom: 6px; }
      p { color: var(--color-text-muted); }
    }
  `]
})
export class GoodModelsComponent implements OnInit {
  private content = inject(ContentService);
  models = signal<GoodModel[]>([]);

  ngOnInit() { this.content.getGoodModels().subscribe(m => this.models.set(m)); }

  scaleLabel(scale: string): string {
    const map: Record<string, string> = { localitate: 'Localitate', oras: 'Oraș', judet: 'Județ', national: 'Național' };
    return map[scale] || scale;
  }
}
