import { Injectable } from '@angular/core';

import { PlacesResponse, Feature } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';



@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(
    private placesApi:PlacesApiClient
  ) {
    this.getUserLocation();
  }

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady():boolean {
    return !!this.userLocation;
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject) => {
      navigator.geolocation.getCurrentPosition( 
      ({ coords }) => {
        this.userLocation = [ coords.longitude, coords.latitude ]
        resolve( this.userLocation );
      },
      ( err ) => {
        alert('No se pudo obtener la geolocalizacion');
        console.log( err );
        reject();
      });
    });
  }

  getPlacesByQuery( query:string = '' ) {
    
    if ( query.length === 0 ) {
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    if ( !this.userLocation ) throw Error('No hay userLocation');

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${ query }.json`, { params: { proximity: this.userLocation.join(',') } } )
      .subscribe( resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
      });

  }
}