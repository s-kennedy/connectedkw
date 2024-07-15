import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {

  return (

      <footer className={`w-full relative bg-slate-100 py-6`}>
        <div className="p-5 mx-auto">
          <div className="md:grid grid-cols-3 md:gap-6">
            <div className="mb-4 basis-1/2">
              <p className="font-body font-medium text-xl md:text-lg ">Support us</p>
              <p className="">Connected KW is a volunteer-run project with the goal of creating an inclusive and comprehensive resource for families in Waterloo Region.</p>
              {/*<p className="">You can help us to grow by supporting us on <a href="https://patreon.com/connectedkw?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" className="hover:text-red">Patreon</a>.</p>*/}
              <p className="">If your organization might be interested in a partnership or sponsorship please <a href="mailto:shay@connectedkw.com" className="hover:text-red">reach out!</a></p>
            </div>

            <div className="mb-4 basis-1/2">
              <p className="font-body font-medium text-xl md:text-lg ">Get involved</p>
              <p className="">Whether you want to add an event, write a blog post, or create an interactive map, we appreciate your contribution! <a href="https://cms.connectedkw.com/admin/register">Create an account</a> or email Shay at <a href="mailto:shay@connectedkw.com" className="hover:text-red">shay@connectedkw.com</a> for more information.</p>
            </div>

            <div className="mb-4 basis-1/2">
              <p className="font-body font-medium text-xl md:text-lg ">Give feedback</p>
              <p className="">Connected KW is a work in progress! If you have any feedback or suggestions you can contact Shay at <a href="mailto:shay@connectedkw.com" className="hover:text-red">shay@connectedkw.com</a>.</p>
              <p> If you find a bug, please <a href="https://github.com/s-kennedy/connectedkw/issues" className="hover:text-red" target="_blank">submit an issue</a>.</p>
            </div>
          </div>


          <div className="flex justify-between">
            <a
              href="https://instagram.com/connectedkw"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="30" width="30" fill="currentColor">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </a>
            <a href="https://www.dreamsidedigital.com" className="hover:text-red">
              Made by Dreamside Digital
            </a>
          </div>
        </div>
      </footer>
  )
}

export default Footer
