import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangelogComponent } from './changelog/changelog.component';
import { CustomizationComponent } from './customization/customization.component';
import { DocumentationComponent } from './documentation.component';
import { InstallationComponent } from './installation/installation.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { PluginsComponent } from './plugins/plugins.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentationComponent,
    children: [
      {
        path: 'introduction',
        component: IntroductionComponent,
      },
      {
        path: 'installation',
        component: InstallationComponent,
      },
      {
        path: 'customization',
        component: CustomizationComponent,
      },
      {
        path: 'plugins',
        component: PluginsComponent,
      },
      {
        path: 'changelog',
        component: ChangelogComponent,
      },
      {
        path: '',
        redirectTo: 'introduction',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule {}
