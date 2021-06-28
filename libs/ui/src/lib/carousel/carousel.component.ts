import { Component, OnInit, OnChanges, Input, Output, ContentChildren, QueryList, AfterContentInit, EventEmitter, ElementRef, SimpleChanges } from '@angular/core'

import { CarouselItemComponent } from '../carousel-item/carousel-item.component'

@Component({
  selector: 'valor-launchpad-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterContentInit, OnChanges {

  constructor(private el: ElementRef) {}
  // show controls
  @Input() controls = true

  // show dots
  @Input() showDots = false

  // default index
  @Input() activeIndex = 0

  @Output() activeIndexChange = new EventEmitter<number>()

  @ContentChildren(CarouselItemComponent) carouselItem!: QueryList<CarouselItemComponent>

  indicators: Array<string> = []

  // 卡片容器
  private itemContainer
  // 卡片数量
  private itemCount;
  // 自动调度id
  private scheduledId
  // 自动调度id
  private order = 'next'
  private directionalClassName = 'carousel-item-next'
  private orderClassName = 'carousel-item-start'

  ngOnInit(): void {
    this.itemContainer = this.el.nativeElement.querySelector('.carousel-inner')
  }

  ngAfterContentInit():void {
    // console.log(this.carouselItem.length)
    this.itemCount = this.carouselItem.length
    // this.goTo(this.activeIndex + 1)
    this.initItem()
  }

  ngOnChanges(changes: SimpleChanges) {
    const { activeIndex } = changes
    console.log('change', changes, activeIndex)
    // this.autoScheduleTransition()
  }
  
  initItem() {
    const targetEl = this.el.nativeElement.querySelectorAll('.carousel-item')[this.activeIndex]
    targetEl.classList.add('active')
  }

  private autoScheduleTransition() {
    this.clearScheduledTransition()
    this.scheduledId = setInterval(() => {
      this.next()
    }, 3000)
  }

  // 清除自动轮播任务
  private clearScheduledTransition() {
    if (this.scheduledId) {
      clearInterval(this.scheduledId);
      this.scheduledId = null;
    }
  }

  handlePrev() {
    this.prev()
    // console.log(this.activeIndex - 1)
  }

  handleNext() {
    this.next()
    // console.log(this.activeIndex + 1)
  }

  // 向后切换
  next() {
    this.order = 'next'
    this.directionalClassName = 'carousel-item-next'
    this.orderClassName = 'carousel-item-start'
    this.goTo(this.activeIndex + 1)
  }
  // 向前切换
  prev() {
    this.order = 'prev'
    this.directionalClassName = 'carousel-item-prev'
    this.orderClassName = 'carousel-item-end'
    this.goTo(this.activeIndex + 1)
  }

  goTo(index) {
    if (index === this.activeIndex) {
      return
    }
    const targetEl = this.el.nativeElement.querySelectorAll('.carousel-item')[this.activeIndex]
    if (this.order === 'prev') {
      console.log(this.activeIndex, this.orderClassName, targetEl)
    }

    if (this.order === 'next') {
      const nextIndex = index > this.itemCount - 1 ? 0 : index 
      const nextEl = this.el.nativeElement.querySelectorAll('.carousel-item')[nextIndex]
      targetEl.classList.add(this.orderClassName)
      nextEl.classList.add(this.directionalClassName)
      nextEl.classList.add(this.orderClassName)
      setTimeout(() => {
        nextEl.classList.remove(this.directionalClassName)
        nextEl.classList.remove(this.orderClassName)
        targetEl.classList.remove('active')
        targetEl.classList.remove(this.orderClassName)
        nextEl.classList.add('active')
      }, 500)

      this.activeIndex = nextIndex
      // targetEl.addEventListener('transitionend', event =>  {
      //   nextEl.classList.remove(this.directionalClassName)
      //   nextEl.classList.remove(this.orderClassName)
      //   targetEl.classList.remove(this.orderClassName)
      //   targetEl.classList.remove('active')
      //   nextEl.classList.add('active')
      //   console.log(event)
      // })
              
      // this.activeIndex = nextIndex
    }
    // if ( index < 0 && this.activeIndex === 0) {
    //   console.log(index)
    //   this.activeIndex = this.itemCount - 1
    // } else if (index >= this.itemCount && this.activeIndex === this.itemCount - 1) {
    //   this.activeIndex = 0
    // } else {
    //   const targetEl = this.el.nativeElement.querySelectorAll('.carousel-item')[this.activeIndex]
    //   const nextIndex = this.activeIndex < this.itemCount - 1 ? this.activeIndex + 1 : 0
    //   const nextEl = this.el.nativeElement.querySelectorAll('.carousel-item')[nextIndex]
    //   // // console.log(this.el.nativeElement.querySelectorAll('.carousel-item'))
    //   console.log(this.activeIndex, nextIndex, 'middle')
    //   targetEl.classList.add(this.orderClassName)
    //   nextEl.classList.add(this.directionalClassName)
    //   nextEl.classList.add(this.orderClassName)
    //   setTimeout(() => {
    //     nextEl.classList.remove(this.directionalClassName)
    //     nextEl.classList.remove(this.orderClassName)
    //     targetEl.classList.remove('active')
    //     targetEl.classList.remove(this.orderClassName)

    //     nextEl.classList.add('active')
    //     this.activeIndex = index
    //   }, 500)
    //   // this.activeIndex = index < 0 ? 0 : index > this.itemCount - 1 ? this.itemCount - 1 : index
    // }
    // const targetEl = this.el.nativeElement.querySelectorAll('valor-launchpad-carousel-item')

    // if (index < 0 && this.activeIndex === 0) {
    //   // 第一个卡片向前切换
    //   this.activeIndex = this.itemCount - 1
    //   const targetEl = this.el.nativeElement.querySelectorAll('valor-launchpad-carousel-item')
    //   // console.log(targetEl, 'first')
    // } else if (index >= this.itemCount && this.activeIndex === this.itemCount - 1) {
    //   this.activeIndex = 0
    //   const targetEl = this.el.nativeElement.querySelectorAll('valor-launchpad-carousel-item')
    //   // console.log(targetEl, 'last')
    // } else {
    // //   1 1 0 3 "middle"
    // // carousel.component.ts:97 2 2 0 3 "middle"
    // // carousel.component.ts:97 1 1 0 3 "middle"
    //   this.activeIndex = index < 0 ? 0 : index > this.itemCount - 1 ? this.itemCount - 1 : index
    //   const targetEl = this.el.nativeElement.querySelectorAll('.carousel-item')[this.activeIndex]
    //   // const nextIndex = index < 0 ? this.itemCount - 1 : index > this.itemCount - 1 ? 0 : index + 1 
    //   const nextIndex = this.activeIndex < this.itemCount - 1 ? this.activeIndex + 1 : 0
    //   const nextEl = this.el.nativeElement.querySelectorAll('.carousel-item')[nextIndex]
    //   // console.log(this.el.nativeElement.querySelectorAll('.carousel-item'))
    //   console.log(this.activeIndex, index, nextIndex, this.itemCount, 'middle')
    //   targetEl.classList.add('carousel-item-start')
    //   nextEl.classList.add('carousel-item-next')
    //   nextEl.classList.add('carousel-item-start')
    //   setTimeout(() => {
    //     targetEl.classList.remove('active')
    //     nextEl.classList.remove('carousel-item-next')
    //     nextEl.classList.remove('carousel-item-start')
    //     nextEl.classList.add('active')
    //     targetEl.classList.remove('carousel-item-start')
    //   }, 500)
    // }

    // const targetEl = this.el.nativeElement.querySelectorAll('.carousel-item')[this.activeIndex]

    // const nextEl = this.el.nativeElement.querySelectorAll('.carousel-item')[index]

    // targetEl.classList.add('carousel-item-start')
    // nextEl.classList.add('carousel-item-next carousel-item-start')
    // this.activeIndex = index < 0 ? 0 : index > this.itemCount - 1 ? this.itemCount - 1 : index
    // const targetEl = this.el.nativeElement.querySelectorAll('.carousel-item')[this.activeIndex]
    // // // const nextIndex = index < 0 ? this.itemCount - 1 : index > this.itemCount - 1 ? 0 : index + 1 
    // const nextIndex = this.activeIndex < this.itemCount - 1 ? this.activeIndex + 1 : 0
    // const nextEl = this.el.nativeElement.querySelectorAll('.carousel-item')[nextIndex]
    // // // console.log(this.el.nativeElement.querySelectorAll('.carousel-item'))
    // console.log(this.activeIndex, nextIndex, 'middle')
    // targetEl.classList.add('carousel-item-end')
    // nextEl.classList.add('carousel-item-prev')
    // nextEl.classList.add('carousel-item-end')
    // setTimeout(() => {
    //   nextEl.classList.remove('carousel-item-prev')
    //   nextEl.classList.remove('carousel-item-end')
    //   targetEl.classList.remove('active')
    //   targetEl.classList.remove('carousel-item-end')

    //   nextEl.classList.add('active')

    // }, 500)
    this.activeIndexChange.emit(this.activeIndex)
    
  }

}
