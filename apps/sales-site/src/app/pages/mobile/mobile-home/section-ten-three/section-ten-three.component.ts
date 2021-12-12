import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'valor-launchpad-section-ten-three',
  templateUrl: './section-ten-three.component.html',
  styleUrls: ['./section-ten-three.component.scss']
})
export class SectionTenThreeComponent {
  plans = [{
    title: 'Free',
    beforeDiscount: '',
    subTitle: 'Start Plan',
    desc: 'For personal use',
  },
  {
    title: '#399',
    beforeDiscount: '$499',
    subTitle: 'Standard / Early Bird',
    desc: 'After launch',
  },
  {
    title: '#699',
    beforeDiscount: '$799',
    subTitle: 'Standard+',
    desc: 'Includes 6 months updates',
  },
  {
    title: '#999',
    beforeDiscount: '$1099',
    subTitle: 'Support',
    desc: 'Includes above and support slac...',
  },
  {
    title: '#1399',
    beforeDiscount: '$1499',
    subTitle: 'Cloud+',
    desc: 'Includes above and GitHub...',
  },
  {
    title: 'Multi Site License',
    beforeDiscount: '',
    subTitle: '',
    desc: '',
  },
  ]
}
