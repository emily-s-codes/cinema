import "./underConstruction.css"
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { MdConstruction } from "react-icons/md"
import Header from "../components/header/Header";

const UnderConstruction = () => {
    const nav = useNavigate()
    return (
        <div className="pageContainer">
            <Header page={"OOPS!"} />
            <main className="uCMain">
                <MdConstruction className={'reactIcons'} size={'5em'} />
                <p>Sorry! This page is currently under construction.</p>
                <div className="backArrowDiv">
                    <BsFillArrowLeftCircleFill className={'reactIcons'} size={'2em'} onClick={() => nav(-1)} />
                </div>
            </main >
        </div>
    );
}

export default UnderConstruction;