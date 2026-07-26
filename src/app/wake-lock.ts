import { Service } from '@angular/core';

@Service()
export class WakeLock {
  private wakeLock: any = null; // Type as 'any' or install @types/dom-screen-wake-lock

  constructor() {
    // Re-acquire the lock if the user leaves the tab and comes back
    document.addEventListener('visibilitychange', async () => {
      if (this.wakeLock !== null && document.visibilityState === 'visible') {
        await this.requestWakeLock();
      }
    });
    this.requestWakeLock();
  }

  async requestWakeLock() {
    // Check if the browser supports the API
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await (navigator as any).wakeLock.request('screen');
        
        this.wakeLock.addEventListener('release', () => {
          console.log('Screen Wake Lock was released');
        });
        
        console.log('Screen Wake Lock is active');
      } catch (err: any) {
        console.error(`Wake Lock error: ${err.name}, ${err.message}`);
      }
    } else {
      console.warn('Screen Wake Lock API not supported in this browser.');
    }
  }

  releaseWakeLock() {
    if (this.wakeLock !== null) {
      this.wakeLock.release();
      this.wakeLock = null;
    }
  }
}