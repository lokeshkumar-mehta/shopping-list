import React, { useState } from 'react'
import Select from 'react-select';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './ListForm.css';

const PRODUCT_OPTIONS = ['Apple', 'Mango', 'Milk'].map(p => ({value: p, label: p}));

const UNIT_OPTIONS = ['Litre', 'Item'].map(u => ({value: u, label: u}));

const ListForm = ({ onAdd }) => {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState({});

    const handleChange = (val, setterFn) => {
        setterFn(val);
    };

    const resetState = () => {
        setProduct({});
        setQuantity('');
        setUnit({});
    };

    const handleAdd = () => {
        onAdd({
            product: product.value,
            quantity,
            unit: unit.value
        });
        resetState();
    };

    const isSaveDisabled = () => {
        return (
            Object.keys(product).length === 0 ||
            !quantity ||
            Object.keys(unit).length === 0
        );
    };

    return (
        <>
            <Select 
                name="Product"
                options={PRODUCT_OPTIONS}
                onChange={(val) => { handleChange(val, setProduct); }}
                value={product}
                className="product"
            />
            <Form.Group controlId="quantity">
                <Form.Control
                    type="text"
                    onChange={(ev) => { handleChange(ev.target.value, setQuantity); }}
                    placeholder="Quantity"
                    value={quantity}
                />
            </Form.Group>
            <Select 
                name="Unit"
                options={UNIT_OPTIONS}
                onChange={(val) => { handleChange(val, setUnit); }}
                value={unit}
                className="unit"
            />
            <Button
                variant="primary"
                onClick={handleAdd}
                disabled={isSaveDisabled()}
            >
                Add
            </Button>
        </>
    );
};

export default ListForm;
