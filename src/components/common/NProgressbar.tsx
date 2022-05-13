import React from 'react'
import { FC } from 'react'
import { useNProgress } from '@tanem/react-nprogress';

interface Props {
  isRouteChanging: boolean
}
const NProgressbar:FC<Props> = ({ isRouteChanging }) => {
  const { animationDuration, isFinished, progress } = useNProgress({ isAnimating: isRouteChanging });

  return (
    <>
      <style jsx>{`
        .container {
          opacity: ${isFinished ? 0 : 1};
          pointerevents: none;
          transition: opacity ${animationDuration}ms linear;
        }

        .bar {
          background: #FD5A89;
          height: 2px;
          left: 0;
          margin-left: ${(-1 + progress) * 100}%;
          position: fixed;
          top: 0;
          transition: margin-left ${animationDuration}ms linear;
          width: 100%;
          z-index: 1031;
        }

        .spinner {
          box-shadow: 0 0 10px #FD5A89, 0 0 5px #FD5A89;
          display: block;
          height: 100%;
          opacity: 1;
          position: absolute;
          right: 0;
          transform: rotate(3deg) translate(0px, -4px);
          width: 100px;
        }
      `}</style>
      <div className="container">
        <div className="bar">
          <div className="spinner" />
        </div>
      </div>
    </>
  )
}

export default NProgressbar
