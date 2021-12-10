import Vue from 'vue';

import { urn_log } from 'urn-lib';

// import {Notification} from '../components/UI/Notification/Notification';

urn_log.init(
	urn_log.LogLevel.FUNCTION_DEBUG,
	urn_log.LogContext.BROWSER,
	'[URANIO]'
);

type Data = {
	// notification_active: boolean
	// notification_type: Notification
	// notification_message: string
	// notification_timer?: ReturnType<typeof setTimeout>
}

type Methods = {
	// notify: (type: Notification, msg:string) => void
}

type Computed = {

}

type Props = {
}

export default Vue.extend<Data, Methods, Computed, Props>({
	data():Data {
		return {
			// notification_active: false,
			// notification_type: Notification.INFO,
			// notification_message: '',
			// notification_timer: undefined
		};
	},
	methods: {
		// notify(type: Notification, msg: string):void{
		//   alert(msg);
		//   this.notification_type = type;
		//   this.notification_message = msg;
		//   this.notification_active = true;
		//   if(this.notification_timer){
		//     clearTimeout(this.notification_timer);
		//   }
		//   this.notification_timer = setTimeout(
		//     () => this.notification_active = false,
		//     4000
		//   );
		// },
	}
});
