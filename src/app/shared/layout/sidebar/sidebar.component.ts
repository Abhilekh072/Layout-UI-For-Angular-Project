import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import MENUS from '../../../../assets/Menu.json'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  mainmenu : any = [];
  @Output() sidenav : EventEmitter<any> = new EventEmitter();
  @Input() open : boolean= false;
  o : boolean = this.open;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.open);
    this.mainmenu = MENUS[4];
    
  }
  toggleSidebar(){
    if (window.innerWidth < 960){
      this.sidenav.emit();
    }
  }
  abc(){
    console.log(this.o);
  }
}