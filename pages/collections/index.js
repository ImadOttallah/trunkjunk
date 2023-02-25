import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getCollections } from '../../utils/data/collectionData';
import CollectionCard from '../../components/mainCards/CollectionCard';

function Home() {
  const [collections, setCollections] = useState([]);
  const router = useRouter();
  const getContent = () => {
    getCollections().then((data) => setCollections(data));
  };

  useEffect(() => {
    getContent();
  }, []);
  console.warn(collections);
  return (
    <article className="collections">
      <h1>Collections</h1>
      <Button
        onClick={() => {
          router.push('/collections/new');
        }}
      >
        Create a Collection
      </Button>
      {collections.map((collection) => (
        <section key={`collection--${collection.id}`} className="collections">
          <CollectionCard
            id={collection.id}
            name={collection.name}
            image={collection.image}
            description={collection.description}
            bandanas={collection.bandanas}
            onUpdate={getContent}
          />
        </section>
      ))}
    </article>
  );
}

export default Home;
