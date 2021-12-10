import { ThemeService } from './theme.service';

export const themeInitializer = (themeService: ThemeService) => {
  return () => {
    themeService.getStoredConfig('theme', true);
    // themeService.getStoredConfig('layout', true);
  };
};
