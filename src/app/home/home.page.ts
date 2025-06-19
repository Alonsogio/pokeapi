import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../services/pokeapi.service';
import { FavoriteService } from '../services/favorite.service';
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

  constructor(
    private pokeService: PokeapiService,
    private favoriteService: FavoriteService,
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
}
