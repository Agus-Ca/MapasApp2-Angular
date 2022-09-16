import { Component } from '@angular/core';
import { Feature } from '../../interfaces/places.interface';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styles: [`
    .pointer {
      cursor: pointer;
    }

    p {
      font-size: 12px;
    }
  `]
})
export class SearchResultsComponent {

  constructor(
    private placesService: PlacesService,
    private mapService: MapService
  ) { }

  public selectedId: string = '';

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Feature[] {
    return this.placesService.places;
  }

  flyTo( place:Feature) {
    this.selectedId = place.id;

    const [ lng, lat ] = place.center;
    this.mapService.flyTo( [ lng, lat ] );
  }

  getDirections( place:Feature ) {
    if ( !this.placesService.userLocation ) throw Error('No hay user location');

    this.placesService.deletePlaces();

    const start = this.placesService.userLocation;
    const end = place.center as [number, number];
    this.mapService.getRouteBetweenPoints( start, end );
  }

}