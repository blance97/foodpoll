import React from 'react';
import { Icon, Step } from 'semantic-ui-react';

const Stepper = ({ step }) => (
    <div style={{
        display: 'flex', justifyContent: 'center'
    }}>
        <Step.Group unstackable size="tiny" >
            <Step icon="pencil" title='Create Food Types' description='Food Types' />
            <Step icon='share alternate' title='Share' description='Share poll with people' />
            <Step icon='like' title='Preferences' description='Select your preferences' />
            <Step icon='bar graph' title='Results' />
        </Step.Group>
        <br />
    </div>
);

export default Stepper;