import { Component, signal, viewChildren, inject, computed } from '@angular/core';
import { CounterComponent } from './counter/counter.component';
import { SettingsMenuComponent } from './settings/settings-menu.component';
import { WakeLock } from './wake-lock';

@Component({
  selector: 'app-root',
  imports: [CounterComponent, SettingsMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  players = signal(2);
  topArray = computed(() =>
    Array.from({ length: Math.floor(this.players() / 2) }, (_, i) => i + 1)
  );
  bottomArray = computed(() =>
    Array.from({ length: Math.ceil(this.players() / 2) }, (_, i) => i + 1)
  );

  // Grab all instances of CounterComponent in the template
  counters = viewChildren(CounterComponent);

  wakeLock = inject(WakeLock);

changePlayerCount(newCount: number) {
    this.players.set(newCount);
  }

  setAllLives(lifeTotal: number) {
    for(const counter of this.counters()) {
      counter.lifeTotal.set(lifeTotal);
    }
  }

  reset() {
    for(const counter of this.counters()) {
      counter.resetLife();
    }
  }
}
