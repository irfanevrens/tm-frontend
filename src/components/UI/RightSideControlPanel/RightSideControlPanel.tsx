import * as React from 'react';
import './rightsidecontrolpanel.css';
import Tabs from './Tabs';

export default class RightSideControlPanel extends React.PureComponent<any, any> {
  public render() {
    return (
      <Tabs>
        <div data-icon="icon-folder" title="TEMPLATE" tabIndex={0}>
          TEMPLATE
        </div>
        <div data-icon="icon-view_quilt" title="LAYOUT" tabIndex={1}>
          LAYOUT
        </div>
        <div data-icon="icon-side_content" title="CONTENT" tabIndex={2}>
          CONTENT
        </div>
        <div data-icon="icon-settings" title="SETTINGS" tabIndex={3}>
          SETTINGS
        </div>
      </Tabs>
    );
  }
}
