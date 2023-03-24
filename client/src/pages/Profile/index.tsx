import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageInfo from "../../components/layout/ContentArea/PageInfo";
import { getUser } from "../../services/userService";
import Info from "./components/Info";
import Tabs from "./components/Tabs";

const Profile = () => {
    const location = useLocation();
    const [profileInfo, setProfileInfo] = useState<User>();

    useEffect(() => {
        const fetchDetails = async () => {
            const result = await getUser(location.state.userId);
            setProfileInfo(result.user);
        }
        fetchDetails();
    }, [location.state.userId]);

    return (
        <section>
            <PageInfo isChannel={false} name={`${profileInfo?.username}'s Profile`} />
            <Info details={profileInfo!} />
            <Tabs profileId={location.state.userId} />
        </section>
    )
}

export default Profile;