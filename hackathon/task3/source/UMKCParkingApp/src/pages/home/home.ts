import { Component, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SubmitAvailabilityPage } from '../submitAvailability/submitAvailability';
import { DecimalPipe } from '@angular/common';

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
 
declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    @ViewChild('map') mapElement: ElementRef;
    map: any;
    
    altList: LotList;
    lotList: LotList;
    aList: AvailabilityList;

  constructor(private decimalPipe: DecimalPipe, 
                public navCtrl: NavController, 
                public http: HttpClient, 
                private alertCtrl: AlertController) {
           
    this.ldAvailability();
    this.ldLots();
    
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
    
    

    ionViewDidLoad(){
        this.initMap();
    }
    
    initMap() {
        this.map = new google.maps.Map(document.getElementById("map"), {
                zoom: 16,
                center: {lat: 39.033271, lng: -94.5787872},
                disableDefaultUI: true,
                gestureHandling: 'none',
                zoomControl: false
        });
    }
            
    
    /**
     * Shoudl get lots from the server.js
     */
    loadLots(filePath: string) {
        return this.http.get<LotList>(filePath).subscribe(
            data => { 
                this.altList = data; 
                console.log(data); // works
                console.log(this.altList);
                console.log(this.altList[0]);
                for(let i=0; i < data.length; i++){
                    this.addMarker(this.altList[i]);
                    console.log(this.altList[i]);
                    
                }
            }
        );
    };
    
    
    
    /**
     * Shoudl get availability from the server.js
     */
    loadAvailability(filePath: string){
        return this.http.get<AvailabilityList>(filePath).subscribe(
            data => { 
                this.aList = data; 
                
                console.log(data); // works
            }
        );
        
    };
    
    ldLots(){
        return this.http.get<lotList>('http://127.0.0.1:8081/getLots').subscribe(
            data => {
                console.log("we got here");
                this.lotList = data;
                console.log("Lots from server");
                console.log(data); //works.
                console.log(this.lotList)
                for(let i=0; i < data.length; i++){
                    this.addMarker(this.lotList[i]);
                    console.log(this.lotList[i]);
                    
                }
            }
        )
    }
    
    ldAvailability(){
        return this.http.get<availabilityList>('http://127.0.0.1:8081/getAvailability').subscribe(
            data => {
                console.log("we got here2");
                this.aList = data;
                console.log("Availability from server");
                console.log(data); //works.
                console.log(this.aList)
            }
        )
        
        
        
    }
    

    
    displayAvail(lotID: number){
        console.log(lotID);
        console.log(this.aList.find(lot=>lot._id==lotID));
        var avail = this.aList.find(lot=>lot._id == lotID).availableSpots;
        console.log(avail);
        var lotInfo = this.lotList.find(lot=>lot._id==lotID)
        var av = ((avail/lotInfo.capacity)*100);
        document.getElementById('results').style.display = 'block';
        document.getElementById('content').innerHTML = 
                        lotInfo.name+'<br>'+
                        'Availability: '+this.decimalPipe.transform(av ,'1.2-2')+'%<br>'+
                        'Spots Available: '+avail+'<br>'+
                        'Capacity: '+lotInfo.capacity+'<hr>';  
    }
    
    
    
    //39.0313928
    //-94.5770478
    //(lat: number, lng: number)
    //
    addMarker(lot: Lot) {
      var position = new google.maps.LatLng(lot.location.lat, lot.location.lng);
      var lotMarker = new google.maps.Marker({position: position, title: lot.name});
      lotMarker.setMap(this.map);
      lotMarker.addListener('click', () => {
        this.displayAvail(lot._id);
      });
    }
    
    
    repAvail(){
        console.log("report availability");
        this.navCtrl.push(SubmitAvailabilityPage);
    }
    
    reserveSpot(id: number){
        console.log("report availability");
        this.navCtrl.push(ReserveSpotPage);    
    }
    
    dismiss(){
        console.log("dismiss");
        document.getElementById('results').style.display = 'none';
    }


}
