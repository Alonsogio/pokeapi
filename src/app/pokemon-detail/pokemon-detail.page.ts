import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { PokeapiService } from '../services/pokeapi.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: false,
})
export class PokemonDetailPage implements OnInit {
  pokemon: any = null;
  name: string = '';
  cardColor: string = '#fff';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private favoriteService: FavoriteService,
    private pokeService: PokeapiService
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name')!;

    const nav = this.router.getCurrentNavigation();
    this.cardColor = nav?.extras?.state?.['color'] || '#fff';

    this.pokeService
      .getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${this.name}`)
      .subscribe((data) => {
        this.pokemon = data;
      });
  }
  toggleFavorite(name: string) {
    if (this.favoriteService.isFavorite(name)) {
      this.favoriteService.removeFavorite(name);
    } else {
      this.favoriteService.addFavorite(name);
    }
  }

  isFavorite(name: string): boolean {
    return this.favoriteService.isFavorite(name);
  }
  getStat(statName: string): number {
    const base =
      this.pokemon?.stats?.find(
        (stat: { stat: { name: string } }) => stat.stat.name === statName
      )?.base_stat || 0;
    return Math.min(base, 100);
  }

  getCardColor(pokemon: any): string {
    if (!pokemon?.types?.length) return '#fff';
    const type = pokemon.types[0].type.name;

    const colors: any = {
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

    return colors[type] || '#fff';
  }
}
