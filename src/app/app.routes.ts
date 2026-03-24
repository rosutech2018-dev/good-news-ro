import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'categorie/:slug', loadComponent: () => import('./features/category/category.component').then(m => m.CategoryComponent) },
  { path: 'articol/:slug', loadComponent: () => import('./features/article/article.component').then(m => m.ArticleComponent) },
  { path: 'harta-binelui', loadComponent: () => import('./features/harta-binelui/harta-binelui.component').then(m => m.HartaBineluiComponent) },
  { path: 'modele-bune', loadComponent: () => import('./features/good-models/good-models.component').then(m => m.GoodModelsComponent) },
  { path: 'despre', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'trimite-stire', loadComponent: () => import('./features/submit/submit.component').then(m => m.SubmitComponent) },
  { path: '**', redirectTo: '' }
];
