import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { County } from '../../core/models/article.model';

@Component({
  selector: 'app-harta-binelui',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="harta-page">
      <div class="harta-hero">
        <div class="container">
          <h1>🗺️ Harta Binelui</h1>
          <p>Fiecare județ din România are povești de progres. Explorează ce funcționează în comunități ca a ta și găsește inspirația de care ai nevoie.</p>
        </div>
      </div>

      <div class="container section">
        <div class="harta-filters">
          <button class="filter-btn" [class.active]="activeRegion() === ''" (click)="setRegion('')">Toate regiunile</button>
          @for (region of regions; track region) {
            <button class="filter-btn" [class.active]="activeRegion() === region" (click)="setRegion(region)">{{region}}</button>
          }
        </div>

        <div class="harta-summary" *ngIf="filteredCounties().length > 0">
          <span>{{filteredCounties().length}} județe</span>
          <span>·</span>
          <span>{{totalStories()}} povești de progres</span>
        </div>

        <div class="counties-grid">
          @for (county of filteredCounties(); track county.id) {
            <div class="county-card card">
              <div class="county-card__header">
                <h3>{{county.name}}</h3>
                <span class="county-badge">{{county.stories}} {{county.stories === 1 ? 'știre' : 'știri'}}</span>
              </div>
              <p class="county-region">{{county.region}}</p>
              <p class="county-story">{{county.latestStory}}</p>
              <a [routerLink]="['/articol', county.articleSlug]" class="county-card__link">Citește povestea →</a>
            </div>
          }
        </div>
      </div>

      <div class="harta-cta">
        <div class="container harta-cta__inner">
          <div>
            <h2>Știi o poveste din județul tău?</h2>
            <p>Ajută-ne să completăm harta României cu mai mult bine.</p>
          </div>
          <a routerLink="/trimite-stire" class="btn btn--accent">Trimite o știre →</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .harta-hero {
      background: linear-gradient(135deg, #1B5E38 0%, #2E7D52 100%);
      color: white; padding: 64px 0;
      h1 { font-size: 2.5rem; margin-bottom: 12px; }
      p { font-size: 1.1rem; opacity: 0.85; max-width: 580px; line-height: 1.7; }
    }
    .harta-filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px; }
    .filter-btn {
      padding: 7px 18px; border-radius: 50px; border: 1px solid var(--color-border);
      background: white; cursor: pointer; font-size: 0.85rem; font-family: var(--font-body);
      transition: all 0.2s;
      &.active, &:hover { background: var(--color-primary); color: white; border-color: var(--color-primary); }
    }
    .harta-summary { font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 28px; display: flex; gap: 8px; }
    .counties-grid {
      display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
      @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
      @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
      @media (max-width: 480px) { grid-template-columns: 1fr; }
    }
    .county-card {
      padding: 20px; display: flex; flex-direction: column; gap: 8px;
      &__header { display: flex; justify-content: space-between; align-items: center; }
      h3 { font-size: 1rem; font-family: var(--font-display); }
      &__link { font-size: 0.85rem; font-weight: 600; color: var(--color-primary); margin-top: auto; padding-top: 8px; }
    }
    .county-region { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-primary); font-weight: 600; }
    .county-story { font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .county-badge { background: rgba(46,125,82,0.1); color: var(--color-primary); font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 12px; white-space: nowrap; }
    .harta-cta { background: var(--color-bg); border-top: 1px solid var(--color-border); padding: 48px 0;
      &__inner { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap; }
      h2 { font-size: 1.5rem; margin-bottom: 6px; }
      p { color: var(--color-text-muted); }
    }
  `]
})
export class HartaBineluiComponent implements OnInit {
  private content = inject(ContentService);
  counties = signal<County[]>([]);
  activeRegion = signal('');
  regions = ['Transilvania', 'Moldova', 'Muntenia', 'Oltenia', 'Dobrogea', 'Banat', 'Crișana', 'Maramureș'];
  filteredCounties = signal<County[]>([]);
  totalStories = computed(() => this.filteredCounties().reduce((sum, c) => sum + c.stories, 0));

  ngOnInit() {
    this.content.getCounties().subscribe(c => {
      this.counties.set(c);
      this.filteredCounties.set(c);
    });
  }

  setRegion(region: string) {
    this.activeRegion.set(region);
    this.filteredCounties.set(region ? this.counties().filter(c => c.region === region) : this.counties());
  }
}
