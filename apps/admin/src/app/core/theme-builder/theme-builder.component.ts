import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { defaultProps, themeConfig, themeConfigKeys, themeType, ValorThemeService } from '../theme/valor-theme.service';

@Component({
  selector: 'valor-launchpad-theme-builder',
  templateUrl: './theme-builder.component.html',
  styleUrls: ['./theme-builder.component.scss'],
})
export class ThemeBuilderComponent implements OnInit, AfterViewInit {


  themeBuilderClass: { [key: string]: any };

  themeBuilderFg: FormGroup;

  isFirstRender = true;

  constructor(
    private fb: FormBuilder,
    private themeService: ValorThemeService
  ) {
    this.themeBuilderClass = {
      open: false
    };
  }

  ngOnInit(): void {
    this._buildFg();
    this._bindChangeEvent();
  }


  _buildFg(): void {
    this.themeBuilderFg = this.fb.group(
      {
        theme: this.fb.control(this.themeService.getStoredConfig('theme', false)),
        sidebarPosition: this.fb.control(this.themeService.getStoredConfig('sidebarPosition', false)),
        sidebarBehavior: this.fb.control(this.themeService.getStoredConfig('sidebarBehavior', false)),
        layout: this.fb.control(this.themeService.getStoredConfig('layout', false))
      }
    );
  }

  _bindChangeEvent(): void {
    this.themeBuilderFg.valueChanges.subscribe((configObj: themeConfig) => {
      Object.keys(configObj).forEach((key: themeConfigKeys) => {
        this.themeService.changeTheme(key, configObj[key]);
        this.themeService.setStoredConfig(key, configObj[key]);
      });
    });
  }

  ngAfterViewInit(): void {
    this._bindClickHiddenEvent();
  }

  onToggleThemeBuilder(): void {
    this.themeBuilderClass.open = !this.themeBuilderClass.open;
  }

  onCloseThemeBuilder(): void {
    this.themeBuilderClass.open = false;
  }

  private _bindClickHiddenEvent(): void {
    const settingsClassName = '.js-settings';
    const settingsElement = document.querySelector(settingsClassName);
    document.body.onclick = e => {
      if (!settingsElement.contains((e as any).target)) {
        settingsElement.classList.remove('open');
      }
    };
  }

}
