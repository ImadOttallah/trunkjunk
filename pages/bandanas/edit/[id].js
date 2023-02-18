import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getBandanasById } from '../../../utils/data/bandanaData';
import BandanaForm from '../../../components/forms/BandanaForm';

function EditBandana() {
  const [editItem, setEditItem] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getBandanasById(id).then(setEditItem);
  }, [user, router, id]);
  return (
    <BandanaForm user={user} obj={editItem} />
  );
}

export default EditBandana;
