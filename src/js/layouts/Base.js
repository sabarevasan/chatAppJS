import React from "react";
import Navbar from "../components/Navbar";

/* export default function BaseLayout({children, ...props}) {
    return (
        <>
          <Navbar {...props}/>
          {children}
        </>
    )
} */

function getComponentName(Component) {
  return Component.name || Component.displayName || 'Anonymous component';
}

export const withBaseLayout = (Component, config) => props => {
    const componentName = getComponentName(Component);
    return (
      <>
        <Navbar {...config} view={componentName}/>
        <Component {...props}/>
      </>
    )
}