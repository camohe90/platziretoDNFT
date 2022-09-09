import { Button, Form } from 'react-bootstrap';
import React from 'react';
import Attribute from '../Attribute';
import { useState } from 'react';
import uploadIpfs from '../../utils/ipfs/ipfsProvider';


const FormNFT = () => {
  const [name, setName] =  useState("");
  const [description, setDescription] = useState("");
  const [imageCid, setImageCid] = useState("");
  const [lines, setLines] = useState([1]);
  const [attributes, setAttributes] = useState({});
  const [metatadata, setMetadata] = useState({});
  const [metadataCid, setMetadataCid] = useState("");

  const addAttribute = () => {
    setLines([...lines,lines.length+1]);
  }

  const onSubmitForm = (event) => {
    event.preventDefault();
    let attributesList = [];
    for(const line of lines) {
      let attribute = {};
      const claveKey = "clave"+line;
      const valorKey = "valor"+line;
      const claveValue = attributes[claveKey];
      const valorValue = attributes[valorKey];
      attribute["trait-type"] = claveValue;
      attribute["value"] = valorValue;
      attributesList.push(attribute);
    }
    
    const jsonMetadata = {
      name,
      description,
      image: "https://ipfs.cryptostore.com.bo/ipfs/"+imageCid,
      attributes: attributesList
    }

    const jsonStr = JSON.stringify(jsonMetadata);
    const blob = new Blob([jsonStr], {type: "application/json"});
      
    uploadIpfs(blob)
      .then((cid) => {
        setMetadataCid(cid);
        alert("https://ipfs.cryptostore.com.bo/ipfs/"+cid);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(jsonMetadata);
  }

  const onFileChange = (event) => {
    const files = event.target.files;
    if(files.length > 0) {
      uploadIpfs(files[0])
        .then((cid) => {
          setImageCid(cid);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="border border-1 rounded p-3">
        <h2>IPFS Upload</h2>
        <Form onSubmit={onSubmitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese nombre"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese descripcion"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control type="file"
              onChange={onFileChange}
            />
          </Form.Group>
          <div>
            <h3>Tipo de rasgos NFT</h3>
            {lines.map((line, i) => <Attribute pstate={{attributes, setAttributes}} id={i} key={i} />)} 
          </div>
          <div>
           <Button variant="primary" onClick={addAttribute}>
            Agregar atributo
           </Button>
          </div>
          <br/> 
          <Button variant="primary" type="submit">Enviar</Button>
        </Form>
      </div>
    </div>
  );
}

export default FormNFT;
