import React, { useState, useEffect } from 'react';
import CardColumns from 'react-bootstrap/CardColumns'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import CreateList from './CreateList/CreateList';
import { addList, getList } from '../Request/actions';
import './Section.css';

const Section = () => {
    const [allLists, setAllLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const getListData = () => {
        setLoading(true);
        setShowError(false)
        getList().then(
            (res) => {
                setLoading(false);
                setAllLists(res);
            }
        ).catch(err => {
            setLoading(false);            
            setShowError(true);
        });
    };

    useEffect(() => {
        getListData();
    }, [])

    const addNewlist = (list) => {
        addList(list).then(() => {
            getListData();
        }).catch(() => {
            setShowError(true);
        });
    };

    const getListSection = () => {
        if (loading) {
            return (
                <div style={{marginTop: '20px'}}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        return (
            <>
                {showError && (
                    <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>Something went wrong. Please try again.</p>
                    </Alert>
                )}
                {allLists.length > 0 ? (
                    <CardColumns style={{ marginTop: '20px' }}>
                        {allLists.map((item, idx) => (
                            <Card border="primary" key={`${idx}`}>
                                <Card.Body>
                                    <Card.Title>{item.name}</Card.Title>
                                </Card.Body>
                                <ListGroup variant="flush">
                                    {item.list
                                        .map(
                                            (item, idx) => (
                                                <ListGroup.Item key={`${idx}`}>
                                                    Product: {item.product} Quantity: {item.quantity} Unit: {item.unit}
                                                </ListGroup.Item>)
                                        )
                                    }
                                </ListGroup>
                            </Card>
                        ))}
                    </CardColumns>
                ) : (
                    <div style={{marginTop: '20px'}}>
                        No Lists added
                    </div>
                )}
            </>
        )
    }

    return (
        <section>
            <CreateList addNewlist={addNewlist} />
            {getListSection()}
        </section>
    );
};

export default Section;
