import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

/**
 * Service to store and retrieve data in local storage. 
 * Can be also accesed with the events 'storage:get', 'storage:set' and 'storage:remove'. 
 * CAUTION! 'storage:get' will return an array with the stringified value from localStorage.
 */
@Injectable()
export class StorageProvider {

  constructor(private events: Events) {
    events.subscribe('storage:get', (key: string) => {
      return this.get(key);
    });
    events.subscribe('storage:set', (key: string, value: any) => {
      this.set(key, value);
    });
    events.subscribe('storage:remove', (keysArray: string[]) => {
      this.remove(keysArray);
    });
  }

  ngOnDestroy(): void {
    this.events.unsubscribe('storage:get');
    this.events.unsubscribe('storage:set');
    this.events.unsubscribe('storage:remove');
  }

  /**
   * Function to retrieve a key from localStorage.
   * @param key Name of the key to retrieve
   */
  get(key: string): any {
    let _retrieved = localStorage.getItem(key);
    if (_retrieved) {
      try {
        _retrieved = atob(_retrieved);
        _retrieved = JSON.parse(_retrieved);
      } catch (error) {
        try {
          _retrieved = JSON.parse(_retrieved);
        } catch (error) { }
      }
    }
    return _retrieved || undefined;
  }

  /**
   * Function to store a key into localStorage.
   * @param key Name of the key to store
   * @param value Value for the specified key. Shouldn't be stringified
   */
  set(key: string, value: any): void {
    typeof (value) === 'object'
      ? localStorage.setItem(key, btoa(JSON.stringify(value)))
      : localStorage.setItem(key, btoa(value));
  }

  /**
   * Function to delete keys from localStorage.
   * @param key Array with the names of the keys to delete
   */
  remove(keysArray: string[]) {
    keysArray.forEach(key => {
      if (localStorage.getItem(key)) localStorage.removeItem(key);
    });
  }
}