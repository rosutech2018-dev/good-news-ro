import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="header" [class.scrolled]="scrolled()">
      <div class="container header__inner">
        <a routerLink="/" class="header__logo">
          <span class="header__logo-icon">🌱</span>
          <div>
            <span class="header__logo-name">good-news.ro</span>
            <span class="header__logo-tagline">știri care construiesc</span>
          </div>
        </a>

        <nav class="header__nav" [class.open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMenu()">Acasă</a>
          <a routerLink="/categorie/educatie" routerLinkActive="active" (click)="closeMenu()">Educație</a>
          <a routerLink="/categorie/sanatate" routerLinkActive="active" (click)="closeMenu()">Sănătate</a>
          <a routerLink="/categorie/infrastructura" routerLinkActive="active" (click)="closeMenu()">Infrastructură</a>
          <a routerLink="/harta-binelui" routerLinkActive="active" (click)="closeMenu()">Harta Binelui</a>
          <a routerLink="/modele-bune" routerLinkActive="active" (click)="closeMenu()">Modele Bune</a>
          <a routerLink="/trimite-stire" class="btn btn--primary btn--sm" (click)="closeMenu()">Trimite o știre</a>
        </nav>

        <button class="header__burger" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      position: sticky; top: 0; z-index: 100;
      background: rgba(250,250,248,0.95); backdrop-filter: blur(8px);
      border-bottom: 1px solid transparent;
      transition: border-color 0.2s, box-shadow 0.2s;
      &.scrolled { border-color: var(--color-border); box-shadow: var(--shadow-sm); }
      &__inner { display: flex; align-items: center; justify-content: space-between; height: 70px; gap: 24px; }
      &__logo { display: flex; align-items: center; gap: 10px; font-family: var(--font-display); text-decoration: none;
        &-icon { font-size: 1.6rem; }
        &-name { display: block; font-size: 1.2rem; font-weight: 700; color: var(--color-primary); line-height: 1.1; }
        &-tagline { display: block; font-size: 0.7rem; color: var(--color-text-muted); font-family: var(--font-body); text-transform: uppercase; letter-spacing: 0.08em; }
      }
      &__nav { display: flex; align-items: center; gap: 8px;
        a { color: var(--color-text-muted); font-size: 0.9rem; font-weight: 500; padding: 6px 10px; border-radius: var(--radius); transition: all 0.2s;
          &:hover, &.active { color: var(--color-primary); background: rgba(46,125,82,0.06); }
        }
        .btn--sm { padding: 7px 16px; font-size: 0.85rem; margin-left: 8px; }
        .btn--primary { background: var(--color-primary); color: #fff;
          &:hover { background: var(--color-primary-dark); color: #fff; }
        }
      }
      &__burger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; padding: 4px;
        span { display: block; width: 24px; height: 2px; background: var(--color-text); border-radius: 2px; transition: all 0.2s; }
      }
    }
    @media (max-width: 900px) {
      .header__nav { display: none; position: absolute; top: 70px; left: 0; right: 0; background: white; flex-direction: column; align-items: stretch; padding: 16px; box-shadow: var(--shadow-md); border-top: 1px solid var(--color-border);
        a { padding: 12px 16px; border-radius: var(--radius); }
        &.open { display: flex; }
      }
      .header__burger { display: flex; }
    }
  `]
})
export class HeaderComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 10); }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }
}
