import BandanaForm from '../../components/forms/BandanaForm';
import { useAuth } from '../../utils/context/authContext';

const NewBandana = () => {
  const { user } = useAuth();
  return (
    <div>
      <h2>Post a Bandana</h2>
      <BandanaForm user={user} />
    </div>
  );
};

export default NewBandana;
