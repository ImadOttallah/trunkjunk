import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createCollection, updateCollection } from '../../utils/data/collectionData';
import { getBandanas } from '../../utils/data/bandanaData';

const initalState = {
  name: '',
  image: '',
  description: '',
  bandana: {
    id: 0,
    name: '',
  },
};

const CollectionForm = ({ user, obj }) => {
  const [currentCollection, setCurrentCollection] = useState(initalState);
  const [collectionBandana, setCollectionBandana] = useState([]);
  const [desiredBandanas, setDesiredBandanas] = useState(initalState);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'pattern') {
      setDesiredBandanas(value);
      desiredBandanas((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setCurrentCollection((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    console.warn(name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const collection = {
      name: currentCollection.name,
      image: currentCollection.image,
      description: currentCollection.description,
      bandana: desiredBandanas,
      user: user.id,
    };
    if (obj.id) {
      updateCollection(collection, obj.id).then(() => router.push('/collections'));
    } else {
      createCollection(collection).then(() => router.push('/collections'));
      console.warn(collection);
    }
  };

  useEffect(() => {
    if (obj.id) {
      const editCollection = {
        name: obj.name,
        image: obj.image,
        description: obj.description,
        bandanas: obj.bandanas.name,
      };
      setCurrentCollection(editCollection);
    }
    getBandanas().then(setCollectionBandana);
  }, [obj]);
  console.warn(obj);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Post'} Collection</h2>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" required value={currentCollection.name} onChange={handleChange} />
          <Form.Label>Image</Form.Label>
          <Form.Control name="image" required value={currentCollection.image} onChange={handleChange} />
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" required value={currentCollection.description} onChange={handleChange} />
        </Form.Group>
        <FloatingLabel controlId="floatingSelect" label="Bandana" className="mb-3">
          <Form.Select
            aria-label="Bandana"
            name="bandana"
            onChange={handleChange}
            className="mb-3"
            value={currentCollection.bandana}
            required
          >
            <option value="">Select Bandanas</option>
            {
            // eslint-disable-next-line react/prop-types
            collectionBandana?.map((bandana) => (
              <option
                key={bandana.id}
                value={bandana.id}
                defaultValue={currentCollection.pattern === bandana.id}
              >
                {bandana.name}
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

CollectionForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  obj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    bandana: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
}.isRequired;

CollectionForm.defaultProps = {
  obj: initalState,
};

export default CollectionForm;
