import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import { deleteBandana } from '../../utils/data/bandanaData';

function BandanaCard({
  name,
  size,
  image,
  description,
  origin,
  pattern,
  marking,
  color,
  condition,
  id,
  onUpdate,
}) {
  const deleteThisBandana = () => {
    if (window.confirm(`Delete ${name}?`)) {
      deleteBandana(id).then(() => onUpdate());
    }
  };
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={image} alt={name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title> {name}</Card.Title>
        <ul className="list-group">
          <li className="list-group-item">Name: {name}</li>
          <li className="list-group-item">Size: {size}</li>
          <li className="list-group-item">Image: {image}</li>
          <li className="list-group-item">Description: {description}</li>
          <li className="list-group-item">Origin: {origin}</li>
          <li className="list-group-item">Pattern: {pattern.name}</li>
          <li className="list-group-item">Marking: {marking.name}</li>
          <li className="list-group-item">Color: {color.name}</li>
          <li className="list-group-item">Condition: {condition.name}</li>
        </ul>
        <Link href={`/bandanas/${id}`} passHref>
          <Button size="sm" variant="dark" className="m-2">
            VIEW
          </Button>
        </Link>
        <Link href={`/bandanas/edit/${id}`} passHref>
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

BandanaCard.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  pattern: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  marking: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  color: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  condition: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  id: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BandanaCard;
