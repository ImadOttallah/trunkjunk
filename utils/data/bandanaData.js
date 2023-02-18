import { clientCredentials } from '../client';

const getBandanas = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandanas`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getBandanasById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandanas/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// const getBandanaPatterns = () => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/bandanas`)
//     .then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });
const createBandana = (bandana) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandanas`, {
    method: 'POST',
    body: JSON.stringify(bandana),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateBandana = (bandana, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandanas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bandana),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});
const deleteBandana = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bandanas/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});
export {
  getBandanas, getBandanasById, deleteBandana, createBandana, updateBandana,
};
