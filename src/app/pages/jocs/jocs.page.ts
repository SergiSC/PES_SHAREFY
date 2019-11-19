import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jocs',
  templateUrl: './jocs.page.html',
  styleUrls: ['./jocs.page.scss'],
})
export class JocsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  openSearch() {
    this.router.navigateByUrl('/buscar');
  }
}
