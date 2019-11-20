import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.imatge = data.imag;
      this.descripcio = data.desc;
      this.joc = data.name;
      this.id = data.idg;
    });
  }

}
