import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ListForm from './ListForm';

const CreateList = ({ addNewlist }) => {
    const [name, setName] = useState('');

    const [showCreateListModal, setShowCreateListModal] = useState(false);
    const [items, setItems] = useState([]);

    const handleChange = (val, setterFn) => {
        setterFn(val);
    };

    const toggleModal = () => {
        setShowCreateListModal((prevValue) => !prevValue);
    }

    const onItemAdd = (item) => {
        setItems(prevItems => prevItems.concat(item));
    };

    const onSave = () => {
        addNewlist({name, list: items});
        setName('');
        setItems([]);
        toggleModal();
    };

    return (
        <>
            <Button variant="dark" size="lg" onClick={toggleModal}>Add New List</Button>
            <Modal show={showCreateListModal} onHide={toggleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New List</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group controlId="name">
                        <Form.Control
                            type="text"
                            onChange={(ev) => { handleChange(ev.target.value, setName); }}
                            placeholder="List Name"
                            value={name}
                        />
                    </Form.Group>
                    <hr />
                    <ListForm onAdd={onItemAdd} count={items.length} />
                    <hr />
                    {items.length > 0 && (
                        <ListGroup>
                            {items.map((item, idx) => (
                                <ListGroup.Item key={`${idx}`}>
                                    Product: {item.product} Quantity: {item.quantity} Unit: {item.unit}
                                </ListGroup.Item>
                                )
                            )}
                        </ListGroup>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSave} disabled={!name || items.length === 0}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateList;
