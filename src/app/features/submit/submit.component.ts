import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-submit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="submit-page">
      <div class="submit-hero">
        <div class="container">
          <h1>Trimite o știre bună</h1>
          <p>Cunoști o poveste de progres, o soluție care funcționează sau un om care face diferența? Spune-ne. Echipa noastră editorială va analiza și verifica fiecare trimitere.</p>
        </div>
      </div>

      <div class="container section">
        <div class="submit-layout">
          @if (!submitted()) {
            <form class="submit-form" (ngSubmit)="onSubmit()">
              <div class="form-group">
                <label for="title">Titlul știrii *</label>
                <input id="title" type="text" [(ngModel)]="form.title" name="title"
                  placeholder="Ex: Școala din Iași care a eliminat abandonul școlar" required>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="category">Domeniu *</label>
                  <select id="category" [(ngModel)]="form.category" name="category" required>
                    <option value="">Selectează domeniul</option>
                    <option value="educatie">Educație</option>
                    <option value="sanatate">Sănătate</option>
                    <option value="infrastructura">Infrastructură</option>
                    <option value="energie">Energie & Mediu</option>
                    <option value="economie">Economie</option>
                    <option value="stiinta">Știință & Tech</option>
                    <option value="societate">Societate</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="county">Județ *</label>
                  <input id="county" type="text" [(ngModel)]="form.county" name="county" placeholder="Ex: Cluj" required>
                </div>
              </div>

              <div class="form-group">
                <label for="summary">Rezumat (max. 300 caractere) *</label>
                <textarea id="summary" [(ngModel)]="form.summary" name="summary" rows="3"
                  placeholder="Descrie pe scurt ce s-a întâmplat și care este impactul." required maxlength="300"></textarea>
                <span class="char-count">{{form.summary.length}}/300</span>
              </div>

              <div class="form-group">
                <label for="content">Detalii *</label>
                <textarea id="content" [(ngModel)]="form.content" name="content" rows="8"
                  placeholder="Descrie povestea complet: ce problemă exista, ce s-a făcut, cine a fost implicat, care sunt rezultatele concrete." required></textarea>
              </div>

              <div class="form-group">
                <label for="source">Sursă / dovadă</label>
                <input id="source" type="text" [(ngModel)]="form.source" name="source"
                  placeholder="Link, document public, persoană de contact verificabilă">
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="author">Numele tău *</label>
                  <input id="author" type="text" [(ngModel)]="form.author" name="author" placeholder="Prenume Nume" required>
                </div>
                <div class="form-group">
                  <label for="email">Email *</label>
                  <input id="email" type="email" [(ngModel)]="form.email" name="email" placeholder="adresa@email.ro" required>
                </div>
              </div>

              <div class="form-check">
                <input type="checkbox" id="consent" [(ngModel)]="form.consent" name="consent" required>
                <label for="consent">Confirm că informațiile sunt corecte și îmi dau acordul pentru publicare și prelucrarea datelor personale conform GDPR.</label>
              </div>

              <button type="submit" class="btn btn--primary btn--lg">Trimite știrea →</button>
            </form>
          } @else {
            <div class="success-message">
              <span class="success-icon">✅</span>
              <h2>Mulțumim!</h2>
              <p>Știrea ta a fost primită și va fi analizată de echipa editorială în maxim 72 de ore. Îți vom răspunde la adresa de email furnizată.</p>
              <a routerLink="/" class="btn btn--primary">Înapoi la pagina principală</a>
            </div>
          }

          <aside class="submit-guidelines">
            <div class="sidebar-box">
              <h4>✅ Ce publicăm</h4>
              <ul>
                <li>Soluții verificabile la probleme reale</li>
                <li>Progres documentat cu date</li>
                <li>Povești cu impact concret și măsurabil</li>
                <li>Inițiative comunitare de succes</li>
                <li>Modele care pot fi replicate</li>
                <li>Cercetare și inovație din România</li>
              </ul>
            </div>
            <div class="sidebar-box">
              <h4>❌ Ce nu publicăm</h4>
              <ul>
                <li>Știri fără surse verificabile</li>
                <li>Materiale promoționale sau advertising</li>
                <li>Propagandă politică de orice formă</li>
                <li>Conținut defăimător sau neconfirmat</li>
                <li>Plagiate sau conținut generat AI nedeclarat</li>
              </ul>
            </div>
            <div class="sidebar-box sidebar-box--info">
              <h4>⏱️ Procesul editorial</h4>
              <p>Fiecare trimitere trece prin verificare editorială în maxim 72 ore. Vei fi contactat indiferent de decizia luată.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .submit-hero {
      background: linear-gradient(135deg, #f0faf4, #fafaf8);
      padding: 56px 0; border-bottom: 1px solid var(--color-border);
      h1 { font-size: 2.2rem; margin-bottom: 10px; }
      p { color: var(--color-text-muted); font-size: 1.05rem; max-width: 600px; line-height: 1.7; }
    }
    .submit-layout { display: grid; grid-template-columns: 1fr 300px; gap: 48px;
      @media (max-width: 900px) { grid-template-columns: 1fr; }
    }
    .submit-form { display: flex; flex-direction: column; gap: 20px; }
    .form-group { display: flex; flex-direction: column; gap: 6px;
      label { font-size: 0.9rem; font-weight: 600; color: var(--color-text); }
      input, select, textarea {
        padding: 10px 14px; border-radius: var(--radius);
        border: 1px solid var(--color-border); font-family: var(--font-body);
        font-size: 0.95rem; background: white; transition: border-color 0.2s; resize: vertical;
        &:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px rgba(46,125,82,0.08); }
      }
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }
    .char-count { font-size: 0.75rem; color: var(--color-text-muted); text-align: right; }
    .form-check { display: flex; gap: 10px; align-items: flex-start;
      input { margin-top: 3px; flex-shrink: 0; accent-color: var(--color-primary); width: 16px; height: 16px; }
      label { font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.6; }
    }
    .btn--lg { padding: 14px 32px; font-size: 1rem; justify-content: center; }
    .success-message { text-align: center; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; gap: 20px;
      .success-icon { font-size: 3.5rem; }
      h2 { font-size: 1.8rem; }
      p { color: var(--color-text-muted); line-height: 1.7; max-width: 480px; }
    }
    .submit-guidelines { display: flex; flex-direction: column; gap: 16px; }
    .sidebar-box {
      background: white; border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm);
      h4 { font-family: var(--font-display); margin-bottom: 12px; font-size: 1rem; }
      ul { list-style: none; display: flex; flex-direction: column; gap: 8px;
        li { font-size: 0.88rem; color: var(--color-text-muted); padding-left: 4px; line-height: 1.4; }
      }
      p { font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.6; }
      &--info { background: linear-gradient(135deg, #f0faf4, #e8f5ee); }
    }
  `]
})
export class SubmitComponent {
  submitted = signal(false);
  form = { title: '', category: '', county: '', summary: '', content: '', source: '', author: '', email: '', consent: false };
  onSubmit() { this.submitted.set(true); }
}
