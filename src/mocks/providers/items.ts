import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
@Injectable()
export class Items {
  items: Item[] = [];
  dataClientsArr: Item = [];

  defaultItem: any = {
    "name": "Juan José",
    "surname": "Suárez",
    "dataIn":"10/10/2010",
    "mail": "suarezramirezjuanjose@hotmail.com",
    "tel": "697856543",
    "gender":"Masculino"
  };


  constructor() {
    // let items = [
    //   {
    //     "name": "Burt Bear",
    //     "profilePic": "assets/img/speakers/bear.jpg",
    //     "about": "Burt is a Bear.",
    //     "pepe": "JEJEJEEJEE"
    //   },
    //   {
    //     "name": "Charlie Cheetah",
    //     "profilePic": "assets/img/speakers/cheetah.jpg",
    //     "about": "Charlie is a Cheetah.",
    //     "pepe": "pepe"
    //   },
    //   {
    //     "name": "Donald Duck",
    //     "profilePic": "assets/img/speakers/duck.jpg",
    //     "about": "Donald is a Duck.",
    //     "pepe": "pepe"
    //   },
    //   {
    //     "name": "Eva Eagle",
    //     "profilePic": "assets/img/speakers/eagle.jpg",
    //     "about": "Eva is an Eagle.",
    //     "pepe": "pepe"
    //   },
    //   {
    //     "name": "Ellie Elephant",
    //     "profilePic": "assets/img/speakers/elephant.jpg",
    //     "about": "Ellie is an Elephant.",
    //     "pepe": "pepe"
    //   },
    //   {
    //     "name": "Molly Mouse",
    //     "profilePic": "assets/img/speakers/mouse.jpg",
    //     "about": "Molly is a Mouse.",
    //     "pepe": "pepe"
    //   },
    //   {
    //     "name": "Paul Puppy",
    //     "profilePic": "assets/img/speakers/puppy.jpg",
    //     "about": "Paul is a Puppy.",
    //     "pepe": "pepe"
    //   }
    // ];

    // for (let item of items) {
    //   this.items.push(new Item(item));
    // }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  getDataClients(dataClients) {
    if (dataClients && dataClients.allUsers.length > 0) {
      for (let index = 0; index < dataClients.allUsers.length; index++) {
        const element = dataClients.allUsers[index];
        const realItemElement = {
          "name": element[2],
          "surname": element[3],
          "dataIn": element[4],
          "mail": element[6],
          "tel": element[7],
          "gender": element[8],
          // FEMENINO
          // MASCULINO
          "profilePic": element[8].toUpperCase().includes('MA') ? 'assets/img/icons8-male-48.png' : 'assets/img/icons8-female-48.png',
          "id_client": element[0],
          "id_user": element[1]
        }
        this.add(realItemElement);
      }
    }
  }
}
