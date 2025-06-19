import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: '/home.page.html',
  styleUrls: ['/home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  currentPage: number = 1;
  totalPages: number = 10;
  limit: number = 20;

  typeColors: { [key: string]: string } = {
    fire: '#fc6c6d',
    water: '#49d0b0',
    electric: '#ffd76f',
    grass: '#70a83b',
    bug: '#92bc2c',
    normal: '#b5b9c4',
    poison: '#b567ce',
    ground: '#f78551',
    fairy: '#fdb9e9',
    fighting: '#d3425f',
    psychic: '#ff6568',
    rock: '#d4c294',
    ghost: '#5f6dbc',
    ice: '#91d8df',
    dragon: '#0a6dc4',
    dark: '#595761',
    steel: '#4d91b2',
    flying: '#a1bbec',
  };

  constructor(
    private pokeService: PokeapiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemons(1);
  }

  loadPokemons(page: number) {
    if (page < 1 || page > this.totalPages) return;

    const offset = (page - 1) * this.limit;
    this.currentPage = page;

    this.pokeService
      .getPokemons(offset, this.limit)
      .subscribe(async (res: any) => {
        const requests = res.results.map((pokemon: any) =>
          this.pokeService.getPokemonDetails(pokemon.url)
        );
        const details = await Promise.all(
          requests.map((req: { toPromise: () => any }) => req.toPromise())
        );
        this.pokemons = details;
      });
  }

  goToDetail(name: string) {
    this.router.navigate(['/pokemon-detail', name]);
  }

  getCardColor(pokemon: any): string {
    const type = pokemon.types?.[0]?.type?.name;
    return this.typeColors[type] || '#e0e0e0';
  }
}
