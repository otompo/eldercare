import catchAsync from "../utils/catchAsync";

// sendgrid
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const contact = catchAsync(async (req, res) => {
  const { email, name, message } = req.body;
  // console.log(req.body);
  const emailData = {
    to: process.env.EMAIL_TO,
    from: email,
    subject: `Contact form - Legacy Grace`,
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
            <h4>Email received from contact form:</h4>
            <p>Sender name: ${name}</p>
            <p>Sender email: ${email}</p>
            <p>Sender message: ${message}</p>
            <hr />
            <p>This email may contain sensetive information</p>
            <p>https://legacygrace.com</p>
        `,
  };

  sgMail.send(emailData).then((sent) => {
    return res.json({
      success: true,
    });
  });
});
