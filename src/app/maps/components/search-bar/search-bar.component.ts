import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [`
    .search-container {
      position: fixed;
      top: 20px; left: 20px;
      width: 280px;
      z-index: 999;
      background-color: white;
      padding: 5px;
      box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.2);
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5px;
    }
  `]
})
export class SearchBarComponent {

  constructor() { }

  private debounceTimer?: NodeJS.Timeout;

  onQueryChanged( query:string = '' ) {
    if ( this.debounceTimer ) clearTimeout( this.debounceTimer );

    this.debounceTimer = setTimeout( () => {
      console.log('enviar peticion: ', query)
    }, 1000)
  }

}