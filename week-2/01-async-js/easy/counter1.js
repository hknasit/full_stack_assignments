function timer(){
    console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`)
}
setInterval(timer, 1000);