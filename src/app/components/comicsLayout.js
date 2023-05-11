'use client';
import { useEffect, useState } from 'react';
import styles from './comicsLayout.module.scss';
import Link from 'next/link';

const fetchComics = async () => {
  const res = await fetch(
    'http://gateway.marvel.com/v1/public/comics?ts=1&apikey=f2eb279676ea4a4b2c2e17e14f2fa46e&hash=64f82d2344b5684e4f40c3d0861ea16a'
  );
  const data = await res.json();
  if (!res.ok) {
    console.log('Failed to fetch data');
  }
  return data;
};

const ComicsLayout = ({ children }) => {
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(0);
  const [checkedComics, setCheckedComics] = useState({});

  useEffect(() => {
    const fetchComicsData = async () => {
      const data = await fetchComics();
      setComics(data.data.results);
      setPageLimit(Math.ceil(data.data.results.length / 10));
    };
    fetchComicsData();
  }, []);

  const handlePrevPage = () => {
    setCurrentPage(currentPage => Math.max(1, currentPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage => Math.min(pageLimit, currentPage + 1));
  };

  const handleToggleCheck = (e, comicId) => {
    e.preventDefault();
    e.stopPropagation();
    setCheckedComics(prevCheckedComics => {
      const isChecked = prevCheckedComics[comicId];
      return {
        ...prevCheckedComics,
        [comicId]: !isChecked,
      };
    });
  };

  const comicsPerPage = 10;
  const startIndex = (currentPage - 1) * comicsPerPage;
  const comicsToDisplay = comics.slice(startIndex, startIndex + comicsPerPage);

  return (
    <main>
      <section className={styles.cardContainer}>
        {comicsToDisplay.map((e, k) => {
          const thumbnailUrl = `${e.thumbnail.path}.${e.thumbnail.extension}`;
          const title = e.title;
          const comicId = e.id;
          const isChecked = checkedComics[comicId] || false;

          return (
            <Link key={k} href="/details/[id]" as={`/details/${e.id}`}>
              <div className={styles.card}>
                <div
                  className={styles.checkedHeart}
                >
                  <button
                    onClick={event => handleToggleCheck(event, comicId)}
                    style={{
                        backgroundColor: isChecked ? '#ff0000' : '#808080',
                        borderRadius: '100px',
                        position: 'relative',
                        zIndex: '999',
                        width: '4rem',
                        height: '4rem'
                      }}
                  ></button>
                </div>
                <div className={styles.titlecontainer}>
                  <p>{title}</p>
                </div>
                <div
                  className={styles.imagecontainer}
                  style={{ backgroundImage: `url(${thumbnailUrl})` }}
                ></div>
              </div>
            </Link>
          );
        })}
      </section>
      <section className={styles.paginator}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={styles.paginatorbutton}
        >
          Prev
        </button>
        <span>
          {currentPage} of {pageLimit}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === pageLimit}
          className={styles.paginatorbutton}
        >
          Next
        </button>
      </section>
    </main>
  );
};

export default ComicsLayout;