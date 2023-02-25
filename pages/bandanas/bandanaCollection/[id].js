import BandanaCollectionForm from '../../../components/forms/BandanaCollectionForm';
import { useAuth } from '../../../utils/context/authContext';

const NewBandanaCollection = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Add Bandana to Collection</h2>
      <BandanaCollectionForm user={user} />
    </div>
  );
};

export default NewBandanaCollection;
