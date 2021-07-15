import { Component, Input, ContentChildren, QueryList, Output, EventEmitter,  AfterContentInit } from '@angular/core'

import { Observable } from 'rxjs'

import { TabComponent } from '../tab/tab.component'
@Component({
  selector: 'valor-launchpad-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  preserveWhitespaces: false
})

export class TabsComponent implements AfterContentInit {
  static ID_SEED = 0
  
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>

  @Input() type = 'tabs'
  @Input() activeTab: number | string
  @Input() showContent = true
  
  @Input() beforeChange: (value) => boolean | Promise<boolean> | Observable<boolean>
  @Input() reactivable = false

  @Output() activeTabChange = new EventEmitter<number | string>()

  id
  constructor() {
    this.id = 'tabs' + TabsComponent.ID_SEED++;
  }
  
  ngAfterContentInit() {
    if (this.activeTab === undefined && this.tabs.length > 0 && this.tabs.first) {
      this.select(this.tabs.first.id)
    }
  }

  canChange(currentTab: number | string) {
    let changeResult = Promise.resolve(true)

    if (this.beforeChange) {
      const result: any = this.beforeChange(currentTab)
      if (typeof result !== 'undefined') {
        if (result.then) {
          changeResult = result
        } else if (result.subscribe) {
          changeResult = (result as Observable<boolean>).toPromise()
        } else {
          changeResult = Promise.resolve(result)
        }
      }
    }

    return changeResult
  }

  select(id: number | string) {
    if (this.reactivable || this.activeTab === id) {
      return
    }

    this.canChange(id).then(change => {
      if (!change) {
        return
      }

      const tab = this.tabs.find(item => item.id === id)
      if (tab && !tab.disabled) {
        this.activeTab = id
      }

      this.activeTabChange.emit(id)
    })

  }

}
