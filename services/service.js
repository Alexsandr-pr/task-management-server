class Service {
    async createCode() {
        let id = "";
        for(let i = 0; i < 6; i++) {
            id += Math.floor(Math.random() * 10)
        }
        return id;
    }

    async createDate(){
        try {
            const dates = new Date();
            function getMonthName(month) {
                const monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                return monthNames[month];
            }
        
            return `${getMonthName(dates.getMonth())} ${dates.getDate()}, ${dates.getFullYear()}`;
        }catch(e) {
            console.log(e)
        }
    }
}


module.exports = new Service