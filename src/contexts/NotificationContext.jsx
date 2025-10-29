import { createContext, useState, useContext  } from 'react'

import Toast from '../components/Toast'



const NotificationContext = createContext(null)

export const NotificationProvider = ({children}) => {
    const [notification, setNotification] = useState([])

    const addNotification = (message , type ='info') => {
        const id = Date.now()
        setNotification((prev) => [...prev, { id, message,type }])
    }

    const removeNotification = (id) => {
        setNotification((prev) => prev.filter((notification) => notification.id !== id))
    }

    const showSuccess = (message) => addNotification(message, 'success')
    const showError = (message) => addNotification(message, 'error')
    const showInfo = (message) => addNotification(message, 'info')
    const showWarning = (message) => addNotification(message, 'warning')

    const value = {showSuccess,showError,showInfo,showWarning,removeNotification}



    return (
    <NotificationContext.Provider value={value}>
        {children}
        <div className='fixed top-4 right-4 z-50 space-y-2'>
            {notification.map((notification , index) => (
                <div
                key={notification.id} style={{marginTop: index > 0 ? '0.5rem' : 0}} >
                    <Toast
                    message={notification.message}
                    type={notification.type}
                    onClose={() => removeNotification(notification.id)}
                    duration={3000} // permet d'écraser la durée d'affichage du time stocker dans taost.jsx (default 3000ms)
                    />
                </div>
            ))}
        </div>

        </NotificationContext.Provider>
         )
}
export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error('useNotification doit être utilisé à l\'intérieur d\'un NotificationProvider')
    }   
    return context
}
