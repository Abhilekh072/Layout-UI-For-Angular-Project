
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, AfterViewInit {

  @ViewChild("sliderRef")
  sliderRef!: ElementRef<HTMLElement>;

  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  slider!: KeenSliderInstance; 
  constructor() { }

  user : any ;
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
      })
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ]
    })
  }
}
