import { Component, OnInit } from '@angular/core';
import { HttpModule } from '@angular/http'
import { Router } from '@angular/router';;
import { Observable } from 'rxjs/Rx';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    templateUrl: 'heroes.component.html',
    styleUrls: ['heroes.component.css'],
    providers: [ HeroService, HttpModule ]
})

export class HeroesComponent implements OnInit { 
    
    title = 'Tour of Heroes';
    heroes: Hero[];
    selectedHero: Hero;
    heroesList: Observable<any[]>;

    constructor(
        private router: Router,
        private heroService: HeroService) {}

    getHeroes(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes);
    }

    ngOnInit()
    {
        //this.heroesList = this.heroesService.getHeroesList();
        this.getHeroes();
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.createHero(name)
            .then(hero => {
            this.heroes.push(hero);
            this.selectedHero = null;
            });
    }
}