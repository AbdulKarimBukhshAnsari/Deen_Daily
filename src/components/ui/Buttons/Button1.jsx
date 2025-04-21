import React from 'react'

function Button1({style , text , hover}) {
  return (
    <div className={`${style} px-2 py-1 cursor-pointer ${hover}`}>
      {text}
    </div>
  )
}

export default Button1
