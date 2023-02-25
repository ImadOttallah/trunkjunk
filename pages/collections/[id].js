import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getCollectionsById } from '../../utils/data/collectionData';

export default function ViewCollectionDetail() {
  const [collectionDetail, setCollectionDetail] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const getOneCollection = () => {
    getCollectionsById(id).then(setCollectionDetail);
  };

  useEffect(() => {
    getOneCollection();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={collectionDetail.image} alt={collectionDetail.name} />
      </div>
      <div className="text-black ms-5 details">
        <h5>
          {collectionDetail.name}
        </h5>
        <p>Description: {collectionDetail.description}</p>
      </div>
    </div>

  );
}
