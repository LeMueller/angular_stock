import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit, OnChanges {

  @Input()
  rating: number = 0;
  
  @Input()
  readOnly: boolean = true;

  stars: boolean [];

  @Output()
  ratingChange: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.drawStars();
  }

  clickStar(index: number) {
    if(!this.readOnly) {
      this.rating = index + 1;

      this.ratingChange.emit(this.rating);
    }
  }

  drawStars() {
    this.stars = [];
      for (let i = 1; i <= 5; i++) {
        this.stars.push(i > this.rating);
      }
  }

}
