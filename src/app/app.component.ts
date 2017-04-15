import {Component} from '@angular/core';

/**
 * On importe le service des pokemons
 */
import {PokedexService} from './pokedex.service';

/**
 * On importe la classe des pokemons
 */
import {Pokemon} from './pokemon';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    /**
     Liste des pokemons de notre composant, on initialise à vide
     */

    idpokemon;
    filter: Pokemon = new Pokemon();
    pokemonSelected: Pokemon[] = [];
    allPokemon: Pokemon[] = [];

    /**
     Boolean qui représente si on est en train de charger des données
     */
    isLoading: boolean = false;

    /**
     Boolean permettant de définir si on a eu une erreur ou pas
     */
    error: boolean = false;

    /**
     * Injection du service Pokedex dans le constructeur
     */
    constructor(private pokedexService: PokedexService) {
    }

    /**
     * Méthode au démarrage
     */
    ngOnInit() {
        /**
         * On charge les données principales
         */
        this.getAllFirstVersionPokemon();
    }

    recherchePokemonById() {
        //On formate
        this.idpokemon = parseInt(this.idpokemon);
        this.pokedexService.getPokemonById(this.idpokemon - 1).then(pokemon => {
            pokemon = pokemon.map(p => {
                p.imageLoaded = true;
                return p;
            });
            /**
             * Si ça s'est bien passé alors on concatène notre tableau de pokemon
             */
            this.pokemonSelected = pokemon;
            this.error = false;
        })
            .catch(() => {
                this.error = true;
            });

    }

    getAllFirstVersionPokemon() {
        this.isLoading = true;

        /**
         * On charge les 151 premier pokemon prochains pokemons
         */
        this.pokedexService.getPokemon(0, 151)
            .then(pokemon => {
                pokemon = pokemon.map(p => {
                    p.imageLoaded = false;
                    return p;
                });
                /**
                 * Si ça s'est bien passé alors on concatène notre tableau de pokemon
                 */
                this.allPokemon = this.allPokemon.concat(pokemon);
                this.isLoading = false;
                this.error = false;
            })
            .catch(() => {
                this.error = true;
                this.isLoading = false;
            });
    }

    //Actualiser l'id dans l'inpuit
    actualiserId(event){
        this.idpokemon = event.target.value;
    }
}
