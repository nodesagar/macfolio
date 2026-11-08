// Props that make a non-button element (e.g. a positioned <li>) clickable and keyboard-operable.
export const pressable = (onPress) => ({
    role: "button",
    tabIndex: 0,
    onClick: onPress,
    onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPress(e);
        }
    },
});
