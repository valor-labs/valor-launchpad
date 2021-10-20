import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { IntroductionComponent } from './introduction/introduction.component';
import { DocumentationComponent } from './documentation.component';
import { InstallationComponent } from './installation/installation.component';
import { CustomizationComponent } from './customization/customization.component';
import { PluginsComponent } from './plugins/plugins.component';
import { ChangelogComponent } from './changelog/changelog.component';

@NgModule({
  declarations: [
    IntroductionComponent,
    DocumentationComponent,
    InstallationComponent,
    CustomizationComponent,
    PluginsComponent,
    ChangelogComponent,
  ],
  imports: [CommonModule, DocumentationRoutingModule],
})
export class DocumentationModule {}
