import React from 'react';
import { Menu, Container, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Stepper = ({ step }) => (

    <Container style={{ marginBottom: 25 }}>
        <Menu inverted secondary size='large'>
            <Menu.Item as={Link} to="/">Home</Menu.Item>
            <Menu.Item as={Link} to="/about">About</Menu.Item>
            <Menu.Item as={Link} to="/createPoll">Create New Poll</Menu.Item>
        </Menu>
        <Divider fitted />
    </Container>
);

export default Stepper;