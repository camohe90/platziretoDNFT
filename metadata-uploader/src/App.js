import "./App.css"
import { useRef, useState } from "react"
import { storeNFT } from "./uploadHelper"

const INPUT_STRING = "text"
const INPUT_FILE = "file"

const INPUTS = [
  { name: "Name", key: "name", type: INPUT_STRING },
  { name: "Description", key: "description", type: INPUT_STRING },
  { name: "Image", key: "image", type: INPUT_FILE },
  { name: "Trait type name", key: "trait-type", type: INPUT_STRING },
  { name: "Trait type value", key: "value", type: INPUT_STRING },
]

function App() {
  const [buttonTitle, setButtonTitle] = useState("Upload NFT")
  const [nftURI, setnftURI] = useState(
    ""
  )
  const inputRefs = useRef([])

  const uploadNFT = () => {
    let nft_metadata = {}
    INPUTS.forEach((item, index) => {
      if (item.type === INPUT_FILE) {
        nft_metadata = {
          ...nft_metadata,
          [item.key]: inputRefs.current[index].files[0],
        }
      } else {
        if (index >= 3) {
          nft_metadata = {
            ...nft_metadata,
            attributes: {
              ...nft_metadata.attributes,
              [item.key]: inputRefs.current[index].value,
            },
          }
        } else {
          nft_metadata = {
            ...nft_metadata,
            [item.key]: inputRefs.current[index].value,
          }
        }
      }
    })

    var token = prompt("NFT.storage token: ")

    if (token !== "") {
      setButtonTitle("Uploading nft...")
      setnftURI("")
      storeNFT(nft_metadata, token)
        .then((res) => {
          console.log(res)
          setButtonTitle("Upload NFT")
          setnftURI(res.url)
          alert("NFT uploaded succesfully to: " + res.url)
        })
        .catch((error) => {
          setButtonTitle("Upload NFT")
          setnftURI("")
          alert(error)
          console.log(error)
        })
    } else {
      setButtonTitle("Upload NFT")
      setnftURI("")
      alert("Invalid token")
    }
  }

  return (
    <div className="App">
      <div className="inputsWrapper">
        <div className="headerWrapper">Platzi NFT Uploader</div>
        {INPUTS.map((inputObj, index) => (
          <div key={index} className="inputWrapper">
            <div className="inputTitle">{inputObj.name}</div>

            <input
              className="inputText"
              ref={(el) => (inputRefs.current[index] = el)}
              type={inputObj.type}
            />
          </div>
        ))}
        <button className="submitButton" onClick={uploadNFT}>
          {buttonTitle}
        </button>
        {nftURI && <div onClick={()=> window.open(nftURI, "_blank")} className="nftURI">{nftURI}</div>}
      </div>
    </div>
  )
}

export default App
