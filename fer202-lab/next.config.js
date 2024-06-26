/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'i.pinimg.com',
      'www.pumpkinbeth.com',
      'pantropica.nl',
      'img.freepik.com',
      'images.fpt.shop',
      'encrypted-tbn0.gstatic.com',
      'www.akerne-orchids.com',
      'siborchid.com',
      'blogger.googleusercontent.com',
      'orchidrepublic.com',
      "www.orchids.org"
    ],
  },
}

const withImages = require('next-images')
module.exports = withImages()


module.exports = nextConfig
