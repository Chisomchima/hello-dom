
import urls from './urls'

export default function(req, res, next) {
    let path = req.url
    path = path.toLowerCase()
  
    if (urls[path]) {
        const url = urls[path]
        console.log('redirecting ....')
      res.writeHead(url.code, { Location: url.dst })
      res.end()
    } else {
      next()
    }
  }