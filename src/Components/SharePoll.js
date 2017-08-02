import React, { Component } from 'react';
import { Segment, Button, Header, Divider, Icon, Input } from 'semantic-ui-react';
import Cuisines from '../Data/Cuisines'

class SharePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            inputs: [0]
        }
        this.addOption = this.addOption.bind(this);
    }

    addOption() {
        this.setState({
            inputs: [...this.state.inputs, this.state.inputs[this.state.inputs.length - 1] + 1]
        })

    }
    deleteOption(i) {
        if (this.state.inputs.length === 1) {
            console.log("cannot delete last item");
            return;
        }
        const index = this.state.inputs.findIndex((value) => i === value)
        const newList = [...this.state.inputs.slice(0, index), ...this.state.inputs.slice(index + 1)]
        this.setState({
            inputs: newList
        })
    }
    /**
     * TODO: Look into user addition
     */
    render() {
        const cuisinesOptions = Object.keys(Cuisines).map((cuisine, i) => {
            return { key: i, value: cuisine, text: cuisine }
        });

        const list = this.state.inputs.map((element, i) => {
            return (
                <div key={element}>
                    <b>Person {i + 1}</b>
                    <div style={{ display: 'flex' }}>
                        <Icon onClick={this.deleteOption.bind(this, element)} link size='large' name='close' size='big' style={{ marginTop: '5px' }} />
                        <Input fluid placeholder='Email' type="email" style={{ width: '100%' }} />
                    </div >
                    <Divider />
                </div>
            );
        });
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Segment style={{ width: '60%' }}>
                    <Header as='h1'>Share Poll</Header>
                    <center style={{ margin: 20 }}>Share Link <Input value={this.props.link} size="large" /></center>
                    <Button.Group style={{ width: '100%' }}>
                        <Button onClick={() => this.props.prev()}>Back</Button>
                        <Button.Or />
                        <Button color='teal' onClick={() => { window.location.href = this.props.link }}>Continue</Button>
                    </Button.Group>
                </Segment>
            </div >
        )
    }
}

export default SharePoll;
