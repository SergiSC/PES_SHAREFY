import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-perfiljoc',
  templateUrl: './perfiljoc.page.html',
  styleUrls: ['./perfiljoc.page.scss'],
})
export class PerfiljocPage implements OnInit {

  imatge: any;
  descripcio: any;
  joc: any;
  id: any;
  publicacions: any;
  numPubli: any;

  constructor(private router: Router, private route: ActivatedRoute, public api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.imatge = data.imag;
      this.descripcio = data.desc;
      this.joc = data.name;
      this.id = data.idg;
    });

    this.api.getGamePublications(this.id).subscribe((data: any) => {
      this.publicacions = data.value;
      this.numPubli = data.value.length;
    });
  }

}
