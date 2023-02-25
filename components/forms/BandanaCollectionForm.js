import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getCollections, updateCollection } from '../../utils/data/collectionData';
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

const BandanaCollectionForm = ({ user, obj }) => {
  const [currentCollection, setCurrentCollection] = useState(initalState);
  const [bandanaCollection, setBandanaCollection] = useState([]);
  const [desiredBandanaCollection, setDesiredBandanaCollection] = useState(initalState);
  const router = useRouter();

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
    console.warn(bandanaCollection);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bandanaCollections = {
      bandana: desiredBandanaCollection,
      collection: desiredBandanaCollection,
      user: user.id,
    };
    if (obj.id) {
      updateCollection(bandanaCollections, obj.id).then(() => router.push('/bandanas'));
    } else {
      createBandanaCollection(bandanaCollections).then(() => router.push('/collections'));
      console.warn(bandanaCollections);
    }
  };

  useEffect(() => {
    if (obj.id) {
      const editCollection = {
        bandana: obj.bandana.name,
        collection: obj.collection.name,
      };
      setCurrentCollection(editCollection);
    }
    getCollections().then(setBandanaCollection);
  }, [obj]);
  console.warn(obj);

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
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
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
