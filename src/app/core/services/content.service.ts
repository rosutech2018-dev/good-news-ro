import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article, Category, GoodModel, County } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private http = inject(HttpClient);
  private base = 'assets/content';

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.base}/articles.json`);
  }

  getFeaturedArticles(): Observable<Article[]> {
    return this.getArticles().pipe(map(articles => articles.filter(a => a.featured)));
  }

  getArticlesByCategory(slug: string): Observable<Article[]> {
    return this.getArticles().pipe(map(articles => articles.filter(a => a.category === slug)));
  }

  getArticleBySlug(slug: string): Observable<Article | undefined> {
    return this.getArticles().pipe(map(articles => articles.find(a => a.slug === slug)));
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.base}/categories.json`);
  }

  getGoodModels(): Observable<GoodModel[]> {
    return this.http.get<GoodModel[]>(`${this.base}/good-models.json`);
  }

  getCounties(): Observable<County[]> {
    return this.http.get<County[]>(`${this.base}/counties.json`);
  }
}
