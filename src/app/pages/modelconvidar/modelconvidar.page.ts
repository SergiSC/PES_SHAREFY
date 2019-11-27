import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modelconvidar',
  templateUrl: './modelconvidar.page.html',
  styleUrls: ['./modelconvidar.page.scss'],
})
export class ModelconvidarPage implements OnInit {

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  constructor(navParams: NavParams) { 
    console.log(navParams.get('firstName'));
  }

  ngOnInit() {
  }

}
