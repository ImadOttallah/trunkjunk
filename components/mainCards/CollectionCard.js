import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteCollection } from '../../utils/data/collectionData';

function CollectionCard({
  name,
  description,
  image,
  bandanas,
  id,
  onUpdate,
}) {
  const deleteThisBandana = () => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteCollection(id).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={image} alt={name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title> {name}</Card.Title>
        <ul className="list-group">
          <li className="list-group-item">Name: {name}</li>
          <li className="list-group-item">Description: {description}</li>
          <li className="list-group-item">Bandanas: {bandanas?.map((taco) => (
            <p>{`${taco.name}`} </p>
          ))}
          </li>
        </ul>
        <Link href={`/collections/${id}`} passHref>
          <Button size="sm" variant="dark" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/collections/edit/${id}`} passHref>
          <Button size="sm" variant="dark">
            EDIT
          </Button>
        </Link>
        <Button size="sm" variant="danger" onClick={deleteThisBandana} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

CollectionCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  bandanas: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CollectionCard;
