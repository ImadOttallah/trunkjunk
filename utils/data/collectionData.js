import { clientCredentials } from '../client';

const getCollections = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCollectionsById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
const getCollectionBandanas = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandana_collections`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createCollection = (collection) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections`, {
    method: 'POST',
    body: JSON.stringify(collection),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateCollection = (collection, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(collection),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});
const deleteCollection = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/collections/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  getCollections, getCollectionsById, deleteCollection, createCollection, updateCollection, getCollectionBandanas,
};
