import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.blockmergerush.game',
  appName: 'Block Merge Rush',
  webDir: 'www',
  android: {
    allowMixedContent: false
  }
};

export default config;
