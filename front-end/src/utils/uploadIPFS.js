const pinataApiKey = process.env.REACT_APP_API_KEY;
const pinataSecret = process.env.REACT_APP_API_Secret;

export const uploadFile = async (file, onError) => {
  const formData = new FormData();
  formData.append('file', file);
  const config = {
    method: 'POST',
    maxContentLength: Infinity,
    headers: {
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecret,
    },
    body: formData,
  };

  try {
    const response = await fetch(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      config
    );

    const data = await response.json();
    return data.IpfsHash;
  } catch (error) {
    onError({ error });
  }
};
