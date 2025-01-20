import React from 'react'

interface NavListItemsProps {
    name: string;
}

function NavListItems({ name }: NavListItemsProps) {
  return (
    <li>
        <a href="#">{name}</a>
    </li>
  )
}

export default NavListItems