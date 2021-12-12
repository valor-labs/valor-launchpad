import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'valor-launchpad-section-ten-four',
  templateUrl: './section-ten-four.component.html',
  styleUrls: ['./section-ten-four.component.scss']
})
export class SectionTenFourComponent { 
  @Input() theme = 'dark';
}
