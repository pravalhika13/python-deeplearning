import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


/**
 * Interface for a single lot entry
 */
export interface Lot {
    _id:         number,
    name:       string,
    address:    string,
    location : {
        lat: number,
        lng: number
    },
    capacity:  number,
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
    _id:            number,
    availableSpots: number
 }
 
 /**
 * Interface for a list of Availability entries 
 */
export interface AvailabilityList {
    availability: Availability[];
}


 /**
 * Interface for selection
 */
export interface Selection {
    lotName: string
}
 
 


@Component({
  selector: 'page-reserveSpot',
  templateUrl: 'reserveSpot.html'
})
export class ReserveSpotPage {

    lotList: LotList;
    
    selection = {} as Selection;

  constructor(public navCtrl: NavController, public http: HttpClient, private alertCtrl: AlertController) {
    this.loadLots('assets/data/lots.json');
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
    
    
    /**
     * Shoudl post availability to the server.js
     */
    reserve(){
        console.log("submit!");
        console.log(this.selection);
        var id = this.lotList.find(lot => lot.name==this.selection.lotName)._id;
        console.log(id);
        

        let postData = {
            "_id": id
        }

        this.http.post("http://127.0.0.1:8081/reserveSpot", postData)
        .subscribe(data => {
            console.log(data['_body']);
        }, error => {
            console.log(error);
        });
        
        
        this.navCtrl.pop();
    }
    
    loadLots(filePath: string) {
        return this.http.get<LotList>(filePath).subscribe(
            data => { 
                this.lotList = data; 
                console.log(data); // works
            }
        );
    };
    
    

}
