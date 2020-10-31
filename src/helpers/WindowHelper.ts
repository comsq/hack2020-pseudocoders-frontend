const open: typeof window.open = (...args) => {
    const newWindow = window.open(...args);
    if (!newWindow) {
        return newWindow;
    }
    newWindow.opener = null;

    return newWindow;
};

export const WindowHelper = {
    open,
};
