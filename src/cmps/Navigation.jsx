import { NavLink } from 'react-router-dom'



export function Navigation() {
    return (
        <nav className="nav-container flex column">
            <NavLink to="/">
                <div className='logo-container'>Dotify.</div>
            </NavLink>
            <ul className='clean-list'>
                <NavLink to="#">
                    <li className='link-container flex align-center'>
                        <div className='icon'><i className="fas fa-home"></i></div>
                        <div className='title'>Home</div>
                    </li>
                </NavLink>
                <NavLink to="#">
                    <li className='link-container flex align-center'>
                        <div className='icon'><i className="fas fa-search"></i></div>
                        <div className='title'>Search</div>
                    </li>
                </NavLink>
                <NavLink to="#">
                    <li className='link-container flex align-center'>
                        <div className='icon'>||\</div>
                        <div className='title'>Your Library</div>
                    </li>
                </NavLink>
                <NavLink to="#">
                    <li className='link-container flex align-center'>
                        <div className='icon'><i className="fas fa-plus-square"></i></div>
                        <div className='title'>Creat Playlist</div>
                    </li>
                </NavLink>
                <NavLink to="#">
                    <li className='link-container flex align-center'>
                        <div className='icon'><i className="fas fa-heart"></i></div>
                        <div className='title'>Liked Songs</div>
                    </li>
                </NavLink>
        
            </ul>
            <hr />
        </nav>
    )
}