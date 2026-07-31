const EmptyChat = () => {

    const suggestions = [
        "Show my pending tasks",
        "List overdue tasks",
        "How many projects do I have?",
        "Show completed tasks",
    ];

    return (

        <div className="empty-chat d-flex flex-column justify-content-center align-items-center h-100 text-center px-4">

            <div className="chat-empty-icon mb-4">
                <i className="bi bi-robot"></i>
            </div>

            <h2 className="fw-bold mb-3">
                Welcome to AI Assistant
            </h2>

            <p
                className="mb-5"
                style={{
                    maxWidth: "650px",
                    fontSize: "1.05rem",
                    opacity: .9,
                }}
            >
                I'm here to help you manage your projects and tasks.
                Ask me anything about your Task Management System.
            </p>

            <div
                className="w-100"
                style={{
                    maxWidth: "850px",
                }}
            >

                <h5
                    className="mb-4 text-start fw-semibold"
                >
                    Try asking:
                </h5>

                <div className="row g-3">

                    {suggestions.map((item, index) => (

                        <div
                            key={index}
                            className="col-md-6"
                        >

                            <div className="suggestion-card h-100">

                                <i className="bi bi-chat-dots-fill me-2 text-primary"></i>

                                {item}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

};

export default EmptyChat;