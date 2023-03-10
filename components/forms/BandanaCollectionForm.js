import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getCollections } from '../../utils/data/collectionData';
import { createBandanaCollection } from '../../utils/data/bandanaCollectionData';

const initalState = {
  bandana: {
    id: 0,
    name: '',
  },
  collection: {
    id: 0,
    name: '',
  },
};

const BandanaCollectionForm = ({ obj }) => {
  const [currentCollection, setCurrentCollection] = useState(initalState);
  const [bandanaCollection, setBandanaCollection] = useState([]);
  // const [selectedItems, setSelectedItems] = useState([]);
  const [, setDesiredBandanaCollection] = useState(initalState);
  const router = useRouter();
  const { id } = router.query;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'collection') {
      setDesiredBandanaCollection(value);
      setCurrentCollection((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setCurrentCollection((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBandanaCollection(id, currentCollection.collection).then(() => router.push('/collections'));
  };
  // const handleSelectItem = (e) => {
  //   setSelectedItems([...selectedItems, e.target.value]);
  // };
  // eslint-disable-next-line no-self-compare
  const filteredCollection = () => { bandanaCollection.filter((collection) => collection.bandanas.id !== id); };
  // const filteredCollection = bandanaCollection.map((collection) => console.warn(collection));
  // console.warn(bandanaCollection);
  // console.warn(currentCollection);

  useEffect(() => {
    if (obj.id) {
      const editCollection = {
        bandana: obj.bandana.name,
        collection: obj.collection.name,
      };
      setCurrentCollection(editCollection);
    }
    getCollections().then(setBandanaCollection);
    filteredCollection();
  }, [obj]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">Add to Collection</h2>
        <FloatingLabel controlId="floatingSelect" label="Collection" className="mb-3">
          <Form.Select
            aria-label="Collection"
            name="collection"
            onChange={handleChange}
            className="mb-3"
            value={currentCollection.collection}
            required
          >
            <option value="">Select Collection</option>

            {/* <select onChange={handleSelectItem}>
              {bandanaCollection
                .filter((item) => !selectedItems.find((taco) => item === taco))
                .map((collection) => <option value={collection.id}>{collection.name}</option>)}
            </select> */}

            {
            // eslint-disable-next-line react/prop-types
            bandanaCollection?.map((collection) => (
              <option
                key={collection.id}
                value={collection.id}
                defaultValue={currentCollection.collection === collection.id}
              >
                {collection.name}
              </option>
            ))
          }
          </Form.Select>
        </FloatingLabel>
        <Button className="create" type="submit">{obj.id ? 'Update' : 'Post'} Collection</Button>
      </Form>
    </>
  );
};

BandanaCollectionForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    bandana: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    collection: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
}.isRequired;

BandanaCollectionForm.defaultProps = {
  obj: initalState,
};

export default BandanaCollectionForm;
