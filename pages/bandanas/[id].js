import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getBandanasById } from '../../utils/data/bandanaData';

export default function ViewBandanaDetail() {
  const [bandanaDetail, setBandanaDetail] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const getOneBandana = () => {
    getBandanasById(id).then(setBandanaDetail);
  };

  useEffect(() => {
    getOneBandana();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={bandanaDetail.image} alt={bandanaDetail.name} />
      </div>
      <div className="text-black ms-5 details">
        <h5>
          {bandanaDetail.name}
        </h5>
        <p>Description: {bandanaDetail.description}</p>
      </div>
      <Link href={`/bandanas/bandanaCollection/${id}`} passHref>
        <Button size="sm" variant="dark">
          Add to Collection
        </Button>
      </Link>
    </div>

  );
}
