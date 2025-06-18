import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokeapiService
  ) {}

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name')!;
    this.pokeService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${this.name}`).subscribe(data => {
      this.pokemon = data;
    });
  }
}
