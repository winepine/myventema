import React, { useState } from 'react';

type ReadMoreProps = {
  more?: string;
  less?: string;
  character?: number;
};

const ReadMore = ({ children, more, less, character }) => {
// const ReadMore = ({ more, less, character, }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleLines = (event) => {
    event.preventDefault();
    setExpanded(!expanded);
  };

  if (!children) return null;

  // if (!description) return null;

  function createMarkup() {
    return {__html: children};
  }

  return (
    <>
      {(children && children.length < character) || expanded
        ? children
        // ? <div style={{ fontSize: 17, marginTop: '15px' }} dangerouslySetInnerHTML={createMarkup()} /> 
        : children.substring(0, character)}
      {children && children.length > character && !expanded && (
        <>
          <br />
          <span>
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: '#FD5A89', fontWeight: 'bold' }}
            >
              {more}
            </a>
          </span>
        </>
      )}
      {children && children.length > character && expanded && (
        <>
          <br />
          <span>
            <a
              href="#"
              onClick={toggleLines}
              style={{ color: '#FD5A89', fontWeight: 'bold' }}
            >
              {less}
            </a>
          </span>
        </>
      )}
    </>
  );
};

ReadMore.defaultProps = {
  character: 150,
  more: 'Read more',
  less: 'less',
};

export default ReadMore;
