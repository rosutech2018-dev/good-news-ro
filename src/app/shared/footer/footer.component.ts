import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">🌱 good-news.ro</div>
            <p>Documentăm România care se construiește. Știri verificate, progres real, oameni care fac diferența.</p>
            <div class="footer__social">
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Instagram">ig</a>
              <a href="#" aria-label="YouTube">yt</a>
            </div>
          </div>
          <div>
            <h4>Domenii</h4>
            <ul>
              <li><a routerLink="/categorie/educatie">Educație</a></li>
              <li><a routerLink="/categorie/sanatate">Sănătate</a></li>
              <li><a routerLink="/categorie/infrastructura">Infrastructură</a></li>
              <li><a routerLink="/categorie/energie">Energie & Mediu</a></li>
              <li><a routerLink="/categorie/economie">Economie</a></li>
              <li><a routerLink="/categorie/societate">Societate</a></li>
            </ul>
          </div>
          <div>
            <h4>Portal</h4>
            <ul>
              <li><a routerLink="/harta-binelui">Harta Binelui</a></li>
              <li><a routerLink="/modele-bune">Modele Bune</a></li>
              <li><a routerLink="/trimite-stire">Trimite o știre</a></li>
              <li><a routerLink="/despre">Despre noi</a></li>
            </ul>
          </div>
          <div class="footer__newsletter">
            <h4>Newsletter</h4>
            <p>Primești săptămânal cele mai bune știri în căsuța ta.</p>
            <form class="footer__form" (submit)="$event.preventDefault()">
              <input type="email" placeholder="adresa ta@email.ro" aria-label="Email newsletter">
              <button type="submit" class="btn btn--primary">Abonează-te</button>
            </form>
          </div>
        </div>
        <div class="footer__bottom">
          <p>© 2026 good-news.ro — Toate drepturile rezervate</p>
          <div>
            <a href="#">Politică de confidențialitate</a>
            <a href="#">Termeni și condiții</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background: #111; color: #ccc; padding: 64px 0 0;
      &__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 2fr; gap: 48px; margin-bottom: 48px;
        @media (max-width: 900px) { grid-template-columns: 1fr 1fr; gap: 32px; }
        @media (max-width: 600px) { grid-template-columns: 1fr; }
      }
      &__logo { font-family: var(--font-display); font-size: 1.3rem; color: white; margin-bottom: 12px; }
      &__brand p { font-size: 0.9rem; line-height: 1.7; color: #999; }
      &__social { display: flex; gap: 12px; margin-top: 16px;
        a { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #222; color: #ccc; font-size: 0.8rem; text-decoration: none; transition: background 0.2s; &:hover { background: var(--color-primary); color: white; } }
      }
      h4 { color: white; font-family: var(--font-display); font-size: 1rem; margin-bottom: 16px; }
      ul { list-style: none; display: flex; flex-direction: column; gap: 8px;
        a { color: #999; font-size: 0.9rem; transition: color 0.2s; &:hover { color: var(--color-primary-light); } }
      }
      &__newsletter p { font-size: 0.9rem; color: #999; margin-bottom: 16px; }
      &__form { display: flex; flex-direction: column; gap: 8px;
        input { padding: 10px 14px; border-radius: var(--radius); border: 1px solid #333; background: #1a1a1a; color: white; font-size: 0.9rem; &::placeholder { color: #666; } &:focus { outline: none; border-color: var(--color-primary); } }
      }
      &__bottom { border-top: 1px solid #222; padding: 24px 0; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; color: #666; flex-wrap: wrap; gap: 12px;
        div { display: flex; gap: 24px; a { color: #666; &:hover { color: #ccc; } } }
      }
    }
  `]
})
export class FooterComponent {}
