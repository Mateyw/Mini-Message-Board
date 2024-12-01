document.addEventListener("DOMContentLoaded", () => {
    const messageContainer = document.querySelector(".message-container");

    messageContainer.addEventListener("click", async (e) => {
        const deleteButton = e.target.closest(".btn-delete");
        if (!deleteButton) return;

        // Get the parent chat-box and extract the data-id
        const chatBox = deleteButton.closest(".chat-box");
        const messageId = chatBox.getAttribute("data-id");

        if (!messageId) {
            console.error("Message ID not found!");
            return;
        }

        try {
            // Send DELETE request to the server
            const response = await fetch(`/messages/${messageId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (response.ok) {
                // Remove the chat box from the DOM
                chatBox.remove();
                console.log(result.message);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    });
});
