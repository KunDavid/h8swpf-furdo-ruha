import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Carteditem } from '../models/Carteditem';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  collectionName = 'Orders'

  constructor(private afs: AngularFirestore) { }

  create(carteditem: Carteditem) {
    carteditem.id = this.afs.createId();
    return this.afs.collection<Carteditem>(this.collectionName).doc(carteditem.id).set(carteditem);
  }

  getAll() {
    return this.afs.collection<Carteditem>(this.collectionName).valueChanges();
  }

  update() {
    
  }

  delete() {

  }
}
