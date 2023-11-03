import styles from 'styles/Home.module.scss'
import NavbarPlatform from 'components/Navbar/NavbarPlatform'
import BuyArtBlockToken from 'components/ArtBlock/BuyArtBlockToken'

export default function Platform(){
    return(
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