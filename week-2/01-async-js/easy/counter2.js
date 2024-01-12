function counter2(){
    console.log(`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`);
}

function callItSelf() {
    setTimeout(() => {
        counter2()
        callItSelf()
    }, 1000);
};
callItSelf()