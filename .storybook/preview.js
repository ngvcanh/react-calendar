import { themes } from '@storybook/theming';
import '!style-loader!css-loader!sass-loader!./../src/scss/index.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    dark: { ...themes.dark, appBg: 'black' },
    light: { ...themes.normal, appBg: 'red' },
    current: 'dark'
  }
}