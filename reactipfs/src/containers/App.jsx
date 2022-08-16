import React, { useEffect, useState, createContext } from 'react';
import '../styles/components/App.styl';
import getData from '../utils/getData';
export const InfoContext = createContext({});
import axios from 'axios';

const App = () => {
  const [myInfo, setMyInfo] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true);
    getData("https://raw.githubusercontent.com/leomaker1993/react-eth-challenge/main/data.json")
      .then(res => {
        setMyInfo(res.data)
        setLoading(false)
      })
  }, [])

  const [fileImg, setFileImg] = useState(null);
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [atribute1, setAtribute1] = useState("")
  const [atribute2, setAtribute2] = useState("")
  const [message, setMessage] = useState("")
  const [link, setLink] = useState("")

  const sendJSONtoIPFS = async (ImgHash) => {

    try {
      setMessage("Enviando metadata JSON ...")

      var data = JSON.stringify({
        "pinataMetadata": {
          "name": name,
          "description": desc,
          "image": `https://gateway.pinata.cloud/ipfs/${ImgHash}`,
          "attributes": [
            {
                "Attribute": "Attribute",
                "value": atribute1
            },
            {
                "Attribute": "Attribute",
                "value": atribute2
            }
        ]
      }
      });

       const resJSON = await axios({
        
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
        data: {
          "name": name,
          "description": desc,
          "image": `https://gateway.pinata.cloud/ipfs/${ImgHash}`,
          "attributes": [
            {
                "Attribute": "Attribute",
                "value": atribute1
            },
            {
                "Attribute": "Attribute",
                "value": atribute2
            }
        ]
      },
        headers: {
          'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
          'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
        },
      });

      //console.log("final ", `ipfs://${resJSON.data.IpfsHash}`)
      const tokenURI = `${resJSON.data.IpfsHash}`;
      console.log("Token URI", tokenURI);
      setMessage(`Metadata JSON Enviado!`)
      setLink(`https://gateway.pinata.cloud/ipfs/${tokenURI}`)

    } catch (error) {
      console.log("JSON to IPFS: ")
      console.log(error);
      setMessage(`Error enviando metadata JSON: ${error}`)

    }


  }

  const sendFileToIPFS = async (e) => {
    setLink("")
    setMessage("Enviando imagen ...")
    console.log("sending file..",e)
    e.preventDefault();
    if (fileImg) {
      try {

        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
            'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
            "Content-Type": "multipart/form-data"
          },
        });
        console.log('response IPFS',resFile.data);
        const ImgHash = resFile.data.IpfsHash;
        console.log('imghash',ImgHash);
        if (resFile.data.isDuplicate){
          setMessage(`Atención imagen duplicada!!!`)
        }else{
          setMessage(`Imagen enviada, hash: ${ImgHash}`)
          sendJSONtoIPFS(ImgHash)
        }

      } catch (error) {
        console.log("File to IPFS: ")
        console.log(error)
        setMessage(`ERROR enviando imagen ... ${error}`)
      }
    }else{
      setMessage(`Seleccionar Archivo!!`)
    }
  }

  if (loading) return 'Cargando ...  '
  else return (

    <InfoContext.Provider value={myInfo}>
      <div class="center">
      <h2>Enviar imagen y JSON metadata a IPFS Pinata🪅</h2>
      
      <form onSubmit={sendFileToIPFS}>
        {message==""?<></> :<h4>{message}</h4>}
        {link==""?<></> :<a href={link} target="_blank">Ir a metadata</a>}
        <input type="file" onChange={(e) => setFileImg(e.target.files[0])} required />
        {/* <button onClick={sendFileToIPFS}>Subir imagen a IPFS</button> */}
        <input type="text" onChange={(e) => setName(e.target.value)} placeholder='name' required value={name} />
        <input type="text" onChange={(e) => setDesc(e.target.value)} placeholder="description" required value={desc} />
        <input type="text" onChange={(e) => setAtribute1(e.target.value)} placeholder='attribute 1' required value={atribute1} />
        <input type="text" onChange={(e) => setAtribute2(e.target.value)} placeholder="attribute 2" required  value={atribute2} />
        <br />
        <button type='submit' >Subir a IPFS</button>
        {/* <button className='bttn_ui me-3' type='submit' >Mint NFT</button> */}
      </form>
      </div>
    </InfoContext.Provider>
  )
};

export default App;
