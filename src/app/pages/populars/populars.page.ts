import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-populars',
  templateUrl: './populars.page.html',
  styleUrls: ['./populars.page.scss'],
})
export class PopularsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openSearch() {
    this.router.navigateByUrl('/buscar');
  }

}
