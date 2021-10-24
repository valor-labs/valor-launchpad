import { ValorThemeService } from './valor-theme.service';

export const themeInitializer = (valorThemeService: ValorThemeService) => {
  return () => {
    valorThemeService.getStoredConfig('theme', true);
    valorThemeService.getStoredConfig('sidebarPosition', true);
    valorThemeService.getStoredConfig('sidebarBehavior', true);
    valorThemeService.getStoredConfig('layout', true);
  };
};
