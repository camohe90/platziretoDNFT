import { create } from "ipfs-http-client";
const clientIpfs = create({url: "https://ipfs.cryptostore.com.bo/api/v0"});

const uploadIpfs = (resource) => {
  return new Promise(async (resolve,reject) => {
    const pinned = await clientIpfs.add(resource);
    const pinnedPath = pinned.path;
    if (pinnedPath.length > 0)
      resolve(pinnedPath);

    if (pinnedPath.length == 0)
      reject();
  });
};

export default uploadIpfs;
