import React from "react";

const BackContext = React.createContext()

export const useBackDrop = () => {
    return React.useContext(BackContext);
}

const BackDropProvider = (props) => {

    const [openBack, setOpenBack] = React.useState(false);

    const handleCloseBackDrop = () => {
        setOpenBack(false);
    }

    const handleOpenBackDrop = () => {
        setOpenBack(true);
    }

    return (
        <BackContext.Provider value={{ openBack, handleOpenBackDrop, handleCloseBackDrop }} >
            {props.children}
        </BackContext.Provider>
    )
}

export default BackDropProvider