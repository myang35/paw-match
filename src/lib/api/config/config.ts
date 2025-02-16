import { dev } from '$app/environment';
import { config as devConfig } from './config.dev';
import { config as prodConfig } from './config.prod';

export const config = dev ? devConfig : prodConfig;
