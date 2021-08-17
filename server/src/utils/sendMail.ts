import nodemailer from 'nodemailer';

export async function sendMail(to: string, html: string) {
	// let testAccount = await nodemailer.createTestAccount();

	let transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: 'o7fxpppq4t2lffjr@ethereal.email',
			pass: '3GcjzMgwDrZvkra3XZ',
		},
	});

	let info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>',
		to,
		subject: 'Change Password',
		html,
	});

	console.log('Message sent: %s', info.messageId);
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
