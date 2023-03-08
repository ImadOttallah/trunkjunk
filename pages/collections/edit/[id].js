import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../../utils/context/authContext';
import { getCollectionsById } from '../../../utils/data/collectionData';
import CollectionForm from '../../../components/forms/CollectionForm';

function EditCollection() {
  const [editItem, setEditItem] = useState({});
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getCollectionsById(id).then(setEditItem);
  }, [user, router, id]);
  return (
    <CollectionForm user={user} obj={editItem} />
  );
}

export default EditCollection;
