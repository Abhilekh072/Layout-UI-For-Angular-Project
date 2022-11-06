import {ChangeDetectorRef, Component, OnInit, HostListener, ViewChild, OnDestroy } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav! : MatSidenav;
  public isShowSidebar : boolean = false; 
  public mobileQuery : MediaQueryList;
  private mobileQueryListner: ()=> void;

  constructor(cdRef : ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 960px)');
    this.mobileQueryListner = () => cdRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListner);
    this.isShowSidebar = !this.mobileQuery.matches;
   }

  @HostListener('window:resize', ['$event'])
  onResize(event : any){
    console.log(event);
    if(event.target.innerWidth < 960){
      this.isShowSidebar = false
    }else{
      this.isShowSidebar = true;
    }
  }
  open(el : any){
    console.log(el);
    this.isShowSidebar = el;
    if(this.mobileQuery.matches){
      this.sidenav.toggle();
    }
    else{
      this.sidenav.open();
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.mobileQuery.removeListener(this.mobileQueryListner);
      this.sidenav.close();
  }
  over(){
    // console.log('hover');
    if (!this.isShowSidebar){
      this.isShowSidebar = true;
      if(this.sidenav.mode == 'side'){
        this.sidenav.mode = 'over';
      }
    }
  }
  out(){
    console.log("out");
    console.log(this.isShowSidebar);
    if (!this.mobileQuery.matches){
      this.sidenav.mode = 'side';
    }
    if (this.sidenav.mode == 'over'){
      this.isShowSidebar = false;
    }
  }
}
