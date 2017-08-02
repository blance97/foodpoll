import React, { Component } from 'react';
import { Progress, Segment, Header, Divider, Table } from 'semantic-ui-react';
import base from '../rebase';
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
            i !== prefArray.length-1 ? builder += ", " : null;
        })
        return builder;
    }
    render() {
        const votes = this.state.foodVotes.map((element, i) => {
            return (
                <div key={i}>
                    <Divider />
                    <Progress percent={(element.votes / this.state.total) * 100} progress='percent' indicating >
                        {element.data}
                    </Progress>
                </div>
            )
        })

        const preferences = Object.keys(this.state.preferences).map((key, i) => {
            return (
                <Table.Row key={i}>
                    <Table.Cell>
                        {key}
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
                <Segment style={{ width: '50%' }}>
                    <Header as='h1'>Results</Header>
                    {votes}
                    <br />
                    <Divider horizontal>Preferences</Divider>
                    <Table basic='very' celled>
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
                </Segment>
            </div >
        );
    }
}

export default Results;
