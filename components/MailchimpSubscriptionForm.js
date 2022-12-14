import MailchimpSubscribe from "react-mailchimp-subscribe"
import Image from 'next/image'

const url = `https://getunboring.us18.list-manage.com/subscribe/post?u=0dec77fbe34db1b0cd94df181&amp;id=5922adb2bc&amp;f_id=002627e7f0`

const CustomForm = ({ status, message, onValidated }) => {
  let email, name, honeypot;
  const submit = () => {
    if (honeypot.value) {
      return null
    }

    if (email && name && email.value.indexOf("@") > -1) {
      onValidated({
        EMAIL: email.value,
        NAME: name.value
      });
    }
  }

  return (
    <div className="w-full bg-white p-5 border-3 rounded-xl border-black ">
      <div className="">
        <p className="text-xl mb-2 font-medium">Do you want to be notified when we launch new stuff?</p>
        <p className="mb-2">We'll email you to announce new features on the website. Don't worry, we will not be spamming you because frankly we don't have time for that.</p>
      </div>

      {status === "error" && (
        <div
          className="text-red mb-2"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className="text-green mb-2"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}

      {(status !== "success") && (
        <div id="mc_embed_signup">
          <div className="mc-field-group flex flex-col mb-2">
            <label htmlFor="mce-EMAIL" className="text-sm">Email Address  <span className="asterisk">*</span></label>
            <input ref={node => (email = node)} type="email" name="EMAIL" className="required email border-2 p-2 rounded-md" id="mce-EMAIL" required />
          </div>

          <div className="mc-field-group flex flex-col mb-2">
            <label htmlFor="mce-FNAME" className="text-sm">Name  <span className="asterisk">*</span></label>
            <input ref={node => (name = node)} type="text" name="FNAME" className="required border-2 p-2 rounded-md" id="mce-FNAME" required />
          </div>

          <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
            <input ref={node => (honeypot = node)} type="text" name="b_0dec77fbe34db1b0cd94df181_5922adb2bc" tabIndex="-1" />
          </div>
          <div className="optionalParent">
            <div className="clear foot">
              <button onClick={submit} id="mc-embedded-subscribe" className="btn-purple mt-4 space-x-1">
                <span>Subscribe</span>
                {(status === "sending") && <Image src="/loading.svg" width={20} height={20} alt="" />}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const MailchimpSubscriptionForm = () => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <CustomForm
        status={status}
        message={message}
        onValidated={formData => subscribe(formData)}
      />
    )}
  />
)

export default MailchimpSubscriptionForm;


