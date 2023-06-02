import styles from './page.module.css'
import Container from './_components/container';
 
export default async function Page() { 
  return (
      <main className={styles.main}>
        <Container></Container>
      </main>
  );
}