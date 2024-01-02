import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

  return (

      <footer className={`w-full relative bg-purple`}>
        <div className="container py-5 mx-auto">
          <div className="md:flex justify-between md:space-x-4">
            <div className="mb-4 basis-1/2">
              <p className="font-body font-medium text-xl md:text-lg text-white">We are looking for founding partners and sponsors</p>
              <p className="text-white">Unboring KW is a new volunteer-run project with the goal of creating an inclusive and comprehensive resource for families in KW.</p>
              <p className="text-white">If your organization might be interested in a partnership or sponsorship please <a href="mailto:hi@unboringkw.com">reach out</a>!</p>
            </div>

            <div className="mb-4 basis-1/2">
              <p className="font-body font-medium text-xl md:text-lg text-white">Interested in contributing?</p>
              <p className="text-white">Whether you want to add an event, write a blog post, or create an interactive map, we appreciate your contribution! Feel free to email Sharon at <a href="mailto:hi@unboringkw.com">hi@unboringkw.com</a> or DM me on <a href="https://instagram.com/unboringkw">Instagram</a>.</p>
            </div>
          </div>


          <div className="flex justify-start">
            <a
              href="https://instagram.com/unboringkw"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="30" width="30">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
  )
}

export default Footer
