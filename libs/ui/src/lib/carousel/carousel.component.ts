import { Component, OnInit, Input, Output, AfterContentInit, EventEmitter, ElementRef, Renderer2, OnDestroy } from '@angular/core'

@Component({
  selector: 'valor-launchpad-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, AfterContentInit, OnDestroy {

  static ORDER_NEXT = 'next'
  static ORDER_PREV = 'prev'
  static CLASS_NAME_START = 'carousel-item-start'
  static CLASS_NAME_ACTIVE = 'active'
  static CLASS_NAME_END = 'carousel-item-end'
  static CLASS_NAME_NEXT = 'carousel-item-next'
  static CLASS_NAME_PREV = 'carousel-item-prev'

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() speed = 3000

  // show controls
  @Input() controls = false

  // show dots
  @Input() showDots = false

  // show fade
  @Input() isFade = false

  // default index
  @Input() activeIndex = 0

  // emit activeIndex
  @Output() activeIndexChange = new EventEmitter<number>()

  // container
  private itemContainer: HTMLCollection
  // 自动调度id
  private scheduledId = null

  private isSliding = false
  private pause = false


  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    //
  }

  ngAfterContentInit():void {
    this.itemContainer = this.el.nativeElement.querySelectorAll('.carousel-item')
    this.initItem()
    this.autoScheduleTransition()
  }

  private initItem() {
    const targetEl = this.itemContainer[this.activeIndex]
    targetEl.classList.add(CarouselComponent.CLASS_NAME_ACTIVE)
  }

  private autoScheduleTransition() {
    this.clearScheduledTransition()

    if (!this.pause && !this.isSliding) {
      this.scheduledId = setTimeout(() => {
        this.handleNext()
      }, this.speed)
    }
  }

  // 清除自动轮播任务
  private clearScheduledTransition() {
    if (this.scheduledId) {
      clearInterval(this.scheduledId);
      this.scheduledId = null;
    }
  }

  handleMouseEnter() {
    this.pause = true
    this.clearScheduledTransition()
  }

  handleMouseLeave() {
    this.pause = false
    this.autoScheduleTransition()
  }

  handlePrev() {
    this.slide(CarouselComponent.ORDER_PREV)
  }

  handleNext() {
    this.slide(CarouselComponent.ORDER_NEXT)
  }

  private reflow(element) {
    return element.offsetHeight
  }

  goTo(index) {
    if (index > this.itemContainer.length - 1 || index < 0) {
      return
    }

    if (this.isSliding) {
      return
    }

    if(index === this.activeIndex) {
      return
    }

    const order = index > this.activeIndex ? CarouselComponent.ORDER_NEXT : CarouselComponent.ORDER_PREV
    
    this.slide(order, this.itemContainer[index])
  }

  private slide(order, element?: Element) {

    const isNext = order === CarouselComponent.ORDER_NEXT
    const activeElement = this.itemContainer[this.activeIndex]

    const nextElement = element || this.getItemByOrder(order, activeElement)

    const nextElementIndex = this.getItemIndex(nextElement)

    const directionalClassName = isNext ? CarouselComponent.CLASS_NAME_START : CarouselComponent.CLASS_NAME_END

    const orderClassName = isNext ? CarouselComponent.CLASS_NAME_NEXT : CarouselComponent.CLASS_NAME_PREV

    if (nextElement && nextElement.classList.contains(CarouselComponent.CLASS_NAME_ACTIVE)) {
      this.isSliding = false
      return
    }

    if (this.isSliding) {
      return
    }

    if (!activeElement || !nextElement) {
      return
    }
    this.isSliding = true

    nextElement.classList.add(orderClassName)

    this.reflow(nextElement)

    activeElement.classList.add(directionalClassName)
    nextElement.classList.add(directionalClassName)

    this.activeIndex = nextElementIndex
    this.setIndicatorElementAttr()
    this.activeIndexChange.emit(this.activeIndex)
    
    const completeCallBack = () => {
      nextElement.classList.remove(directionalClassName, orderClassName)
      nextElement.classList.add(CarouselComponent.CLASS_NAME_ACTIVE)

      activeElement.classList.remove(CarouselComponent.CLASS_NAME_ACTIVE, orderClassName, directionalClassName)

      this.isSliding = false
      this.autoScheduleTransition()
    }

    // nextElement.removeEventListener('transitionend', completeCallBack)

    // nextElement.addEventListener('transitionend', completeCallBack)
    setTimeout(() => {
      completeCallBack()
    }, 600)
    
  }

  private getItemIndex(element: Element) {
    return Array.from(this.itemContainer).indexOf(element)
  }

  private getItemByOrder(order, activeElement) {
    const isNext = order === CarouselComponent.ORDER_NEXT
    return this.getNextActiveElement(this.itemContainer, activeElement, isNext, true)
  }

  private getNextActiveElement(list: HTMLCollection, activeElement, shouldGetNext: boolean, isCycleAllowed:boolean) {
    let index = Array.from(list).indexOf(activeElement)

    if (index === -1) {
      return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0]
    }
    
    const listLength = list.length
    
    index += shouldGetNext ? 1 : -1
    
    if (isCycleAllowed) {
      index = (index + listLength) % listLength
    }
    return list[Math.max(0, Math.min(index, listLength - 1))]
  }

  private setIndicatorElementAttr() {
    if (this.showDots) {
      const parentNode: HTMLElement = this.el.nativeElement.querySelector('.carousel-indicators')
      const indicatorsElement = parentNode.getElementsByTagName('li')
      Array.from(indicatorsElement).map(indicator => {
        this.renderer.removeAttribute(indicator, 'aria-current')
      })
      this.renderer.setAttribute(indicatorsElement[this.activeIndex], 'aria-current', 'true')
    }
  }

  ngOnDestroy() {
    this.clearScheduledTransition()
  }

}
