import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Image } from '../models/Image';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  collectionOfPictures = 'Clothes';

  constructor(
    private http: HttpClient, 
    private afs: AngularFirestore,
    private storage: AngularFireStorage) { }

  loadImageMeta(metaUrl: string): Observable<Array<Image>> {
    return this.afs.collection<Image>(this.collectionOfPictures).valueChanges();
    //return this.http.get(environment.hostUrl + '/assets/' + metaUrl) as Observable<Array<Image>>;
  }

  loadImage(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
    //return this.http.get(environment.hostUrl + '/assets/' + imageUrl, {responseType: 'blob'});
  }
}
