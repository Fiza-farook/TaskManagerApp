const ConfirmModal = ({
    show,
    title,
    message,
    confirmText = "Delete",
    cancelText = "Cancel",
    confirmVariant = "danger",
    loading = false,
    onConfirm,
    onClose,
}) => {
    if (!show) return null;

    return (
        <>
            <div
                className="modal fade show"
                style={{
                    display: "block",
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(4px)",
                    zIndex: 1055,
                }}
            >
                <div className="modal-dialog modal-dialog-centered">

                    <div
                        className="modal-content border-0 shadow-lg"
                        style={{
                            borderRadius: "18px",
                            overflow: "hidden",
                        }}
                    >

                        <div
                            className="modal-header text-white"
                            style={{
                                background:
                                    "linear-gradient(90deg,#6C63FF,#2563EB)",
                            }}
                        >
                            <h5 className="modal-title fw-bold">
                                {title}
                            </h5>

                            <button
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            ></button>
                        </div>

                        <div className="modal-body text-center py-4">

                            <div
                                className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                                style={{
                                    width: "75px",
                                    height: "75px",
                                    borderRadius: "50%",
                                    background: "#FEE2E2",
                                    color: "#DC2626",
                                    fontSize: "32px",
                                    fontWeight: "bold",
                                }}
                            >
                                !
                            </div>

                            <h4 className="fw-bold mb-3">
                                Are you sure?
                            </h4>

                            <p
                                className="text-muted mb-0"
                                style={{
                                    fontSize: "15px",
                                }}
                            >
                                {message}
                            </p>

                        </div>

                        <div className="modal-footer border-0 pb-4">

                            <button
                                className="btn btn-light"
                                style={{
                                    borderRadius: "10px",
                                    minWidth: "110px",
                                }}
                                onClick={onClose}
                                disabled={loading}
                            >
                                {cancelText}
                            </button>

                            <button
                                className={`btn btn-${confirmVariant}`}
                                style={{
                                    borderRadius: "10px",
                                    minWidth: "130px",
                                }}
                                onClick={onConfirm}
                                disabled={loading}
                            >
                                {loading
                                    ? "Please wait..."
                                    : confirmText}
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </>
    );
};

export default ConfirmModal;