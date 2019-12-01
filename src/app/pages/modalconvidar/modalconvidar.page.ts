import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-modalconvidar',
  templateUrl: './modalconvidar.page.html',
  styleUrls: ['./modalconvidar.page.scss'],
})
export class ModalconvidarPage implements OnInit {

  jocs

  constructor(
    private api: ApiService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.api.getAllGames().subscribe((data: any) => {
      console.log(data.value)
      this.jocs = data.value;
    });
  }

  customPopoverOptions: any = {
    header: this.translate.instant('PAGE.INFORMACIO.PLACEHOLDERSELECT'),
  };

}
