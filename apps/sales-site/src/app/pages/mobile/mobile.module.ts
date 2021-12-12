import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileHomeComponent } from './mobile-home/mobile-home.component';
import { MobileIntegrationComponent } from './mobile-integration/mobile-integration.component';
import { SectionOneComponent } from './mobile-home/section-one/section-one.component';
import { SectionTwoComponent } from './mobile-home/section-two/section-two.component';
import { SectionThreeComponent } from './mobile-home/section-three/section-three.component';
import { SectionFourComponent } from './mobile-home/section-four/section-four.component';
import { SectionFiveComponent } from './mobile-home/section-five/section-five.component';
import { SectionSixComponent } from './mobile-home/section-six/section-six.component';
import { SectionSevenComponent } from './mobile-home/section-seven/section-seven.component';
import { SectionEightComponent } from './mobile-home/section-eight/section-eight.component';
import { SectionNineComponent } from './mobile-home/section-nine/section-nine.component';
import { SectionTenComponent } from './mobile-home/section-ten/section-ten.component';
import { SectionTenOneComponent } from './mobile-home/section-ten-one/section-ten-one.component';
import { SectionTenTwoComponent } from './mobile-home/section-ten-two/section-ten-two.component';
import { SectionTenThreeComponent } from './mobile-home/section-ten-three/section-ten-three.component';
import { SectionTenFourComponent } from './mobile-home/section-ten-four/section-ten-four.component';
import { SectionTenFiveComponent } from './mobile-home/section-ten-five/section-ten-five.component';
import { SectionTenSixComponent } from './mobile-home/section-ten-six/section-ten-six.component';
import { PaymentComponent } from './mobile-integration/payment/payment.component';
import { StripeComponent } from './mobile-integration/stripe/stripe.component';


@NgModule({
  declarations: [
    MobileHomeComponent,
    MobileIntegrationComponent,
    SectionOneComponent,
    SectionTwoComponent,
    SectionThreeComponent,
    SectionFourComponent,
    SectionFiveComponent,
    SectionSixComponent,
    SectionSevenComponent,
    SectionEightComponent,
    SectionNineComponent,
    SectionTenComponent,
    SectionTenOneComponent,
    SectionTenTwoComponent,
    SectionTenThreeComponent,
    SectionTenFourComponent,
    SectionTenFiveComponent,
    SectionTenSixComponent,
    PaymentComponent,
    StripeComponent
  ],
  imports: [
    CommonModule,
    MobileRoutingModule
  ]
})
export class MobileModule { }
