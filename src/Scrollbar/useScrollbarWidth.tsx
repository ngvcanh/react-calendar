// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useCallback, useRef } from "react";
import setCss from "../helpers/setCss";
import isUndefined from "lodash/isUndefined";

export default function useScrollbarWidth(){

  const widthRef = useRef(0);

  const getScrollbarWidth = useCallback((cacheEnabled = true) => {
    if (cacheEnabled && widthRef.current !== 0) return widthRef.current;
    
    if (!isUndefined(document)){
      const div = document.createElement('div');
      setCss(div, {
        width: 100,
        height: 100,
        position: 'absolute',
        top: -9999,
        overflow: 'scroll',
        msOverflowStyle: 'scrollbar'
      });

      document.body.appendChild(div);
      widthRef.current = (div.offsetWidth - div.clientWidth);
      document.body.removeChild(div);
    }
    else{
      widthRef.current = 0;
    }

    return widthRef.current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { getScrollbarWidth }

}