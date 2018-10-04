import * as React from 'react';
import './popover.css';

export interface IProps {
  popoverTypeClass: string
  popoverTypeId: string
  dropdownIcon?: string
  dropdownText?: any
  dropdownClass?: string
  dropdownWrapperClass?: string
  isPopoverActive?: boolean
  children?: any
  onToggle?: (isActive: boolean|undefined) => void
}
export default class IPopover extends React.Component<IProps, any> {
  private node: any;
  constructor(props: any) {
    super(props)
  }
  public componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick)
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick)
  }

  public render() {

    return (
      <div
        ref={node => {
          this.node = node
        }}
        className={`dropdown toolbar-item ${
          this.props.dropdownWrapperClass ? this.props.dropdownWrapperClass : ''
        } ${this.props.isPopoverActive ? 'active' : ''}`}
      >
        <span className="popover-trigger">
          <span
            onClick={this.onToggle}
            className={`dropdown-icon ${this.props.dropdownClass ? this.props.dropdownClass : ''}`}
          >
            {this.props.dropdownIcon ? (
              <i className={this.props.dropdownIcon} />
            ) : (
              this.props.dropdownText
            )}
          </span>
          <span onClick={this.onToggle} className="arrow" />
        </span>
        <div
          className={`popover ${this.props.popoverTypeClass} ${this.props.isPopoverActive ? ' show' : ''}`}
          id={this.props.popoverTypeId}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.node.contains(e.target)) {
      if (!this.props.isPopoverActive) {
        document.addEventListener('click', this.handleOutsideClick, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.onToggle(false);
      }
    }
  };

  private onToggle = (isActive: boolean|any) => {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(isActive);
    }
  };
}
