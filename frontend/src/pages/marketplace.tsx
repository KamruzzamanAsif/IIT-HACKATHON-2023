import Artworks from "components/Marketplace/Artworks";
import NavbarPlatform from "components/Navbar/NavbarPlatform";
import Auction from "components/Marketplace/Auction";

export default function Marketplace(){
    return (
        <div>
            <NavbarPlatform/>
            <Artworks/>
            <Auction/>
        </div>
    )
}