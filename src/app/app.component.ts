import { Component } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  randomText: string = lorem.sentence();
  inputValue: string = '';

  compare(letter: string, enteredLetter: string): string {
    if (!enteredLetter) {
      return 'pending';
    }

    return enteredLetter === letter ? 'correct' : 'incorrect';
  }

  getRandomText() {
    this.randomText = lorem.sentence();
    this.inputValue = '';
  }
}
