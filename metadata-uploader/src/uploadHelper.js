import { NFTStorage, File } from "nft.storage"

export const storeNFT = async (customMetadata, token) => {
  const imageFile = new File([customMetadata.image], "nft.png", {
    type: "image/png",
  })

  const nftstorage = new NFTStorage({ token: token })
  const metadata = await nftstorage.store({
    name: customMetadata.name,
    description: customMetadata.description,
    image: imageFile,
    attributes: customMetadata.attributes,
  })

  return metadata
}
