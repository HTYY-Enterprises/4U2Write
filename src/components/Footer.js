import {Link} from "react-router-dom"

const Footer = () =>{
    return (
        <footer>
            <div className = "footerTitle">
                <h2>CREATED AT <a href="http://junocollege.com" target="_blank">JUNO COLLEGE</a></h2>
            </div>
            
            <div className = "footerContent">
                <h3>Contributors</h3>
                <ul>
                    <li>
                        <a href="https://github.com/daniellehemet" target="_blank">
                            Danielle Hemet
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/beajt" target="_blank">
                            Bea Tuano
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/ayearwood81" target="_blank">
                            Adrian Yearwood
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/ACYau" target="_blank">
                            Aaron Yau
                        </a>
                    </li>
                </ul>
            </div> 
        </footer>
    );
}


export default Footer;