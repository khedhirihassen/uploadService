import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import * as L from 'leaflet';
import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Implémenter OnInit
export class AppComponent implements OnInit {

  public allLocations: any[] = [];

  constructor(private http: HttpClient, private locationService: LocationService) {
  }

  // Fonction d'initialisation du composant.
  // Fonction d'initialisation du composant.
  ngOnInit() {
    this.getLocations();
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const myfrugalmap = L.map('frugalmap').setView([50.6311634, 3.0599573], 2);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Frugal Map'
    }).addTo(myfrugalmap);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });


    this.locationService.getLocations().subscribe(
      (response: any) => {
        response.forEach((podotactile: any) => {
          L.marker([podotactile.longitude,podotactile.latitude], {icon: myIcon}).addTo(myfrugalmap);
        })
        //this.allLocations = response;
        //console.log(response);
      });
    /*this.http.get('https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=bornes-podotactiles').subscribe((data: any) => {
      data.records.forEach((podotactile: { geometry: { coordinates: number[]; }; }) => {
        L.marker([podotactile.geometry.coordinates[1], podotactile.geometry.coordinates[0]], { icon: myIcon }).addTo(myfrugalmap);
      });
    });*/

  }

  public getLocations(): void {
    this.locationService.getLocations().subscribe(
      (response: any[]) => {
        this.allLocations = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }




}