import React, { Component } from 'react';
import { Segment, Button, Header, Divider, Icon, Input, Container } from 'semantic-ui-react';
import Cuisines from '../Data/Cuisines'
import { Redirect } from 'react-router-dom';

class SharePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false,
            inputs: [0],
            redirect: false
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
                {this.state.redirect && <Redirect to={this.props.link}></Redirect>}
                <Container style={{ backgroundColor: "#eeeeee", padding: 15, borderRadius: 5 }}>
                    <Segment style={{ width: '100%' }}>
                        <Header as='h1'>Share Poll</Header>
                        <center style={{ margin: 20 }}>Share Link <Input value={`https://${window.location.hostname}:${window.location.port}${this.props.link}`} size="large" /></center>
                        <Button.Group style={{ width: '100%' }}>
                            <Button onClick={() => this.props.prev()}>Back</Button>
                            <Button.Or />
                            <Button color='teal' onClick={() => this.setState({ redirect: true })}>Continue</Button>
                        </Button.Group>
                    </Segment>
                </Container>
            </div >
        )
    }
}

export default SharePoll;
