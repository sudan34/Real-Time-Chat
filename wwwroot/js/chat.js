var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    document.getElementById("messages").appendChild(li);
});

document.getElementById("sendButton").addEventListener("click", function () {
    var user = "User"; // Replace this with the actual username
    var message = document.getElementById("userInput").value;

    connection.invoke("SendMessage", user, message).catch(function (err) {
        console.error(err.toString());
    });

    document.getElementById("userInput").value = "";
});

connection.start().then(function () {
    console.log("Connected to the chat hub.");
}).catch(function (err) {
    console.error(err.toString());
});
