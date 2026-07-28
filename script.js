console.log("Hello World");

function showMessage() {
    alert("Welcome to my website!");
}

async function submitForm() {

    let name =
        document.getElementById("name").value;

    const response = await fetch(
        "http://localhost:5000/saveContact",
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