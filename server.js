const {createServer}=require('http');
const staticHandler=require('serve-handler');
const ws=require('ws')

const server=createServer((req,res)=>{   // (1)
    return staticHandler(req,res,{public: 'public'})
});
const wss=new ws.WebSocketServer({server}) // (2)
wss.on('connection',(client)=>{

    ////
    for(let i=0;i<mesajesalvate.length;i++)
    {
        client.send(mesajesalvate[i]);
    }
    ////
    console.log(mesajesalvate);
    console.log('Client connected !')
    client.on('message',(msg)=>{    // (3)
        msg=msg.toString();
        console.log(`Message:${msg}`);
        broadcast(msg)
    })
})

var mesajesalvate=[];

function broadcast(msg) {       // (4)
    for(const client of wss.clients)
    {
        if(client.readyState === ws.OPEN)
        {
            ////
            mesajesalvate.push(msg);
            ////
            client.send(msg);
        }
    }
}
server.listen(process.argv[2] || 8080,()=>{
console.log(`server listening...`);
})