import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RxdbProvider } from '@localStorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private rxdbProvider: RxdbProvider
  ) {}

  ngOnInit(): void {
    this.router.navigate(['']);
    this.rxdbProvider.initDB('photo-lib');
  }

  public onTabChanged(event: number): void {
    switch (event) {
      case 0:
        this.router.navigate(['/photos']);
        break;
      case 1:
        this.router.navigate(['/favorites']);
        break;
      default:
        this.router.navigate(['/photos']);
        break;
    }
  }
}
