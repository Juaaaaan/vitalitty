import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class ItemDetailPage implements OnInit {
  item: any;
  diets: any = [];

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
    
  }

  ngOnInit(): void {
    this.diets.push({
      "name": "18/10/2021",
      "observations":"no me gusta el pepino"
    },
    {
      "name":"21/09/2021",
      "observations":"No tengo tiempo de seguirla. He cambiado de trabajo"
    },
    {
      "name":"01/08/2021",
      "observations":"No tengo tiempo de seguirla. He cambiado de trabajo"
    })
  }

  itemSelected(item) {
    console.log(item)
  }

}
