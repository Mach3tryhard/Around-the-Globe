const ws=new WebSocket(`ws://${window.document.location.host}`);
    ws.binaryType = "blob";
    ws.addEventListener("open", event => {
    console.log("Websocket connection opened");
    });
    ws.addEventListener("close", event => {
    console.log("Websocket connection closed");
    });
    
    ws.onmessage = function(message)
    {
        const msgDiv=document.createElement('div');
        msgDiv.classList.add('msgCtn');
        if (message.data instanceof Blob)
        {
            reader = new FileReader();
            reader.onload = () => {
                msgDiv.innerHTML = reader.result;
                console.log(reader.result);
                document.getElementById('messages').appendChild(msgDiv);
            };
            reader.readAsText(message.data);
        } 
        else
        {
            console.log("Result2: " + message.data);
            msgDiv.innerHTML = message.data;
            document.getElementById('messages').appendChild(msgDiv);
        }
    }
    const form=document.getElementById('msgForm');
    form.addEventListener('submit',(event) => {
    event.preventDefault();
    var name=document.getElementById('NameBox').value;
    var status=document.getElementById('StatusBox').value;
    /// guest name and flag
    if(!name)
    {
        name="Guest";
    }
    if(!status)
    {
        status="🌐";
    }
    const message=document.getElementById('inputBox').value;
    if(message)
    {
        ws.send(status +" "+ name +": " + message);

        /// autoscroll furat de pe stack overflow :)
        var stopScroll = function() { clearInterval(scrollInterval); };
        var scrollInterval = setInterval(function() { 
            document.documentElement.scrollTop = document.documentElement.scrollHeight;
        }, 50);
    }
    document.getElementById('inputBox').value='';
    })