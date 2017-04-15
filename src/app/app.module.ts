import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {FilterPipe} from './filterPipe';

/**
 * The HTTP service is not added by default
 * so we need to import it.
 */
import {HttpModule} from '@angular/http';

/**
 * Import the PokedexService
 */
import {PokedexService} from './pokedex.service';
import {CapitalizePipe} from './capitalize.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CapitalizePipe,
        FilterPipe
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        /**
         * Register the HTTP service.
         */
        HttpModule
    ],
    /**
     * Register the service as a
     * provider.
     */
    providers: [PokedexService],
    entryComponents: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {

}