import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Carteditem } from '../../../shared/models/Carteditem';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from '../../../shared/models/Image';
import { ShopService } from '../../../shared/services/shop.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnChanges {

  @Input() imageInput?: Image;
  loadedImage?: string;

  // cartedObject: any = {};
  carteds: Array<any> = [];

  itemsForm = this.createForm({
    id: '',
    clothe: '',
    size: '',
    color: '',
    comment: '',
    date: new Date(),
    imageId: this.imageInput?.id
  });

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private shopService: ShopService,
    private orderService: OrderService){

  }
  ngOnChanges(): void {
    if (this.imageInput?.id) {
      this.shopService.loadImage(this.imageInput.image_url).subscribe(data => {
        this.loadedImage = data;
        /*let reader = new  FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
          this.loadedImage = reader.result as string;
        } */
      });
    }
  }

  ngOnInit(): void {
    
  }

  createForm(model: Carteditem) {
    let FormGroup = this.fb.group(model);
    FormGroup.get('size')?.addValidators([Validators.required]);
    FormGroup.get('color')?.addValidators([Validators.required]);
    FormGroup.get('comment')?.addValidators([Validators.required, Validators.minLength(1)]);
    FormGroup.get('clothe')?.addValidators([Validators.required]);
    return FormGroup;
  }

  addToCart() {
    if (this.itemsForm.valid){
      if (this.itemsForm.get("size") && this.itemsForm.get("color") && this.itemsForm.get("comment") && this.itemsForm.get("clothe")) {
        console.log("Kosárba téve");
        this.itemsForm.get('date')?.setValue(new Date());
        this.carteds.push({...this.itemsForm.value});

        //this.orderService.create(this.itemsForm.value);

      } else {
        this.router.navigateByUrl('/shop/success/' + this.itemsForm.get('clothe')?.value);
      }
    }
  }
}
