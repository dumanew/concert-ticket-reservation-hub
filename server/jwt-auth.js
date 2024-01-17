const jwt = require('jsonwebtoken')
const secret = 'CSP3-Dumanew'

module.exports.createToken = (user) => {
	let data = {
		_id: user._id,
		email: user.email,
		role: user.role,
		stripeCustomerId: user.stripeCustomerId
	}

	return jwt.sign(data, secret, {expiresIn:'2h'})
}