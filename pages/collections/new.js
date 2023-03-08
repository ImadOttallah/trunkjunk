import CollectionForm from '../../components/forms/CollectionForm';
import { useAuth } from '../../utils/context/authContext';

const NewCollection = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Post a Collection</h2>
      <CollectionForm user={user} />
    </div>
  );
};

export default NewCollection;
