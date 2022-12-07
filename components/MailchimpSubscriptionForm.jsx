const MailchimpSubscriptionForm = props => {
  return (
    <div className="w-full bg-white p-5 border-3 rounded-xl border-black ">
      <div className="">
        <h4 className="text-xl mb-2">Do you want to be notified when we launch new stuff?</h4>
        <p className="mb-2">We'll email you to announce new features on the website. Don't worry, we will not be spamming you because frankly we don't have time for that.</p>
      </div>
      <div className="subscribe-form">
        <form
          id="mc-embedded-subscribe-form"
          className="group validate"
          action="https://getunboring.us18.list-manage.com/subscribe/post?u=0dec77fbe34db1b0cd94df181&amp;id=5922adb2bc&amp;f_id=002627e7f0"
          method="POST"
          name="mc-embedded-subscribe-form"
          target="_blank"
          noValidate
        >
          <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true"><input type="text" name="b_0dec77fbe34db1b0cd94df181_5922adb2bc" tabIndex="-1" defaultValue="" /></div>
          <div className="flex flex-col mb-2">
            <label htmlFor="mce-FNAME" className="text-sm">Name  <span className="asterisk">*</span></label>
            <input type="text" name="FNAME" className="required border-2 p-2 rounded-md" id="mce-FNAME" placeholder="Name" required={true} />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="mce-EMAIL" className="text-sm">Email Address  <span className="asterisk">*</span></label>
            <input type="email" name="EMAIL" className="required email border-2 p-2 rounded-md" id="mce-EMAIL" placeholder="Email address" required={true} />
          </div>
          <input className="px-2 py-1 mt-4 border-2 border-black rounded-md flex flex-nowrap bg-purple text-white" type="submit" value="Subscribe" />
        </form>
      </div>
    </div>
  );
}

export default MailchimpSubscriptionForm;
