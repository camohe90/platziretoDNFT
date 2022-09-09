import { Form } from 'react-bootstrap';
import React, { useState } from 'react';

const Attribute = (props) => {
  const { attributes, setAttributes } = props.pstate;
  const id = props.id+1;

  const onChangeKey = (event) => {
    const key = "clave"+id;
    attributes[key] = event.target.value;
  }
  
  const onChangeValue = (event) => {
    const key = "valor"+id;
    attributes[key] = event.target.value;
  }


  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Clave</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Ingrese clave"
          onChange={onChangeKey}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Valor</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Ingrese valor"
          onChange={onChangeValue}
        />
      </Form.Group>
    </div>
  );
}

export default Attribute;
