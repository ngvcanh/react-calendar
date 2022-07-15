export interface RequestAnimationFrame{
  handle: number,
  callback: FrameRequestCallback,
  cancelled: boolean;
}

const vendors = [ 'moz', 'webkit' ];

let raf = window.requestAnimationFrame;
let caf = window.cancelAnimationFrame 
  || window['cancelRequestAnimationFrame' as keyof Window];

for (let i = 0; !raf && i < vendors.length; ++i){
  raf = window[vendors[i] + 'RequestAnimationFrame' as keyof Window];
  caf = window[vendors[i] + 'CancelAnimationFrame' as keyof Window]
    || window[vendors[i] + 'CancelRequestAnimationFrame'  as keyof Window]
}

if (!raf || !caf){
  let last = 0
    , id = 0
    , queue: Array<RequestAnimationFrame> = []
    , frameDuration = 1000 / 60;

  raf = function(callback: FrameRequestCallback){
    if(queue.length === 0){
      const _now = window.performance.now()
      , next = Math.max(0, frameDuration - (_now - last));

      last = next + _now;

      setTimeout(() => {
        var cp = queue.slice(0);
        queue.length = 0;

        for(let i = 0; i < cp.length; i++){
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            }
            catch(e){
              setTimeout(function(){ throw e }, 0);
            }
          }
        }
      }, Math.round(next));
    }

    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    });

    return id;
  }

  caf = function(handle){
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

export default function requestAnimationFrame(fn: FrameRequestCallback){
  return raf.call(window, fn)
}

export function cancel(id: number){
  caf.apply(window, [ id ]);
}

export function polyfull(object: any){
  if (!object) object = window;
  object.requestAnimationFrame = raf;
  object.cancelAnimationFrame = caf;
}