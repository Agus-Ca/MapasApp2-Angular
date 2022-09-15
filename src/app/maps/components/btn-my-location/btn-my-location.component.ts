import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styles: [`
    button {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 999;
    }
  `]
})
export class BtnMyLocationComponent {

  constructor(
    private mapService:MapService,
    private placesServices:PlacesService
  ) { }

  goToMyLocation(): void {
    if ( !this.placesServices.isUserLocationReady ) throw Error('No hay ubicacion de usuario');
    if ( !this.mapService.isMapReady ) throw Error('No hay mapa disponible');

    this.mapService.flyTo( this.placesServices.userLocation! )
  }
}