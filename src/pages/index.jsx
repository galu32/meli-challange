import dynamic from "next/dynamic";

let NavBar = dynamic(() => import("../components/NavBar/NavBar"));
let BaseContainer = dynamic(() => import("../components/BaseContainer/BaseContainer"));

let Home = () => {
    return (
        <BaseContainer>
            <NavBar/>
        </BaseContainer>
    );
};

export default Home;