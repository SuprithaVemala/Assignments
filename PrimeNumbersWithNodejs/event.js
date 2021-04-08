const eventEmitter=require("events")
let event=new eventEmitter()
event.on("completed",(str)=>console.log(str))
event.emit("completed","program completed")

