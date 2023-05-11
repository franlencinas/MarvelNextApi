import Link from 'next/link';
import styles from './detail.module.scss';

const fetchComicDetail = async (id) => {
  const res = await fetch(
    `http://gateway.marvel.com/v1/public/comics/${id}?ts=1&apikey=f2eb279676ea4a4b2c2e17e14f2fa46e&hash=64f82d2344b5684e4f40c3d0861ea16a`
  );
  const data = await res.json();
  if (!res.ok) {
    console.log('Failed to fetch data');
  }
  return data;
};

const Detail = async ({ params }) => {
  const { id } = params;
  const data = await fetchComicDetail(id);
  const { title, creators, stories, thumbnail } = data.data.results[0];

  return (
    <main className={styles.main}>
      <div className={styles.detailtitle}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.comicDetail}>
        <div className={styles.imageContainer}>
          <img
            style={{ width: '100%', height: '100%' }}
            src={`${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`}
            alt={title}
          />
        </div>
        <div className={styles.detailsContainer}>
          <div className={styles.creators}>
            <h3 className={styles.h3}>Creators:</h3>
            <ul className={styles.ul}>
              {creators.items.map((creator) => (
                <li key={creator.name} className={styles.name}>
                  {creator.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.stories}>
            <h3 className={styles.h3}>Stories:</h3>
            <ul className={styles.ul}>
              {stories.items.map((story) => (
                <li key={story.name} className={styles.name}>
                  {story.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.paginatorbutton}>
            <Link href="/" style={{fontSize: '1rem'}}>Back to HomePage</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Detail;
