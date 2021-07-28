import { Component, ContentChild, Input } from '@angular/core'

import { TabContentDirective } from './tab-content.directive'
import { TabTitleDirective } from './tab-title.directive'

@Component({
  selector: 'valor-launchpad-tab',
  template: '',
  styleUrls: ['./tab.component.scss'],
  preserveWhitespaces: false
})
export class TabComponent {

  @Input() tabId?: string
  @Input() id: number | string
  @Input() title: string
  @Input() disabled = false

  @ContentChild(TabContentDirective) contentTpl: TabContentDirective
  @ContentChild(TabTitleDirective) titleTpl: TabTitleDirective
}
