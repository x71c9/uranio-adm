import Vue from 'vue';

import {urn_log} from 'urn-lib';

import {AuthResponse} from '../../store/auth';

type Data = {
	email: string
	password: string
	error_email: string
	error_password: string
	error_general: string
	general_message: string
};

type Methods = {
	authenticate: () => Promise<boolean>
	validate: () => boolean
	submit: () => Promise<void>
}

type Computed = Record<string,never>

type Props = Record<string,never>

export default Vue.extend<Data, Methods, Computed, Props>({
	layout: "auth",
	props: {
	},
	data(): Data{
		return{
			email: '',
			password: '',
			error_email: '',
			error_password: '',
			error_general: '',
			general_message: ''
		};
	},
	methods: {
		async submit():Promise<void>{
			if(this.validate() && await this.authenticate()){
				this.$router.push({path: `/urn-admin`});
			}
		},
		validate():boolean{
			let valid = true;
			if(!_is_filled(this.email)){
				valid = false;
				this.error_email = 'Please fill in the email.';
			}else{
				this.error_email = '';
				if(!_is_valid_email(this.email)){
					valid = false;
					this.error_email = 'Invalid email';
				}else{
					this.error_email = '';
				}
			}
			if(!_is_filled(this.password)){
				valid = false;
				this.error_password = 'Please fill in the password.';
			}else{
				this.error_password = '';
				if(!_is_valid_password(this.password)){
					valid = false;
					this.error_password = 'Invalid password.';
				}else{
					this.error_password = '';
				}
			}
			return valid;
		},
		async authenticate():Promise<boolean>{
			const auth_response:AuthResponse = await this.$store.dispatch(
				'auth/authenticate',
				{email: this.email, password: this.password}
			);
			urn_log.debug(auth_response);
			if(auth_response.success){
				this.error_general = '';
				this.general_message = auth_response.message;
			}else{
				this.error_general = auth_response.message;
				const $pwd = this.$refs.password as HTMLElement;
				if($pwd && typeof $pwd.focus === 'function'){
					$pwd.focus();
				}
			}
			return auth_response.success;
		}
	}
});

function _is_filled(value:string):boolean{
	if(typeof value === 'string' && value != ''){
		return true;
	}
	return false;
}

function _is_valid_email(value:string):boolean{
	return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(value).toLowerCase());
	// return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\    x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(value);
}

function _is_valid_password(value:string):boolean{
	if(typeof value === 'string' && value.length > 4){
		return true;
	}
	return false;
}
