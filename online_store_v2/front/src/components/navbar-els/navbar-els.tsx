import React from "react";
import { Link } from "react-router-dom";

const navbar = [
  { title: "О нас", link: "/about" },
  { title: "Продукты", link: "/products" },
  { title: "Доставка и оплата", link: "/delivery" },
  { title: "Контакты", link: "/contacts" },
];

interface Props {
  handleClick?: () => void ;
  prefix: string;
}

const NavbarEls: React.FC<Props> = ({ handleClick = () => {}, prefix }) => {
  const navbarEls = navbar.map((el) => {
    const { title, link } = el;
    return (
      <li key={title} className={`${prefix}__item`}>
        <Link to={link} className={`${prefix}__link`} onClick={handleClick}>
          {title}
        </Link>
      </li>
    );
  });
  return <>{navbarEls}</>;
};

export default NavbarEls;
