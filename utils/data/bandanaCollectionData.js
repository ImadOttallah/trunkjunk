import { clientCredentials } from '../client';

const getBandanaCollections = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandana_collections`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createBandanaCollection = (bandanaId, collectionId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandana_collections`, {
    method: 'POST',
    body: JSON.stringify({
      bandana_id: bandanaId,
      collection_id: collectionId,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
const deleteBandanaCollection = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandana_collections/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getBandanaCollections,
  createBandanaCollection,
  deleteBandanaCollection,
};
