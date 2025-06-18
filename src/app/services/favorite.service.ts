import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favorites: Set<string> = new Set();

  constructor() {}

  addFavorite(pokemonName: string) {
    this.favorites.add(pokemonName);
  }

  removeFavorite(pokemonName: string) {
    this.favorites.delete(pokemonName);
  }

  isFavorite(pokemonName: string): boolean {
    return this.favorites.has(pokemonName);
  }

  getFavorites(): string[] {
    return Array.from(this.favorites);
  }
}
