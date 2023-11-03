import styles from 'styles/Home.module.scss'
import NavbarPlatform from 'components/Navbar/NavbarPlatform'

export default function Home() {
  return (
    <div className={styles.container}>
      <div>
          <NavbarPlatform />
      </div>
      <div>
          <p>Welcome to ArtBLockToken</p>
      </div>
    </div>
  )
}
