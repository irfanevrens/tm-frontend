import * as React from 'react';
import { Header, Tab, Tabs } from '../../../components';
import { IFolderStore, ITemplate } from '../../../models';
import HttpProvider from '../../../utils/http.provider';
import FirstTab from './components/FirstTab';
import SecondTab from './components/SecondTab';
import ThirdTab from './components/ThirdTab';
import Welcome from './components/Welcome';
import './css/newTemplate.css';

export interface IProps {
  template: ITemplate,
  templateFolders : IFolderStore,
  changeTab?: (param: number) => void,
  initBlankTemplate?: () => void,
  addNotify?: (title:string, message:string, color:string) => void
}

interface IState {
  activeTab: number
}

export default class NewTemplate extends React.PureComponent<IProps, IState>{

  constructor(props: IProps) {
    super(props);
    this.state = {
      activeTab: -1
    }

    this.onTabClicked = this.onTabClicked.bind(this);
    this.onSaveTemplate = this.onSaveTemplate.bind(this);
  }

  public componentWillMount() {
    if (this.props.initBlankTemplate) {
      this.props.initBlankTemplate();
    }
  }

  public render() {
    return (
      <div>
        <Header />
        <div className="container main">
          {this.state.activeTab < 0 ? (
            <Welcome onButtonClick={this.onTabClicked} />
          ) : (
              <Tabs
                activeTab={this.state.activeTab}
                onTabClicked={this.onTabClicked}
              >
                <Tab header="Step 1" className="first-tab text-center">
                  <FirstTab onButtonClicked={this.onTabClicked} />
                </Tab>
                <Tab header="Step 2" className="second-tab">
                  <SecondTab onChangeTab={this.onTabClicked} />
                </Tab>
                <Tab header="Step 3" className="folder-tab">
                  <ThirdTab onChangeTab={this.onTabClicked} saveTemplate={this.onSaveTemplate}/>
                </Tab>
              </Tabs>
            )}
        </div>
      </div>
    );
  }

  private onTabClicked(index: number) {
    this.setState({
      activeTab: index
    })
  }

  private onSaveTemplate(){
    const templateState = this.props.template;
    const selectedFolder = this.props.templateFolders.foldersTree.selectedFolder;
    
    if(!selectedFolder){
      return;
    }

    const templateModel = {
      name : templateState.name,
      productNumberOption : templateState.productNumberOption,
      languages : templateState.languages,
      primaryLanguage : templateState.primaryLanguage,
      folderId : selectedFolder._id
    }
    HttpProvider.post('/templates', templateModel).then(res => {
      if(res.status){
        console.log("res", res);
        // TODO: Redirect to edit template page!
      }else{
        if(res.message.indexOf('duplicate key error') >= 0 && this.props.addNotify){
          this.props.addNotify('Change Template Name or Selected Folder', 'You already have the same template name in selected folder!', 'error')
        }
      }
    })
  }
}
