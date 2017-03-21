/*
 * Copyright 2015 Alexander Pustovalov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { modelSelector } from './selectors.js';
import { containerActions } from './actions.js';

import {
    Desk,
    PageOptionsModal,
    ComponentOptionsModal,
    QuickAppendModal,
    SaveDefaultModelModal
} from 'modules/workspace';
import {Generator} from 'modules/generator';
import SignInModal from 'modules/app/containers/SignInModal';
import ProxySetupModal from 'modules/app/containers/ProxySetupModal';
import ConfirmationModal from 'modules/app/containers/ConfirmationModal';
import InformationModal from 'modules/app/containers/InformationModal';

class Container extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getProjectStatus();
    }

    render() {

        const { componentModel: {packageConfig, workspaceMode} } = this.props;

        let content = null;
        if(workspaceMode === 'desk') {
            content = (
                <div style={{overflow: 'hidden', width: '100%', height: '100%'}}>
                    <div ref='appBody' style={{position: 'absolute', top: '0px', left: '0px', right: '0px', bottom: '0px'}}>
                        <Desk />
                        <PageOptionsModal />
                        <ComponentOptionsModal />
                        <SignInModal />
                        <ProxySetupModal />
                        <QuickAppendModal />
                        <SaveDefaultModelModal />
                        <ConfirmationModal />
                        <InformationModal />
                    </div>
                </div>
            );
        } else if(workspaceMode === 'generator'){
            content = (
                <div style={{width: '100%', height: '100%'}}>
                    <Generator />
                    <SignInModal />
                    <ConfirmationModal />
                    <InformationModal />
                </div>
            );
        } else {
            content = (
                <div style={{position: 'fixed', top: '0px', left: '0px', right: '0px', bottom: '0px'}}>
                    <div
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
                        <div style={{display: 'block'}}>
                            <div className='umy-logo'></div>
                        </div>
                    </div>
                </div>
            );
        }

        return content;
    }
}

export default connect( modelSelector, containerActions)(Container);

