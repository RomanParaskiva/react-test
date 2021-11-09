export const formatDate = (timestamp) => {
    const date = new Date(timestamp)

    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const month = date.getUTCMonth() < 10 ? '0' + date.getUTCMonth() : date.getUTCMonth()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

    const formatedDate = `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`
    return formatedDate
}

export const formatUser = (user) => {
    const formatedUser = `${user.surname} ${user.name.slice(0,1)}.${user.patronymic.slice(0,1)}.`
    return formatedUser
}

export const handleStatus = (status) => {
    let statusRu
    if (status === 'new') return statusRu = 'Новое'
    if (status === 'completed') return statusRu = 'Выполнено'
    if (status === 'assigned_to') return statusRu = 'Назначено'
    if (status === 'started') return statusRu = 'Выполняется'
    if (status === 'declined') return statusRu = 'Отменено'
}
