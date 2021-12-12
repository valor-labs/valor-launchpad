import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsOfServiceComponent } from './terms-of-service.component';

const routes: Routes = [{ path: '', component: TermsOfServiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsOfServiceRoutingModule {}
