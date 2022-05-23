import React from 'react'
import { NavLink } from 'react-router-dom'

function NavItem({to,className,handelCloseSidebar,isActiveStyle,isNotActiveStyle,icon,categoryId,title}) {
  return (
    <NavLink
            to={to}
            onClick={handelCloseSidebar}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }>
           {icon}
            <div className={className}>
            {title}
            </div>
          </NavLink>
  )
}

export default NavItem