import { Component, signal, ViewChild, AfterViewInit } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { SettingsMenuComponent } from './settings/settings-menu.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent, SettingsMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  @ViewChild('player1Counter') player1Counter!: CounterComponent;
  @ViewChild('player2Counter') player2Counter!: CounterComponent;

  ngAfterViewInit() {
    window.addEventListener('resetAll', () => {
      this.player1Counter.resetLife();
      this.player2Counter.resetLife();
    });

    window.addEventListener('setLife', (event: Event) => {
      const customEvent = event as CustomEvent;
      const { lifeTotal } = customEvent.detail;
      this.player1Counter.lifeTotal.set(lifeTotal);
      this.player2Counter.lifeTotal.set(lifeTotal);
    });
  }
}
