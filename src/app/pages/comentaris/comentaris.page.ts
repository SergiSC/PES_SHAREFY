import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comentaris',
  templateUrl: './comentaris.page.html',
  styleUrls: ['./comentaris.page.scss'],
})
export class ComentarisPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }
  comentaris;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let com  = JSON.parse(params.special);
      this.comentaris = com.coments;
    });
  }

}
