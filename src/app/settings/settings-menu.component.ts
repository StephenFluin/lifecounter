import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="settings-menu">
      <button 
        class="menu-toggle"
        (click)="toggleMenu()"
        [attr.aria-expanded]="isOpen()"
        aria-label="Settings menu">
        ⚙️
      </button>

      @if (isOpen()) {
        <div class="menu-panel">
          <button class="menu-item reset-button" (click)="onResetAll()">
            Reset Both Counters
          </button>
          <button class="menu-item" (click)="onSetLife()">
            Set Custom Life Total
          </button>
          <button class="menu-item" (click)="toggleMenu()">
            Close
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .settings-menu {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 1000;
    }

    .menu-toggle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-size: 28px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
      transition: all 0.3s ease;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 28px rgba(102, 126, 234, 0.6);
      }

      &:active {
        transform: scale(0.95);
      }
    }

    .menu-panel {
      position: absolute;
      bottom: 80px;
      right: 0;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      min-width: 200px;
      animation: slideUp 0.3s ease;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .menu-item {
      display: block;
      width: 100%;
      padding: 16px 20px;
      border: none;
      background: white;
      color: #333;
      text-align: left;
      cursor: pointer;
      font-size: 16px;
      font-weight: 500;
      transition: all 0.2s ease;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: #f5f5f5;
      }

      &.reset-button {
        color: #dc143c;
        font-weight: 600;
      }

      &.reset-button:hover {
        background: #ffe6e6;
      }
    }
  `]
})
export class SettingsMenuComponent {
  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update(val => !val);
  }

  onResetAll() {
    // This will be handled by parent component
    const event = new CustomEvent('resetAll');
    window.dispatchEvent(event);
    this.toggleMenu();
  }

  onSetLife() {
    const lifeTotal = prompt('Enter new life total:', '20');
    if (lifeTotal !== null && !isNaN(Number(lifeTotal))) {
      const event = new CustomEvent('setLife', { 
        detail: { lifeTotal: Number(lifeTotal) } 
      });
      window.dispatchEvent(event);
    }
    this.toggleMenu();
  }
}
