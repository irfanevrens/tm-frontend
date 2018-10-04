import * as React from 'react';
import './popover.css';

export interface IState {
  isPopoverActive?: boolean;
}
export interface IProps {
  popoverTypeClass: string;
  popoverTypeId: string;
  dropdownIcon?: string;
  dropdownText?: any;
  dropdownClass?: string;
  dropdownWrapperClass?: string;
  isPopoverActive?: boolean,
  children?: any;
}
export default class IPopover extends React.Component<IProps, IState> {
  private node: any;
  constructor(props: any) {
    super(props);
    this.state = {
      isPopoverActive: this.props.isPopoverActive || false
    };
  }
  public componentDidMount() {
    document.addEventListener('mousedown', this.handleOutsideClick);
  }

  public componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  public render() {

    const isPopoverActive = this.state.isPopoverActive ? true : this.props.isPopoverActive;

    return (
      <div
        ref={node => {
          this.node = node;
        }}
        className={`dropdown toolbar-item ${
          this.props.dropdownWrapperClass ? this.props.dropdownWrapperClass : ''
        } ${isPopoverActive ? 'active' : ''}`}
      >
        <span className="popover-trigger">
          <span
            onClick={this.onPopoverActive}
            className={`dropdown-icon ${this.props.dropdownClass ? this.props.dropdownClass : ''}`}
          >
            {this.props.dropdownIcon ? (
              <i className={this.props.dropdownIcon} />
            ) : (
              this.props.dropdownText
            )}
          </span>
          <span onClick={this.onPopoverActive} className="arrow" />
        </span>
        <div
          className={`popover ${this.props.popoverTypeClass} ${isPopoverActive ? ' show' : ''}`}
          id={this.props.popoverTypeId}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.node.contains(e.target)) {
      if (!this.state.isPopoverActive) {
        document.addEventListener('click', this.handleOutsideClick, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClick, false);
        this.setState({ isPopoverActive: false });
      }
    }
  };

  private onPopoverActive = () => {
    this.setState(prevState => ({
      isPopoverActive: !prevState.isPopoverActive
    }));
  };
}
