"use client";
import { createContext, useState,useContext } from "react";

// export const NotificationContext = createContext<Notification | null>(null)
interface Notification {
        message: string | null;
        status: "success" | "error" | "info" | "warning";
}
export const NotificationContext = createContext<{
        notification: Notification | null;
        setNotification: React.Dispatch<React.SetStateAction<Notification | null>>;
}>({
        notification: null,
        setNotification: () => {},
});

export const NotificationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
        const [notification, setNotification] = useState<Notification | null>(null);
        
        return (
                <NotificationContext.Provider value={{ notification, setNotification }}>
                        {children}
                </NotificationContext.Provider>
        );
};

export const useNotification = () => {
        const context = useContext(NotificationContext);
        if (!context) {
                throw new Error("useNotification must be used within a NotificationProvider");
        }
        return context;
};