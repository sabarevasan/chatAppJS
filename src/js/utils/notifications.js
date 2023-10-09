export default {
    setup() {
        if(!('Notification' in window)) {
            console.error("Browser notifications are disabled or not supported.");
        }else if(Notification.permission !== 'granted') {
            return;
        }else if(Notification.permission !== 'denied') {
            Notification.requestPermission()
                .then(permission => {
                    if(permission == 'granted') {
                        console.log("Browser notifications enabled.");
                    }
                })
        }
    },
    show({title, body}) {
        new Notification(title, {body})
    }
}