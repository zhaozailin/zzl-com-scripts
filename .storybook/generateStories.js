import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from 'zzl-wix-storybook-utils/Markdown';
import CodeExample from 'zzl-wix-storybook-utils/CodeExample';
import '../../dpl-react/dist/dpl.css';
import {Checkbox, Radio, Dropdown, Pagination, ConfigProvider} from '../../dpl-react';
import { configDependentComponents } from '../../../src/index';
const pkg = require('../../../package.json');

configDependentComponents({
  Checkbox,
  Radio,
  Dropdown,
  Pagination,
  ConfigProvider,
});

export default (story) => {
  let { name, title, list } = story;
  title = title.split(' ')[0];
  const stories = storiesOf(title, module);
  const README = require('../../../README.md');

  stories.add(`README`, () =>
    React.createElement(
      Markdown,{source: README}
    )
  );

  list.forEach((item) => {
    let fullName, zhName;
    if (Array.isArray(item)) {
      fullName = item[0];
      zhName = item[1];
    } else {
      fullName = item;
    }
    const flag = fullName.indexOf("|") !== -1;
    let codeName = flag ? fullName.slice(0, -1) : fullName;
    let newTitle = `${title}-${codeName}`;
    if (zhName) {
      newTitle = `${title}-${zhName}`;
    }

    let raw = require(`!raw-loader!../../../src/examples/${codeName}`);
    let strIdx = raw.indexOf('\'..\'');
    if (strIdx === -1) {
      strIdx = raw.indexOf('\"..\"');
    }
    raw = raw.substring(0, strIdx) + '\'' + pkg.name + '\'' + raw.substring(strIdx + 5);
    const Code = require(`../../../src/examples/${codeName}`).default;

    let info;
    if (flag) {
      info = require(`../../../src/${codeName}.md`);
    }

    stories.add(newTitle, () =>
      React.createElement(
        CodeExample,{title: newTitle, code: raw}, React.createElement(Code,{})
      )
    );
  })
}
