import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() isShowSidebar = new EventEmitter<boolean>();
  @Input() isMenuOpened: boolean= false;
  
  constructor() { }

  ngOnInit(): void {
  }

  public openMenu(){
    this.isMenuOpened = !this.isMenuOpened;
    this.isShowSidebar.emit(this.isMenuOpened);
  }

}
