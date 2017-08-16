import React, { Component } from 'react';
import { Progress, Segment, Header, Divider, Table, Button, Container } from 'semantic-ui-react';
import base from '../rebase';
import SuggestedPlaces from './SuggestedPlaces';
import { map } from 'underscore'

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodVotes: [],
            preferences: {},
            total: 1,
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        base.listenTo(id, {
            context: this,
            then(incomeData) {
                this.setState({ foodVotes: incomeData.inputs, preferences: incomeData.peoplePreferences, total: Object.keys(incomeData.peoplePreferences).length })
            }
        });
    }

    formatPreferences(prefArray) {
        let builder = "";
        prefArray.forEach((element, i) => {
            builder += element.data
            i !== prefArray.length - 1 ? builder += ", " : null;
        })
        return builder;
    }
    getVotes(data) {
        let number = 0;
        Object.keys(this.state.preferences).forEach((key, i) => {
            if (this.state.preferences[key].votedFor === data) {
                number++;
            }
        });
        return number;
    }
    render() {
        const votes = this.state.foodVotes.map((element, i) => {
            return (
                <div key={i}>
                    <Divider />
                    <Progress percent={(this.getVotes(element.data) / this.state.total) * 100} progress='percent' indicating >
                        {element.data}
                    </Progress>
                </div>
            )
        })

        const preferences = Object.keys(this.state.preferences).map((key, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell>
                        {this.state.preferences[key].name}
                    </Table.Cell>
                    <Table.Cell>
                        {this.formatPreferences(this.state.preferences[key].preferences)}
                    </Table.Cell>
                    <Table.Cell>
                        {this.state.preferences[key].votedFor}
                    </Table.Cell>
                </Table.Row>
            )
        })

        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Container style={{ backgroundColor: "#eeeeee", padding: 15, borderRadius: 5 }}>
                    <Segment style={{ width: '100%' }}>
                        <Header as='h1'>Results</Header>
                        {votes}
                        <br />
                        <Divider horizontal>Preferences</Divider>
                        <Table basic='very' celled unstackable>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Person</Table.HeaderCell>
                                    <Table.HeaderCell>Preferences</Table.HeaderCell>
                                    <Table.HeaderCell>Voted For</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {preferences}
                            </Table.Body>
                        </Table>
                        <Button onClick={() => window.location.href = `http://${window.location.hostname}:${window.location.port}`}>Create a new poll</Button>
                    </Segment>
                    <Segment inverted>
                        <Divider horizontal inverted>Suggested Places</Divider>
                    </Segment>
                    {this.state.foodVotes.length !== 0 && <SuggestedPlaces keywords={this.state.foodVotes} />}
                </Container>
            </div >
        );
    }
}

export default Results;
