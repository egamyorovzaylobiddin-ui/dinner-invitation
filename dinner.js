
const confirmBtn = document.getElementById("confirmBtn");

confirmBtn.addEventListener("click", async function () {
    const date = document.getElementById("date").value;
    const food = document.getElementById("food").value;

    const time = "18:00";

    const dress =
        "I'd love for you to wear whatever outfit makes you feel most beautiful and comfortable.";

    if (!date || !food) {
        alert("Please complete your choices first! ❤️");
        return;
    }

    const dinner = {
        name: "Feruza",
        date: date,
        time: time,
        food: food,
        dress: dress,
        finalAnswer: "Yes! ❤️ Dinner Confirmed"
    };

    confirmBtn.disabled = true;
    confirmBtn.textContent = "Confirming... ❤️";

    try {
        const response = await fetch("/api/notify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dinner)
        });

        if (!response.ok) {
            throw new Error("Notification failed");
        }

        // Save details for confirmation page
        sessionStorage.setItem(
            "dinnerDetails",
            JSON.stringify(dinner)
        );

        // Open confirmation page
        window.location.href = "confirmation.html";

    } catch (error) {
        console.error(error);

        alert(
            "Something went wrong. Please try again! ❤️"
        );

        confirmBtn.disabled = false;
        confirmBtn.textContent = "Confirm Our Dinner ❤️";
    }
});
