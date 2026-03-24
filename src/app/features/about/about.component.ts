import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="about-page">
      <div class="about-hero">
        <div class="container">
          <h1>Despre good-news.ro</h1>
          <p>Suntem o redacție independentă care documentează progresul real din România — cu rigoare, cu dovezi și cu respect față de cititori.</p>
        </div>
      </div>

      <div class="container section">
        <div class="about-grid">
          <div class="about-main">
            <h2>De ce good-news.ro?</h2>
            <p>România are o problemă de narativă. Media tradițională tinde să amplifice criza și să ignore soluțiile. Românii care lucrează în educație, sănătate, infrastructură, cercetare și comunitate fac lucruri remarcabile în fiecare zi — și aproape nimeni nu știe.</p>
            <p>Nu suntem un portal de știri vesele. Suntem o redacție care raportează progresul cu aceeași rigoare cu care altele raportează criza. Fiecare știre publicată este verificată, sursată și contextualizată. Nu publicăm comunicatele de presă ale instituțiilor de stat drept știri. Nu publicăm povești emoționante fără date. Nu publicăm advertising deghizat în jurnalism.</p>

            <h2>Principiile noastre</h2>
            <div class="principles">
              <div class="principle">
                <span>🔍</span>
                <div>
                  <h4>Verificare editorială</h4>
                  <p>Nicio știre nu se publică fără verificarea surselor. Faptele contează, nu sentimentele.</p>
                </div>
              </div>
              <div class="principle">
                <span>💡</span>
                <div>
                  <h4>Mecanismul contează</h4>
                  <p>Nu spunem doar că ceva a funcționat. Explicăm cum — pentru că alții să poată replica.</p>
                </div>
              </div>
              <div class="principle">
                <span>🗺️</span>
                <div>
                  <h4>România toată</h4>
                  <p>Acoperim toate cele 41 de județe. De la Tulcea la Satu Mare, de la Iași la Timișoara.</p>
                </div>
              </div>
              <div class="principle">
                <span>🤝</span>
                <div>
                  <h4>Jurnalism cetățenesc</h4>
                  <p>Comunitățile sunt sursa noastră principală. Oamenii de pe teren știu cel mai bine.</p>
                </div>
              </div>
              <div class="principle">
                <span>📊</span>
                <div>
                  <h4>Date, nu impresii</h4>
                  <p>Progresul real este măsurabil. Citim rapoarte, comparăm cu anii anteriori, verificăm cu experți.</p>
                </div>
              </div>
              <div class="principle">
                <span>🕊️</span>
                <div>
                  <h4>Zero propagandă</h4>
                  <p>Nu suntem afiliați niciunui partid politic sau grup de interese. Nu publicăm nicio formă de conținut sponsorizat nedezvăluit.</p>
                </div>
              </div>
            </div>

            <h2>Contractul nostru cu cititorii</h2>
            <blockquote>
              Nu vom manipula emoțiile voastre. Vom arăta ce funcționează cu dovezi. Vă ajutăm să înțelegeți realitatea mai complet — nu mai confortabil. Respectăm inteligența voastră și nevoia voastră de speranță fondată pe fapte reale.
            </blockquote>

            <h2>Domeniile pe care le acoperim</h2>
            <div class="domains-grid">
              <div class="domain-chip">🎓 Educație</div>
              <div class="domain-chip">🏥 Sănătate</div>
              <div class="domain-chip">🏗️ Infrastructură</div>
              <div class="domain-chip">⚡ Energie & Mediu</div>
              <div class="domain-chip">📈 Economie</div>
              <div class="domain-chip">🔬 Știință & Tech</div>
              <div class="domain-chip">🤝 Societate</div>
            </div>
          </div>

          <aside class="about-sidebar">
            <div class="sidebar-box">
              <h4>Contribuie</h4>
              <p>Știi o poveste de progres din comunitatea ta? Trimite-ne-o și echipa editorială o va analiza.</p>
              <a routerLink="/trimite-stire" class="btn btn--primary" style="width:100%;justify-content:center;margin-top:14px;display:flex">Trimite o știre</a>
            </div>
            <div class="sidebar-box">
              <h4>Contact</h4>
              <p>redactie&#64;good-news.ro</p>
              <p style="margin-top:8px">Răspundem în maxim 48 de ore lucrătoare.</p>
            </div>
            <div class="sidebar-box sidebar-box--highlight">
              <h4>Misiunea noastră</h4>
              <p><em>Reportăm România care se construiește, nu doar România care se strică.</em></p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .about-hero {
      background: linear-gradient(135deg, #f0faf4, #fafaf8);
      padding: 64px 0; border-bottom: 1px solid var(--color-border);
      h1 { font-size: 2.5rem; margin-bottom: 12px; }
      p { color: var(--color-text-muted); font-size: 1.1rem; max-width: 620px; line-height: 1.7; }
    }
    .about-grid { display: grid; grid-template-columns: 1fr 300px; gap: 48px;
      @media (max-width: 900px) { grid-template-columns: 1fr; }
    }
    .about-main {
      h2 { font-size: 1.6rem; margin: 36px 0 16px; color: var(--color-text); }
      h2:first-child { margin-top: 0; }
      p { color: var(--color-text-muted); line-height: 1.8; margin-bottom: 14px; font-size: 1rem; }
      blockquote { border-left: 4px solid var(--color-primary); padding: 18px 22px; background: rgba(46,125,82,0.05); border-radius: 0 var(--radius) var(--radius) 0; font-style: italic; color: var(--color-text-muted); line-height: 1.8; margin: 8px 0 24px; font-size: 1.05rem; }
    }
    .principles { display: flex; flex-direction: column; gap: 20px; margin-bottom: 8px; }
    .principle { display: flex; gap: 16px; align-items: flex-start;
      span { font-size: 1.5rem; flex-shrink: 0; margin-top: 2px; }
      h4 { font-size: 1rem; margin-bottom: 4px; font-family: var(--font-display); }
      p { font-size: 0.9rem; color: var(--color-text-muted); margin: 0; line-height: 1.6; }
    }
    .domains-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 8px; }
    .domain-chip { background: white; border: 1px solid var(--color-border); border-radius: 50px; padding: 8px 18px; font-size: 0.9rem; font-weight: 500; }
    .about-sidebar { display: flex; flex-direction: column; gap: 16px; }
    .sidebar-box {
      background: white; border-radius: var(--radius-lg); padding: 22px; box-shadow: var(--shadow-sm);
      h4 { font-family: var(--font-display); margin-bottom: 10px; font-size: 1rem; }
      p { font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.5; }
      &--highlight { background: linear-gradient(135deg, #f0faf4, #e8f5ee); border: 1px solid rgba(46,125,82,0.2); }
    }
  `]
})
export class AboutComponent {}
