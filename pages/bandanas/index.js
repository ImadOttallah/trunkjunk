import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getBandanas } from '../../utils/data/bandanaData';
import BandanaCard from '../../components/mainCards/BandanaCard';

function Home() {
  const [bandanas, setBandanas] = useState([]);
  const router = useRouter();
  const getContent = () => {
    getBandanas().then((data) => setBandanas(data));
  };

  useEffect(() => {
    getContent();
  }, []);
  console.warn(bandanas);
  return (
    <article className="bandanas">
      <h1>Bandanas</h1>
      <Button
        onClick={() => {
          router.push('/bandanas/new');
        }}
      >
        Post a Bandana
      </Button>
      <div className="d-flex flex-wrap">
        {bandanas.map((bandana) => (
          <section key={`bandana--${bandana.id}`} className="bandanas">
            <BandanaCard
              id={bandana.id}
              name={bandana.name}
              size={bandana.size}
              image={bandana.image}
              description={bandana.description}
              origin={bandana.origin}
              pattern={bandana.pattern}
              marking={bandana.marking}
              color={bandana.color}
              condition={bandana.condition}
              onUpdate={getContent}
            />
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;
