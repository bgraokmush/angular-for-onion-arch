import { Component } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'E-TicaretClient';

  ngOnInit() {
    $(() => {
      console.log('test');
    });
    $(document).ready(() => {
      console.log('test 2');
    });
  }
}
