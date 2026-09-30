
import logo from '/logoo.png';
import { Link } from "react-router-dom";


export const Topbar = () => {
    return (
  <nav class="navbar" style={{ backgroundColor:'#DFDCF2', borderRight:'1px solid #9049bf' }}>
        <div class="container-fluid">
          <Link class="navbar-brand" style={{color:'#9049BF' , backgroundColor:'#DFDCF2'}} href="#">
            <img src={logo} alt="Logo" width="10%" class="d-inline-block align-text-top me-2" />
            CHITCHAT
          </Link>
        </div>
      </nav>
    );
}

export default Topbar;