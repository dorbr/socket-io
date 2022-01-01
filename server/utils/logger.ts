const info = (...params) => {
  if (process.env.NODE_ENV === 'development') { 
    //
    console.log(...params)
  }
}

const err = (...params) => {
  if (process.env.NODE_ENV === 'development') { 
    console.error(...params)
  }
}

export {
  info, err
}
