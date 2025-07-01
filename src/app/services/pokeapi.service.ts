import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private apiURL = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons(offset = 0, limit = 20): Observable<any> {
    return this.http.get(`${this.apiURL}?offset=${offset}&limit=${limit}`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get(url);
  }
}
