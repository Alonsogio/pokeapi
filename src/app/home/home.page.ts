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

  constructor(
    private pokeService: PokeapiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeService.getPokemons().subscribe(async (res: any) => {
      const requests = res.results.map((pokemon: any) => this.pokeService.getPokemonDetails(pokemon.url));
      const details = await Promise.all(requests.map((req: { toPromise: () => any; }) => req.toPromise()));
      this.pokemons = details;
    });
  }

  goToDetail(name: string) {
    this.router.navigate(['/pokemon-detail', name]);
  }
}
