import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="counter-container" [ngClass]="{ 'upside-down': upsideDown() }">
      <div class="counter-wrapper">
        <div class="left-tap-zone" (click)="decrementLife()"></div>
        <div class="life-display" [ngClass]="'color-' + colorScheme()">
          {{ lifeTotal() }}
        </div>
        <div class="right-tap-zone" (click)="incrementLife()"></div>
      </div>
    </div>
  `,
  styles: [`
    .counter-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;

      &.upside-down {
        transform: rotate(180deg);
      }
    }

    .counter-wrapper {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      gap: 0;
    }

    .left-tap-zone,
    .right-tap-zone {
      cursor: pointer;
      user-select: none;
      transition: opacity 0.2s ease;

      &:active {
        opacity: 0.7;
      }
    }

    .life-display {
      font-size: 120px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      transition: all 0.2s ease;

      &.color-blue {
        background: linear-gradient(135deg, #0047AB 0%, #4169E1 100%);
        color: white;
        box-shadow: 0 8px 32px rgba(0, 71, 171, 0.4);
      }

      &.color-red {
        background: linear-gradient(135deg, #DC143C 0%, #FF6347 100%);
        color: white;
        box-shadow: 0 8px 32px rgba(220, 20, 60, 0.4);
      }

      &.color-green {
        background: linear-gradient(135deg, #228B22 0%, #32CD32 100%);
        color: white;
        box-shadow: 0 8px 32px rgba(34, 139, 34, 0.4);
      }

      &.color-black {
        background: linear-gradient(135deg, #1a1a1a 0%, #404040 100%);
        color: white;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
      }
    }
  `]
})
export class CounterComponent {
  lifeTotal = signal(20);
  upsideDown = input(false);
  colorScheme = input<'blue' | 'red' | 'green' | 'black'>('blue');

  incrementLife() {
    this.lifeTotal.update(current => current + 1);
  }

  decrementLife() {
    this.lifeTotal.update(current => current - 1);
  }

  resetLife() {
    this.lifeTotal.set(20);
  }
}
