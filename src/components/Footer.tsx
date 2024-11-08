import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="p-4 bg-primary text-white text-center">
            <p>© {new Date().getFullYear()} CareerBuddy. All rights reserved.</p>
            <nav className="flex justify-center space-x-4">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </footer>
    );
}

export default Footer;