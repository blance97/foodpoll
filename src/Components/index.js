import React, { Component } from 'react';
import { Container, Button, Header, Icon, Image, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <Image
                    src={require("./logo.png")}
                    height={200}
                    centered
                    style={{ marginBottom: -200 }}
                />
                <Segment
                    textAlign='center'
                    vertical
                >
                    <Container text>
                        <Header
                            as='h1'
                            content='Food Poll'
                            inverted
                            style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
                        />
                        <Header
                            as='h2'
                            content='Create a food survey and send it out to get everyones opinion'
                            inverted
                            style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                        />
                        <Button as={Link} to="/createPoll" primary size='huge'>
                            Get Started
  <Icon name='right arrow' />
                        </Button>
                    </Container>
                </Segment>
            </div>
        )
    }
}
