const getNft = async (contract) => {
  const tokenUri = await contract.tokenURI(0);
  const response = await fetch(tokenUri);
  const data = await response.json();
  const dataAttributes = data.attributes[0];
  const attributes = Object.values(dataAttributes);
  return {
    name: data.name,
    description: data.description,
    image: data.image,
    trait: attributes[0],
    value: attributes[1],
  };
};

export { getNft };
