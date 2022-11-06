import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { fromEvent, Observable, Subscription } from 'rxjs';
// import { Observable, Subscription } from 'rxjs-compat';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Practice1';

  onlineEvent: Observable<Event> | undefined;
  offlineEvent: Observable<Event> | undefined;
  showButton = false;
  subscriptions: Subscription[] = [];
  offline: boolean = false;
  online: boolean = false;
  deferredPrompt: any;
  idleState = "NOT_STARTED";
  countdown: any ;
  lastPing: any;

  constructor(private router: Router,private swUpdate: SwUpdate,private idle: Idle, keepalive: Keepalive, cd: ChangeDetectorRef){
    idle.setIdle(1800); // 1800
    idle.setTimeout(30); //30
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // do something when the user becomes idle
    idle.onIdleStart.subscribe(() => {
      this.idleState = "IDLE";
      this.online=false
      this.offline=false;
    });

    // do something when the user is no longer idle
    idle.onIdleEnd.subscribe(() => {
      this.idleState = "NOT_IDLE";
      this.countdown = null;
      this.handleNetworkChange();
      cd.detectChanges();
    });

    // do something when the user has timed out
    idle.onTimeout.subscribe(() => {
      this.countdown = null;
    });

    
    idle.onTimeoutWarning.subscribe(seconds => this.countdown = seconds);
    
    // will ping at this interval while not idle, in seconds
    keepalive.interval(15);
    
    
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void; }) {
    e.preventDefault();
    this.deferredPrompt = e;
    this.showButton = true;
  }
  @HostListener('window:load', ['$event'])
  handleNetworkChange() {
    if (navigator.onLine) {
      this.offline = false;
      this.online=true;
    
    } else {
      this.offline = true;
      this.online=false;
    }
  }
  reset() {
    this.idle.watch();
    this.idleState = "NOT_IDLE";
    this.countdown = null;
    this.lastPing = null;
  }
  ngOnInit(){
    this.reset();
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');
    this.subscriptions.push(this.onlineEvent.subscribe(e => {
      this.offline = false;
      this.online=true;
      Swal.fire({ icon: 'success', text: 'Back online' });
      window.location.reload();
    }));

    this.subscriptions.push(this.offlineEvent.subscribe(e => {
      this.offline = true;
      this.online=false;
      Swal.fire({ icon: 'error', text: 'No Internet' });
    }));
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }
  addToHomeScreen() {
    this.showButton = false;
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice
      .then(() => {
        this.deferredPrompt = null;
      });
  }
}
