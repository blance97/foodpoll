import React, { Component } from 'react';
import { Form, Segment, Button, Radio, Header, Divider, Icon, Input, Label } from 'semantic-ui-react';
import base from '../rebase';

class Voting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameError: false,
            value: '',
            preferences: [{ data: "", index: 0 }],
            peoplePreferences: {},
            choices: []
        }
        this.addOption = this.addOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        base.fetch(id, {
            conext: this
        }).then((res) => {
            console.log(res);
            this.setState({ choices: res.inputs, peoplePreferences: res.peoplePreferences ? res.peoplePreferences : {} })
        }).catch((err) => {
            console.log(err);
        })
    }

    addOption() {
        this.setState({
            preferences: [...this.state.preferences, { data: "", votes: 0, index: this.state.preferences[this.state.preferences.length - 1].index + 1 }]
        })
    }
    updateOption(e, data, index) {
        this.setState({
            preferences: this.state.preferences.map((element, i) => {
                if (element.index === index) {
                    return { ...element, data: data.value }
                }
                return element
            })
        })
    }
    deleteOption(i) {
        if (this.state.preferences.length === 1) {
            console.log("cannot delete last item");
            return;
        }
        const index = this.state.preferences.findIndex((value) => i === value.index)
        const newList = [...this.state.preferences.slice(0, index), ...this.state.preferences.slice(index + 1)]
        this.setState({
            preferences: newList
        })
    }
    handleChange(e, { value }) {
        this.setState({ value });
    }
    handleInputChange(e, data) {
        this.setState({ name: data.value });
    }
    submit() {
        this.setState({ nameError: false })
        if (this.state.name === "") {
            this.setState({ nameError: true })
            return;
        }
        const id = this.props.match.params.id;
        // let pref = { preferences: this.state.preferences, votedFor: this.state.value }
        // console.log(pref);
        const peoplePreferences = { name: this.state.name, preferences: this.state.preferences, votedFor: this.state.value }
        console.log(peoplePreferences);
        base.push(`${id}/peoplePreferences`, { data: peoplePreferences }).then(() => {
            console.log("good")
            localStorage.setItem(`VotedFor(${this.props.match.params.id})`, this.props.match.params.id);
            window.location.href = `http://${window.location.hostname}:${window.location.port}/results/${this.props.match.params.id}`;
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        console.log(this.state)
        const choices = this.state.choices.map((choice) => {
            return (
                <Form.Field key={choice.index}>
                    <Radio
                        label={choice.data}
                        name='radiogroup'
                        value={choice.data}
                        checked={this.state.value === choice.data}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            )
        })
        const list = this.state.preferences.map((element, i) => {
            return (
                <div key={element.index}>
                    <b>Preference {i + 1}</b>
                    <div style={{ display: 'flex' }}>
                        <Icon onClick={this.deleteOption.bind(this, element.index)} link size='large' name='close' size='big' style={{ marginTop: '5px' }} />
                        <Input onChange={(e, data) => { this.updateOption(e, data, element.index) }} style={{ width: '100%' }} placeholder={`Preference ${i + 1}`} />
                    </div >
                    <Divider />
                </div>
            );
        });
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Segment style={{ width: '100%' }}>
                    <Header as='h1'>Food Preference</Header>
                    <Form.Field>
                        {this.state.nameError && <Label basic color='red' pointing='below'>Enter Name</Label>}
                        <Input style={{ width: '100%' }} onChange={this.handleInputChange} placeholder="Your Name" label="Your Name" />
                    </Form.Field>
                    <Divider horizontal>Vote on food type</Divider>
                    <Form>
                        {choices}
                    </Form>
                    <Divider horizontal>Select Preferences</Divider>
                    {list}
                    <Button onClick={this.addOption} icon='add square' size='large' content='Add Preference' primary labelPosition='right' />
                    <Divider />
                    <Button.Group style={{ width: '100%' }}>
                        <Button disabled={this.state.value === '' || localStorage.getItem(`VotedFor(${this.props.match.params.id})`) === this.props.match.params.id} color='teal' onClick={() => this.submit()}>Continue</Button>
                    </Button.Group>
                </Segment>
            </div >
        )
    }
}

export default Voting;
