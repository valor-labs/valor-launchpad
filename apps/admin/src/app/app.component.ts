import {Component, Inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@valor-launchpad/api-interfaces';
import {ENV_CONFIG, EnvironmentConfig} from './core/http/environment-config.interface';

@Component({
  selector: 'valor-launchpad-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>(this.config.environment.apiBase +'/api/hello');
  constructor(@Inject(ENV_CONFIG) private config: EnvironmentConfig, private http: HttpClient) {}
}
