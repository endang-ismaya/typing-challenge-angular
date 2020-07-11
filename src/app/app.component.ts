import { Component } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  randomText: string = lorem.sentence();
  isSuccess: boolean = false;

  onInput(value: string): void {
    if (value === this.randomText) {
      this.isSuccess = true;
    }
  }
}
