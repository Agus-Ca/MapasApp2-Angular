import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';

import { DirectionsApiClient } from '../api/directionsApiClient';
import { Directionresponse, Route } from '../interfaces/directions.interface';
import { Feature } from '../interfaces/places.interface';



@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private directionsApi: DirectionsApiClient
  ) { }

  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap( map:Map ) {
    this.map = map;
  }

  flyTo( coords:LngLatLike ) {
    if ( !this.isMapReady ) throw Error('El mapa no esta listo!');

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkerFromPlaces( places: Feature[], userLocation: [number, number] ) {

    if ( !this.map ) throw Error('Mapa no inicializado');

    this.markers.forEach( marker => marker.remove() );
    const newMarkers: Marker[] = [];
    
    for ( const place of places ) {
      const [ lng, lat ] = place.center;
      const popup = new Popup().setHTML(`
      <h6>${ place.text }</h6>
      <span>${ place.place_name }</span>
      `);
      const newMarker = new Marker().setLngLat([ lng, lat ])
      .setPopup( popup )
      .addTo( this.map );
      newMarkers.push( newMarker );
    }
    
    this.markers = newMarkers;

    if ( places.length === 0 ) return;

    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => bounds.extend( marker.getLngLat() ) );
    bounds.extend( userLocation );
    this.map.fitBounds( bounds, { padding:200 } );
  }

  getRouteBetweenPoints( start:[number, number], end:[number, number]) {
    this.directionsApi.get<Directionresponse>(`/${ start.join(',') };${ end.join(',') }`)
      .subscribe( resp => {
        this.drawPolyline( resp.routes[0] );
      });
  }

  drawPolyline( route:Route ) {
    if ( !this.map ) throw Error('Mapa no inicializado');

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach( ([ lng, lat ]) => bounds.extend( [lng, lat] ));

    console.log( { kms: route.distance / 1000, duration: route.duration / 60 } );

    this.map.fitBounds( bounds, { padding:200 } )
  }

}