import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import BandanaToken from '../../components/tokens/BandanaToken';
import { deleteBandanaCollection } from '../../utils/data/bandanaCollectionData';
import { getBandanas } from '../../utils/data/bandanaData';
import { getCollectionsById } from '../../utils/data/collectionData';

export default function ViewCollectionDetail() {
  const [collectionDetail, setCollectionDetail] = useState({});
  const [, setBandanas] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const getOneCollection = () => {
    getCollectionsById(id).then(setCollectionDetail);
  };
  const getContent = () => {
    getBandanas(id).then((data) => setBandanas(data));
  };
  console.warn(collectionDetail);

  const removeFromCollection = (click, bandanaId) => {
    click.preventDefault();
    deleteBandanaCollection(bandanaId).then(() => router.push('/collections'));
  };

  useEffect(() => {
    getOneCollection();
    getContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <Card.Img variant="top" src={collectionDetail.image} alt={collectionDetail.name} style={{ height: '500px' }} />
          {/* <img src={collectionDetail.image} alt={collectionDetail.name} /> */}
        </div>
        <div className="text-black ms-5 details">
          <h5>Name: {collectionDetail.name}
          </h5>
          <p>Description: {collectionDetail.description}</p>
        </div>
      </div>
      <div className="tokenDisplay">
        <Col className="tokenDisplay" xs>
          <div className="d-flex flex-wrap">
            {collectionDetail?.bandanas?.map((bandana) => (
              <section key={`bandana--${bandana.id}`} className="bandanas">
                <BandanaToken
                  id={bandana.id}
                  name={bandana.name}
                  image={bandana.image}
                  onUpdate={getContent}
                />
                <Button key={bandana.joined_bandanas[0].id} className="custom-btn" onClick={(click) => removeFromCollection(click, bandana.joined_bandanas[0].id)}>
                  Remove from my Collection
                </Button>
              </section>
            ))}
          </div>
          {/* <li className="list-group-item">Bandanas: {collectionDetail.bandanas?.map((taco) => (
            <p>{`${taco.name}`} </p>
          ))}
          </li> */}
        </Col>
      </div>
    </>

  );
}
