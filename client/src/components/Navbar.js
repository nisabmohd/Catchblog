import '../css/Navbar.css'
import SearchIcon from '@mui/icons-material/Search';
export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="left">
                <div className="logo">
                    <h2>CatchBlog</h2>
                </div>
            </div>
            <div className="middle">
                <SearchIcon/>
                <div className="searchbox" style={{width:'inherit'}}>
                    <input type="text" placeholder="Search" style={{height:'24px',width:'80%',outline:'none',border:'none'}} />
                </div>
            </div>
            <div className="right">
                <div className="tags">
                    <a className="anchorNavbartag" href="/">Home</a>
                    <a className="anchorNavbartag" href="/">Notification</a>
                    <a className="anchorNavbartag" href="/">Profile</a>
                    <a className="anchorNavbartag" href="/">Saved</a>
                </div>
            </div>
        </div>
    )
}
