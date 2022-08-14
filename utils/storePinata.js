const pinataSDK = require("@pinata/sdk")
const path = require("path")
const fs = require("fs")
require("dotenv").config()

const PINATA_API_KEY = process.env.PINATA_API_KEY
const PINATA_API_SECRET = process.env.PINATA_API_SECRET
const pinata = pinataSDK(PINATA_API_KEY, PINATA_API_SECRET)

const storeMetaData = async () => {
    const fullPath = path.resolve("./images")
    const images = fs.readdirSync(fullPath)
    const dataURI = JSON.parse(fs.readFileSync("metadata/metadata.json", "utf-8"))

    let IpfsUriMetadata = []

    for (imageIndex in images) {
        console.log(`Uploading ${imageIndex}...`)
        const readableStreamForFile = fs.createReadStream(`${fullPath}/${images[imageIndex]}`)
        console.log(readableStreamForFile)

        /*
        try {
            const responseImg = await pinata.pinFileToIPFS(readableStreamForFile)

            let metadata = dataURI[imageIndex]
            metadata.image = `ipfs://${responseImg.IpfsHash}`
            const responseMetaData = await pinata.pinJSONToIPFS(metadata)

            IpfsUriMetadata.push(`ipfs://${responseMetaData.IpfsHash}`)
        } catch (error) {
            console.log(error)
        }
        */
    }

    return IpfsUriMetadata
}

module.exports = { storeMetaData }
