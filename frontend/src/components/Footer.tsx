import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#6A38C2] text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Contact Info */}
        <div className="text-sm text-center md:text-left">
          <p>Email: support@jobportal.com</p>
          <p>Phone: +91 98765 43210</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="#" className="hover:text-white"><FaFacebookF /></a>
          <a href="#" className="hover:text-white"><FaTwitter /></a>
          <a href="#" className="hover:text-white"><FaInstagram /></a>
          <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;