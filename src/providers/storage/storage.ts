import { Injectable } from '@angular/core';
import * as aes256 from 'aes256';

/**
 * Service to store and retrieve data in local storage.
 * Can be also accesed with the events 'storage:get', 'storage:set' and 'storage:remove'.
 */
@Injectable()
export class StorageProvider {

    private SECRET = 'E@JT8r*9%CbYwNWYsSSg%J7Bf5-h_!Yev#mBA%Zj#bgErNT@4NdbceDgXe@_&vkF^^ZLs+TvbPfZH#HKDqW%MxPR9hSZy=fyDx23EZJLZp-E?cmq3=MXZw+kHyVJw@r5';
    private cipher = aes256.createCipher(this.SECRET);

    constructor() {
        const control = this.get('control');
        if (!control || control !== this.SECRET) {
            this.clear();
            this.set('control', this.SECRET);
        }
    }

    /**
     * Function to retrieve the corresponding encrypted key from localStorage.
     * @param decryptedKeyName Decrypted name of the key to retrieve
     */
    private getEncryptedKey(decryptedKeyName: string) {
        const keys = Object.keys(localStorage);
        let i = keys.length;
        while (i--) {
            try {
                const decr = this.cipher.decrypt(keys[i]);
                if (decr && decryptedKeyName === decr) {
                    return keys[i];
                }
            } catch (error) {
                // console.error('getEncryptedKey error');
            }
        }
        return this.cipher.encrypt(decryptedKeyName);
    }

    /**
     * Function to retrieve a key from localStorage.
     * @param key Name of the key to retrieve
     */
    get(key: string): any {
        let _retrieved = localStorage.getItem(this.getEncryptedKey(key));
        if (_retrieved) {
            try {
                _retrieved = this.cipher.decrypt(_retrieved);
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
    set(key: string, value: any): boolean {
        try {
            typeof (value) !== 'string'
                ? localStorage.setItem(this.getEncryptedKey(key), this.cipher.encrypt(JSON.stringify(value)))
                : localStorage.setItem(this.getEncryptedKey(key), this.cipher.encrypt(value));
            return true;
        } catch (error) {
            console.error('Storage - Error setting key ' + this.getEncryptedKey(key) + ':', error);
            return false;
        }
    }

    /**
     * Function to delete keys from localStorage.
     * @param key Name of the key to delete
     */
    remove(key: string): boolean {
        try {
            localStorage.removeItem(this.getEncryptedKey(key));
            return true;
        } catch (error) {
            console.error('Storage - Error removing key ' + this.getEncryptedKey(key) + ':', error);
            return false;
        }
    }

    /**
     * Function to clear localStorage.
     */
    clear(): boolean {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage - Error clearing localStorage:', error);
            return false;
        }
    }
}
