console.log("Hello World");

function showMessage() {
    alert("Welcome to my website!");
}

async function submitForm() {

    let name =
        document.getElementById("name").value;

    const API_BASE =
        window.location.hostname === "localhost" ||
        window.location.hostname === ""
            ? "http://localhost:5000"
            : "";

    const response = await fetch(
        (`${API_BASE}/saveContact`),
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name
            })
        }
    );

    const result = await response.text();

    alert(result);
}