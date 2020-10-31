// Valid Email Regex
export const valid_email_regex = RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);

// Valid Password Regex
export const valid_password_regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_@#\$%\^&\*])(?=.{8,})");

// Valid Username Regex
export const valid_username_regex = RegExp(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/);

export const check_validate_register_login_form_data = (name,value, errors) => {
	switch (name) {
		case 'email':
			errors.email = 
				value.length <= 8
					? 'Email must have at minimum 8 characters'
					: valid_email_regex.test(value) 
						? ''
						: 'Email is not valid!';
			break;

		case 'password':
			errors.password = 
				value.length < 8
					? 'Password must be at least 8 characters long!'
					: valid_password_regex.test(value) 
						? '' 
						: 'Password must consist of one uppercase, lowercase, numbers and special characters';
			break;

		case 'username':
			errors.username = 
				value.length < 8
					? 'Username must have at minimum 8 characters'
					: value.length > 50 
						? 'Username must have at maximum 50 characters' 
						: valid_username_regex.test(value) 
							? '' 
							: 'Username is not valid!';
			break;
		default:
			break;
	}
};