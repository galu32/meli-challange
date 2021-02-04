import dynamic from "next/dynamic";

let NavBar = dynamic(() => import("../components/NavBar/NavBar"));
let BaseContainer = dynamic(() => import("../components/BaseContainer/BaseContainer"));
let BaseCard = dynamic(() => import("../components/BaseCard/BaseCard"));

let P404 = () => {
    return (
        <BaseContainer>
            <NavBar/>
            <BaseCard>
                <img style={{
                    width: "100%",
                    height: "100%",
                }} src='/404.jpg' href='/'/>
            </BaseCard>
        </BaseContainer>
    );
};

export default P404;