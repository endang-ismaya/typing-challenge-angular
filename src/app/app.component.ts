import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  randomText = faker.lorem.sentence();
  inputValue = '';

  compare(letter: string, enteredLetter: string): string {
    if (!enteredLetter) {
      return 'pending';
    }

    return enteredLetter === letter ? 'correct' : 'incorrect';
  }

  getRandomText() {
    this.randomText = faker.lorem.sentence();
    this.inputValue = '';
  }

  onInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
  }
}