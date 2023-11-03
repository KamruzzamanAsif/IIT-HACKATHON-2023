import CommunityList from "components/Community/CommunityList";
import PublishContent from "components/Marketplace/PublishContent";
import NavbarPlatform from "components/Navbar/NavbarPlatform";

export default function Community(){
    return(
        <div>
            <NavbarPlatform/>
            <CommunityList/>
            <PublishContent/>
        </div>
    )
}