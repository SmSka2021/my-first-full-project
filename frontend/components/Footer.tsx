import React from 'react';
import linkedin from '../public/assets/img/linkedin.png';

function Footer() {
  return (
    <footer className="flex justify-between px-10 py-2 items-center bg-blue-950 text-white">
      <div className="flex items-center">
        <p className="mx-2"> Связаться с автором проекта:</p>
        <a rel="noopener noreferrer" href="https://www.linkedin.com/in/светлана-мацкевич-4b091a224/" target="_blank">
          {' '}
          <img className="w-10 object-contain" src={linkedin.src} alt="social icon" />
        </a>
      </div>
      <div className="flex items-center">
        <p className="mr-2">Book of good deeds </p>
        <p className=""> &#169; 2023 Все права защищены</p>
      </div>
    </footer>
  );
}
export default Footer;
