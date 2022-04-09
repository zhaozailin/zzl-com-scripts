import { configure } from '@storybook/react';
import { setOptions } from "@storybook/addon-options";

import generateStories from './generateStories';

import stories from './stories';

function loadStories() {
  stories.forEach((item) => {
    if (item.name) {
      generateStories(item);
    }
  });
}

configure(loadStories, module);

setOptions({
    showAddonPanel: false,
    name: 'react-best-table',
    sidebarAnimations: true
});
