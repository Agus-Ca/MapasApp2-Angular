import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { mapbox } from './environments/mapboxToken';
 
Mapboxgl.accessToken = mapbox.token;

if ( !navigator.geolocation ) {
  alert('Navegador no soporta GEOLOCATION');
  throw new Error('Navegador no soporta GEOLOCATION');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
