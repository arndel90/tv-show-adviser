import s from "./style.module.css";
import {Search as SearchIcon} from "react-bootstrap-icons";

export default function SearchBar({onSubmit}) {
    
    function submit(e) {
        if (e.key === "Enter" && e.target.value.trim() !== "") {
            onSubmit(e.target.value);
        }
    }
    
    return (
        <>
            <SearchIcon size={27} className={s.icon} />
            <input type="text" placeholder="Search a TV show you may like"
                className={s.input}
                onKeyUp={(data) => submit(data)}
            />
        </>
    )
}