import "./underConstruction.css"
import { useNavigate } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { MdConstruction } from "react-icons/md"

const UnderConstruction = () => {
    const nav = useNavigate()
    return (<main className="uCMain">
        <MdConstruction className={'reactIcons'} size={'5em'} />
        <p>Sorry! This page is currently under construction.</p>
        <div className="backArrowDiv">
            <BsFillArrowLeftCircleFill className={'reactIcons'} size={'2em'} onClick={() => nav(-1)} />
        </div>
    </main >
    );
}

export default UnderConstruction;