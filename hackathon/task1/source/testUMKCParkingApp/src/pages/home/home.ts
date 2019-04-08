import { Component } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/**
 * Interface for a single lot entry
 */
export interface Lot {
    id:         number,
    name:       string,
    maxNumber:  number,
    group:      number,
    type:       string
}

/**
 * Interface for a list of Lot entries 
 */
export interface LotList {
    lots: Lot[];
}

/**
 * Interface for availability
 */
 export interface Availability{
    id:             number,
    parkingLotId:   number,
    userId:         string,
    timeReported:   number,
    availability:   number,
 }
 
 /**
 * Interface for a list of Availability entries 
 */
export interface AvailabilityList {
    availability: Availability[];
}
 
 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    lotList: LotList;
    aList: AvailabilityList;

  constructor(public navCtrl: NavController, public http: HttpClient, private alertCtrl: AlertController) {
    this.loadLots('assets/data/lots.json');
    this.loadAvailability('assets/data/availability.json');
  }
  
  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
            Object.keys(tabs).map((key) => {
                tabs[key].style.display = 'none';
            });
        }
    }
    
    ionViewWillLeave() {
        let tabs = document.querySelectorAll('.show-tabbar');
        if (tabs !== null) {
            Object.keys(tabs).map((key) => {
                tabs[key].style.display = 'flex';
            });

        }
    }
    
    
    loadLots(filePath: string) {
        return this.http.get<LotList>(filePath).subscribe(
            data => { 
                this.lotList = data; 
                console.log(data); // works
            }
        );
    };
    
    loadAvailability(filePath: string){
        return this.http.get<AvailabilityList>(filePath).subscribe(
            data => { 
                this.aList = data; 
                console.log(data); // works
            }
        );
    };
    
    displayAvailability(){
        let alert = this.alertCtrl.create({
            title: 'Test',
            subTitle: '10% Spaces Available',
            buttons: ['Dismiss']
        });
        alert.present();
    
    }

}
