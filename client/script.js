
function worker_function() {
    postMessage('Hello')
}
// This is in case of normal worker start
// "window" is not defined in web worker
// so if you load this file directly using `new Worker`
// the worker code will still execute properly

// new Worker(URL.createObjectURL(new Blob(["("+worker_function.toString()+")()"], {type: 'text/javascript'})));
const workerButton = document.getElementById('worker')
console.log(workerButton)
// const worker = new Worker('worker.js')



workerButton.addEventListener('click', event => {
    console.log("hey")


    worker_function();
})

