import { Injectable } from '@angular/core';

/**
 * Import du service http
 */
import { Http } from '@angular/http';

/**
 Ajout de la méthode toPromise pour convertir un Observable en un Promise
 */
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PokedexService {

  /** Initialisation des constantes */
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  /** On ajoute le service Http au constructeur pour qu'il soit utilisable */
  constructor(private http:Http) { }

  getPokemon(offset: number, limit: number) {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
    /**
     * Récupération des données mais il faut la convertir en un objet utilisable
     */
        .toPromise()
        .then(response => response.json().results)
        .then(items => items.map((item, idx) => {
          /**
           * On renvoie une structure exploitable
           */
          const id: number = idx + offset + 1;
            return {
            name: item.name,
            sprite: `${this.baseSpriteUrl}${id}.png`,
            id,
          };
        }));
  }


    getPokemonById(idpokemon: number) {
        return this.http.get(`${this.baseUrl}?offset=${idpokemon}&limit=1`)
        /**
         * Récupération des données mais il faut la convertir en un objet utilisable
         */
            .toPromise()
            .then(response => response.json().results)
            .then(items => items.map((item, idx) => {
                /**
                 * On renvoie une structure exploitable
                 */
                const id: number = idx + idpokemon +1;

                return {
                    name: item.name,
                    sprite: `${this.baseSpriteUrl}${id}.png`,
                    id
                };
            }));
    }


}
