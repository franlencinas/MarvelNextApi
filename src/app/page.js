
import ComicsLayout from './components/comicsLayout';
import styles from './page.module.scss'



export default function HomePage() {
  
  return (
    <main>
      <section className={styles.hometitle}>
        <h1>MARVEL COMIC SITE</h1>
      </section>
      <ComicsLayout />
    </main>
  )
}