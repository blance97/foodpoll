import React, { Component } from 'react';
import { Progress, Container, Button, Checkbox, Header, Divider, Icon, Dropdown, Step } from 'semantic-ui-react';
import shortid from 'shortid';
import Cuisines from '../Data/Cuisines';

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            inputs: [{ data: "", index: 0 }]
        }
        this.addOption = this.addOption.bind(this);
    }

    addOption() {
        this.setState({
            inputs: [...this.state.inputs, { data: "", index: this.state.inputs[this.state.inputs.length - 1].index + 1 }]
        })
    }
    updateOption(e, data, index) {
        this.setState({
            inputs: this.state.inputs.map((element, i) => {
                if (element.index === index) {
                    return { ...element, data: data.value }
                }
                return element
            })
        })
    }
    deleteOption(i) {
        if (this.state.inputs.length === 1) {
            console.log("cannot delete last item");
            return;
        }
        const index = this.state.inputs.findIndex((value) => i === value.index)
        const newList = [...this.state.inputs.slice(0, index), ...this.state.inputs.slice(index + 1)]
        this.setState({
            inputs: newList
        })
    }

    submit(data) {
        this.props.createPoll(`${Date.now() + shortid.generate()}`, data)
    }

    /**
     * TODO: Look into user addition
     */
    render() {
        const cuisinesOptions = Cuisines.Cuisines.map((cuisine, i) => {
            return { key: i, value: cuisine, text: cuisine }
        });

        const list = this.state.inputs.map((element, i) => {
            return (
                <div key={element.index}>
                    <b>Option {i + 1}</b>
                    <div style={{ display: 'flex' }}>
                        <Icon onClick={this.deleteOption.bind(this, element.index)} link size='large' name='close' size='big' style={{ marginTop: '5px' }} />
                        <Dropdown onChange={(e, data) => { this.updateOption(e, data, element.index) }} placeholder='Select Food Type' search selection options={cuisinesOptions} fluid />
                    </div >
                    <Divider />
                </div>
            );
        });
        return (
            <Container style={{ backgroundColor: "#eeeeee", padding: 15, borderRadius: 5 }}>
                <Header as='h1' style={{ textColor: "white" }}>Create Poll</Header>
                <div>
                    <Divider />
                    {list}
                    <Button onClick={this.addOption} icon='add square' size='large' content='Add Choice' primary labelPosition='right' />
                    <Divider />
                    <Button.Group style={{ width: '100%' }}>
                        <Button color='teal' onClick={() => this.submit(this.state)}>Continue</Button>
                    </Button.Group>
                </div>
            </Container>

        )
    }
}

export default CreatePoll;
