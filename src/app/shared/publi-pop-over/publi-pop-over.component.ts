import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publi-pop-over',
  templateUrl: './publi-pop-over.component.html',
  styleUrls: ['./publi-pop-over.component.scss'],
})
export class PubliPopOverComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  redirectToEdit(id) {
    this.router.navigateByUrl('/edit-publicacio/' + id);
  }

}
